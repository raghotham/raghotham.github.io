#!/bin/bash
set -euo pipefail

# build-version.sh - Build a single Docusaurus version snapshot from llama-stack
#
# Usage: ./build-version.sh <version-tag> [--llama-stack-dir <path>]
#
# Examples:
#   ./build-version.sh v0.5.0
#   ./build-version.sh v0.6.0 --llama-stack-dir /tmp/llama-stack

VERSION="${1:?Usage: $0 <version-tag> [--llama-stack-dir <path>]}"
VERSION_NUM="${VERSION#v}"  # Strip leading 'v' for Docusaurus
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

# Parse optional arguments
LLAMA_STACK_DIR=""
shift
while [[ $# -gt 0 ]]; do
  case $1 in
    --llama-stack-dir) LLAMA_STACK_DIR="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# Setup temp directory for the build
TEMP_DIR=$(mktemp -d)
BUILD_DIR="$TEMP_DIR/llama-stack/docs"
trap 'rm -rf "$TEMP_DIR"' EXIT

echo "=== Building version $VERSION ==="
echo "Repo dir: $REPO_DIR"
echo "Temp dir: $TEMP_DIR"

# Step 1: Get llama-stack at the specified version
if [ -n "$LLAMA_STACK_DIR" ] && [ -d "$LLAMA_STACK_DIR" ]; then
  echo "--- Copying from existing llama-stack clone at $LLAMA_STACK_DIR ---"
  git clone --local --no-checkout "$LLAMA_STACK_DIR" "$TEMP_DIR/llama-stack"
  cd "$TEMP_DIR/llama-stack"
  git checkout "$VERSION" 2>/dev/null || git checkout "tags/$VERSION"
else
  echo "--- Cloning llama-stack at $VERSION ---"
  git clone --depth 1 --branch "$VERSION" https://github.com/llamastack/llama-stack.git "$TEMP_DIR/llama-stack"
fi

cd "$BUILD_DIR"

# Step 2: Install dependencies
echo "--- Installing dependencies ---"
npm ci

# Step 3: Copy existing versioning artifacts from the github.io repo
echo "--- Importing versioning artifacts ---"
cp "$REPO_DIR/versionsArchived.json" ./ 2>/dev/null || echo '{}' > versionsArchived.json
cp "$REPO_DIR/versions.json" ./ 2>/dev/null || echo '[]' > versions.json

if [ -d "$REPO_DIR/versioned_docs" ]; then
  cp -r "$REPO_DIR/versioned_docs" ./
fi
if [ -d "$REPO_DIR/versioned_sidebars" ]; then
  cp -r "$REPO_DIR/versioned_sidebars" ./
fi

# Step 4: Patch docusaurus config for versioning support
echo "--- Patching docusaurus config ---"
node << 'PATCH_EOF'
const fs = require('fs');

let config = fs.readFileSync('docusaurus.config.ts', 'utf8');

// Add versioning imports after OpenAPI import
const versioningImports = `
// Import fs for versioning configuration
const fs = require('fs');

// Versioning configuration
const versionsArchived = (() => {
  try {
    return JSON.parse(fs.readFileSync('./versionsArchived.json', 'utf8'));
  } catch (e) {
    return {};
  }
})();

const archivedVersionsDropdownItems = Object.entries(versionsArchived).map(
  ([versionName, versionUrl]) => ({
    label: versionName,
    href: versionUrl,
  })
);
`;

config = config.replace(
  /import type \* as OpenApiPlugin from "docusaurus-plugin-openapi-docs";/,
  `import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";\n${versioningImports}`
);

// Add version dropdown to navbar
const versionDropdown = `        {
          href: 'https://github.com/llamastack/llama-stack',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: archivedVersionsDropdownItems.length > 0 ? [
            {
              type: 'html',
              value: '<hr class="dropdown-separator">',
            },
            {
              type: 'html',
              className: 'dropdown-archived-versions',
              value: '<b>Previous versions</b>',
            },
            ...archivedVersionsDropdownItems,
          ] : [],
        },`;

config = config.replace(
  /\s*{\s*href:\s*'https:\/\/github\.com\/llamastack\/llama-stack',\s*label:\s*'GitHub',\s*position:\s*'right',\s*},/,
  versionDropdown
);

fs.writeFileSync('docusaurus.config.ts', config);
console.log('Config patched');
PATCH_EOF

# Step 5: Generate API docs
echo "--- Generating API docs ---"

# Check which specs exist and generate accordingly
if [ -f "static/llama-stack-spec.yaml" ]; then
  echo "  Generating stable API docs..."
  npm run gen-api-docs stable
fi

if [ -f "static/experimental-llama-stack-spec.yaml" ]; then
  echo "  Generating experimental API docs..."
  npm run gen-api-docs experimental
fi

if [ -f "static/deprecated-llama-stack-spec.yaml" ]; then
  echo "  Generating deprecated API docs..."
  npm run gen-api-docs deprecated
fi

echo "API docs generated"

# Step 6: Create version snapshot
echo "--- Creating Docusaurus version: $VERSION ---"
npx docusaurus docs:version "$VERSION"
echo "Version snapshot created"

# Step 7: Inline raw-loader imports in the new versioned docs
echo "--- Inlining raw-loader imports ---"
python3 "$REPO_DIR/inline-raw-loader.py" "versioned_docs/version-$VERSION" "$TEMP_DIR/llama-stack"

# Step 8: Copy artifacts back to the github.io repo
echo "--- Copying artifacts to repo ---"
cp -r "versioned_docs/version-$VERSION" "$REPO_DIR/versioned_docs/"
cp "versioned_sidebars/version-$VERSION-sidebars.json" "$REPO_DIR/versioned_sidebars/"

# Step 9: Update versions.json (add version, sort newest first)
echo "--- Updating versions.json ---"
node -e "
const fs = require('fs');
const versions = JSON.parse(fs.readFileSync('$REPO_DIR/versions.json', 'utf8'));
const newVersion = '$VERSION';
if (!versions.includes(newVersion)) {
  versions.push(newVersion);
}
// Sort by semver, newest first
versions.sort((a, b) => {
  const pa = a.replace('v','').split('.').map(Number);
  const pb = b.replace('v','').split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pb[i]||0) !== (pa[i]||0)) return (pb[i]||0) - (pa[i]||0);
  }
  return 0;
});
fs.writeFileSync('$REPO_DIR/versions.json', JSON.stringify(versions, null, 2) + '\n');
console.log('Updated versions.json:', versions);
"

echo "=== Done building $VERSION ==="
echo "Artifacts:"
echo "  versioned_docs/version-$VERSION/"
echo "  versioned_sidebars/version-$VERSION-sidebars.json"
echo "  versions.json (updated)"
