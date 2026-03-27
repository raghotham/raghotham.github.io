#!/bin/bash
set -euo pipefail

# patch-docs-source.sh - Patch llama-stack docs source for a clean Docusaurus build
#
# Usage: ./patch-docs-source.sh [--repo-dir <path>]
#
# Must be run from inside the llama-stack docs/ directory (where docusaurus.config.ts lives).
# The --repo-dir flag points to the llamastack.github.io repo root (for finding helper scripts).
# If omitted, it defaults to the directory containing this script.
#
# What it does:
#   1. Validates sidebar entries and removes references to non-existent doc files
#   2. Suppresses blog truncation warnings (onUntruncatedBlogPosts: 'warn')
#   3. Fixes blog include pattern to support .mdx files
#   4. Fixes MDX compatibility issues in doc files

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$SCRIPT_DIR"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --repo-dir) REPO_DIR="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

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
  console.log('No sidebars.ts found, skipping sidebar validation');
  process.exit(0);
}

let content = fs.readFileSync(sidebarsFile, 'utf8');
const docsDir = 'docs';

// Find doc IDs: standalone quoted strings on their own line (array items).
// This avoids matching property values like label: 'Concepts' or type: 'category'.
// A doc ID line looks like:   'some/doc_id',   (must contain a slash to distinguish from config values)
// or a bare ID at top level like 'index'
const lines = content.split('\n');
let removedCount = 0;

const filteredLines = lines.filter(line => {
  // Match lines that are just a quoted string (optional comma), nothing else
  const match = line.match(/^(\s+)['"]([a-zA-Z0-9_\-\/]+)['"],?\s*$/);
  if (!match) return true; // keep non-matching lines

  const id = match[2];

  // Check if the doc file exists
  const mdPath = path.join(docsDir, id + '.md');
  const mdxPath = path.join(docsDir, id + '.mdx');
  const indexMdPath = path.join(docsDir, id, 'index.md');
  const indexMdxPath = path.join(docsDir, id, 'index.mdx');

  if (fs.existsSync(mdPath) || fs.existsSync(mdxPath) ||
      fs.existsSync(indexMdPath) || fs.existsSync(indexMdxPath)) {
    return true; // file exists, keep it
  }

  console.log(`  Removed missing sidebar entry: ${id}`);
  removedCount++;
  return false; // file doesn't exist, remove line
});

if (removedCount > 0) {
  fs.writeFileSync(sidebarsFile, filteredLines.join('\n'));
  console.log(`Removed ${removedCount} invalid sidebar entries`);
} else {
  console.log('All sidebar entries are valid');
}
SIDEBAR_EOF

# Step 2: Suppress blog truncation warnings and fix blog include pattern
echo "--- Patching docusaurus.config.ts ---"
node << 'CONFIG_EOF'
const fs = require('fs');

let config = fs.readFileSync('docusaurus.config.ts', 'utf8');
let changed = false;

// Add onUntruncatedBlogPosts: 'warn' to blog plugin config if not already present
if (!config.includes('onUntruncatedBlogPosts')) {
  // Insert into the blog config section - look for blogSidebarCount or blog: {
  // Try to find the blog plugin configuration
  const blogConfigPatterns = [
    // Pattern: blog: { ... blogSidebarCount: ...
    /(blog:\s*\{)/,
    // Pattern: preset blog options
    /(blogSidebarCount:\s*[^,}]+)/,
  ];

  for (const pattern of blogConfigPatterns) {
    const match = config.match(pattern);
    if (match) {
      if (pattern === blogConfigPatterns[0]) {
        config = config.replace(pattern, `$1\n        onUntruncatedBlogPosts: 'warn',`);
      } else {
        config = config.replace(pattern, `$1,\n        onUntruncatedBlogPosts: 'warn'`);
      }
      changed = true;
      console.log('  Added onUntruncatedBlogPosts: warn');
      break;
    }
  }

  if (!changed) {
    // Fallback: look for any presets blog section
    console.log('  WARNING: Could not find blog config section to patch onUntruncatedBlogPosts');
  }
}

// Fix blog include pattern to support both .md and .mdx
if (config.match(/include:\s*\['?\*\.md'?\]/)) {
  config = config.replace(
    /include:\s*\['?\*\.md'?\]/g,
    "include: ['*.{md,mdx}']"
  );
  changed = true;
  console.log('  Fixed blog include pattern for .mdx support');
}

if (changed) {
  fs.writeFileSync('docusaurus.config.ts', config);
  console.log('Config patched');
} else {
  console.log('Config already up to date');
}
CONFIG_EOF

# Step 3: Fix MDX compatibility issues
echo "--- Fixing MDX compatibility ---"
python3 "$REPO_DIR/fix-mdx-compat.py" docs

echo "=== Done patching docs source ==="
