#!/bin/bash
set -euo pipefail

# build-latest.sh - Build the latest (main branch) Docusaurus docs locally
#
# Usage: ./build-latest.sh [--llama-stack-dir <path>] [--output-dir <path>]
#
# Examples:
#   ./build-latest.sh
#   ./build-latest.sh --llama-stack-dir /tmp/llama-stack
#   ./build-latest.sh --output-dir /tmp/docs-output
#
# Output: docs/ directory (or specified output dir) containing the full static site

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

# Parse optional arguments
LLAMA_STACK_DIR=""
OUTPUT_DIR="$REPO_DIR/docs"
while [[ $# -gt 0 ]]; do
  case $1 in
    --llama-stack-dir) LLAMA_STACK_DIR="$2"; shift 2 ;;
    --output-dir) OUTPUT_DIR="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# Setup temp directory for the build
TEMP_DIR=$(mktemp -d)
BUILD_DIR="$TEMP_DIR/llama-stack/docs"
trap 'rm -rf "$TEMP_DIR"' EXIT

echo "=== Building latest docs ==="

# Step 1: Get llama-stack at main branch
if [ -n "$LLAMA_STACK_DIR" ] && [ -d "$LLAMA_STACK_DIR" ]; then
  echo "--- Cloning from local repo ---"
  git clone --local --no-checkout "$LLAMA_STACK_DIR" "$TEMP_DIR/llama-stack"
  cd "$TEMP_DIR/llama-stack"
  git checkout main
else
  echo "--- Cloning from GitHub ---"
  git clone --depth 1 --branch main https://github.com/llamastack/llama-stack.git "$TEMP_DIR/llama-stack"
fi

cd "$BUILD_DIR"

# Step 2: Install dependencies
echo "--- Installing dependencies ---"
npm ci 2>&1 | tail -5

# Step 3: Patch docs source for clean build
echo "--- Patching docs source ---"
"$REPO_DIR/patch-docs-source.sh" --repo-dir "$REPO_DIR"

# Step 4: Generate API docs
echo "--- Generating API docs ---"

if [ -f "static/llama-stack-spec.yaml" ]; then
  npm run gen-api-docs stable 2>&1 | grep -E "^Successfully" || true
fi

if [ -f "static/experimental-llama-stack-spec.yaml" ]; then
  npm run gen-api-docs experimental 2>&1 | grep -E "^Successfully" || true
fi

if [ -f "static/deprecated-llama-stack-spec.yaml" ]; then
  npm run gen-api-docs deprecated 2>&1 | grep -E "^Successfully" || true
fi

# Step 5: Inline raw-loader imports
echo "--- Inlining raw-loader imports ---"
python3 "$REPO_DIR/inline-raw-loader.py" docs "$TEMP_DIR/llama-stack"

# Step 6: Set up versioning configuration
echo "--- Setting up versioning ---"
cp "$REPO_DIR/versionsArchived.json" ./

# Load existing versions.json or create empty
if [ -f "$REPO_DIR/docs/versions.json" ]; then
  cp "$REPO_DIR/docs/versions.json" ./
  echo "Loaded existing versions.json"
else
  echo "[]" > versions.json
  echo "Created empty versions.json"
fi

# For latest builds, we do NOT import versioned_docs/versioned_sidebars.
# Archived versions are served as standalone static sites under docs/vX.Y.Z/
# and linked via versionsArchived.json — Docusaurus doesn't need to build them.

# Patch Docusaurus config for versioning
node << 'EOF'
const fs = require('fs');

let config = fs.readFileSync('docusaurus.config.ts', 'utf8');

// Add versioning imports after OpenAPI import
const versioningImports = `
// Import fs for versioning configuration
const fs = require('fs');

// Versioning configuration for llamastack.github.io
const versionsArchived = (() => {
  try {
    return JSON.parse(fs.readFileSync('./versionsArchived.json', 'utf8'));
  } catch (e) {
    console.warn('Could not load versionsArchived.json:', e);
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
  `import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

${versioningImports}`
);

// Add version dropdown to navbar (replace GitHub item)
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
console.log('Versioning config patched');
EOF

# Step 7: Patch out duplicate version badges from OpenAPI MDX files
echo "--- Patching duplicate version badges ---"
find . -name "llama-stack-specification.info.mdx" -type f -exec sed -i '' '/<span$/,/<\/span>$/d' {} \; 2>/dev/null || \
find . -name "llama-stack-specification.info.mdx" -type f -exec sed -i '/<span$/,/<\/span>$/d' {} \;

# Step 8: Build
echo "--- Building ---"
NODE_OPTIONS="--max-old-space-size=8192" npm run build 2>&1 | tail -50

# Step 9: Copy build output
echo "--- Copying to $OUTPUT_DIR ---"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"
cp -r build/* "$OUTPUT_DIR/"
touch "$OUTPUT_DIR/.nojekyll"

echo "=== Done building latest docs ==="
echo "Output: $OUTPUT_DIR"
du -sh "$OUTPUT_DIR"
