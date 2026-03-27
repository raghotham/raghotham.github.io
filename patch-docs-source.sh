#!/bin/bash
set -euo pipefail

# patch-docs-source.sh - Patch llama-stack docs source for a clean Docusaurus build
#
# Must be run from inside the llama-stack docs/ directory (where docusaurus.config.ts lives).
#
# What it does:
#   1. Removes sidebar entries that reference non-existent doc files
#   2. Patches docusaurus.config.ts:
#      - markdown.format: 'detect' (.md = CommonMark, .mdx = MDX)
#      - onUntruncatedBlogPosts: 'warn'
#      - blog include pattern for .mdx support

# Verify we're in a Docusaurus docs directory
if [ ! -f "docusaurus.config.ts" ]; then
  echo "ERROR: docusaurus.config.ts not found in $(pwd)"
  echo "This script must be run from inside the llama-stack docs/ directory."
  exit 1
fi

echo "=== Patching docs source ==="

# Step 1: Validate sidebar entries and remove references to non-existent files
echo "--- Validating sidebar entries ---"
node << 'SIDEBAR_EOF'
const fs = require('fs');
const path = require('path');

const sidebarsFile = 'sidebars.ts';
if (!fs.existsSync(sidebarsFile)) {
  console.log('No sidebars.ts found, skipping');
  process.exit(0);
}

let content = fs.readFileSync(sidebarsFile, 'utf8');
const docsDir = 'docs';
let removedCount = 0;

// Remove standalone doc ID lines where the corresponding file doesn't exist.
// Only matches lines that are a bare quoted string (array items in sidebars),
// not property values like label: 'Foo' or type: 'category'.
const lines = content.split('\n');
const filteredLines = lines.filter(line => {
  const match = line.match(/^(\s+)['"]([a-zA-Z0-9_\-\/]+)['"],?\s*$/);
  if (!match) return true;

  const id = match[2];
  if (fs.existsSync(path.join(docsDir, id + '.md')) ||
      fs.existsSync(path.join(docsDir, id + '.mdx')) ||
      fs.existsSync(path.join(docsDir, id, 'index.md')) ||
      fs.existsSync(path.join(docsDir, id, 'index.mdx'))) {
    return true;
  }

  console.log(`  Removed: ${id}`);
  removedCount++;
  return false;
});
content = filteredLines.join('\n');

// Remove categories left with empty items arrays.
// Docusaurus errors: "Sidebar category X has neither any subitem nor a link"
let prev;
do {
  prev = content;
  content = content.replace(
    /\s*\{\s*type:\s*'category',\s*label:\s*'([^']*)',\s*collapsed:\s*(?:true|false),\s*items:\s*\[\s*\],?\s*\},?/g,
    (_, label) => { console.log(`  Removed empty category: ${label}`); removedCount++; return ''; }
  );
} while (content !== prev);

if (removedCount > 0) {
  fs.writeFileSync(sidebarsFile, content);
  console.log(`Removed ${removedCount} invalid sidebar entries/categories`);
} else {
  console.log('All sidebar entries valid');
}
SIDEBAR_EOF

# Step 2: Patch docusaurus.config.ts
echo "--- Patching docusaurus.config.ts ---"
node << 'CONFIG_EOF'
const fs = require('fs');
let config = fs.readFileSync('docusaurus.config.ts', 'utf8');
let changed = false;

// markdown.format: 'detect' — .md files use CommonMark (no JSX parsing),
// .mdx files use MDX. This prevents MDX errors from upstream .md files
// containing <tags>, {braces}, autolinks like <https://...>, etc.
if (!config.includes("format: 'detect'") && !config.includes('format: "detect"')) {
  const md = `\n  markdown: {\n    format: 'detect',\n  },`;
  if (config.match(/baseUrl:\s*['"][^'"]*['"]/)) {
    config = config.replace(/(baseUrl:\s*['"][^'"]*['"],?)/, `$1${md}`);
    changed = true;
    console.log("  Added markdown.format: 'detect'");
  }
}

// Suppress blog truncation errors (upstream posts lack <!-- truncate --> markers)
if (!config.includes('onUntruncatedBlogPosts')) {
  for (const p of [/(blog:\s*\{)/, /(blogSidebarCount:\s*[^,}]+)/]) {
    if (config.match(p)) {
      config = config.replace(p, p === /(blog:\s*\{)/ ?
        `$1\n        onUntruncatedBlogPosts: 'warn',` :
        `$1,\n        onUntruncatedBlogPosts: 'warn'`);
      changed = true;
      console.log("  Added onUntruncatedBlogPosts: 'warn'");
      break;
    }
  }
}

// Blog include pattern: support .mdx files too
if (config.match(/include:\s*\['?\*\.md'?\]/)) {
  config = config.replace(/include:\s*\['?\*\.md'?\]/g, "include: ['*.{md,mdx}']");
  changed = true;
  console.log("  Fixed blog include pattern");
}

if (changed) {
  fs.writeFileSync('docusaurus.config.ts', config);
  console.log('Config patched');
} else {
  console.log('Config already up to date');
}
CONFIG_EOF

echo "=== Done patching docs source ==="
