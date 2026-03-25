#!/usr/bin/env python3
"""Fix MDX-incompatible syntax in markdown/mdx files.

Usage: python3 fix-mdx-compat.py <docs_dir>

Fixes patterns that break Docusaurus MDX v3 parser:
  - <|...|> (LLM special tokens) -> &lt;|...|>
  - <<EOF -> &lt;&lt;EOF
  - { and } outside code fences/inline code -> \{ and \}

Only processes files that have <| or <<EOF patterns.
Skips files with JSX components (imports, <ComponentName>).
"""
import re, os, sys, glob


def needs_fixing(content):
    in_code_fence = False
    for line in content.split('\n'):
        stripped = line.strip()
        if stripped.startswith('```') or stripped.startswith('~~~'):
            in_code_fence = not in_code_fence
            continue
        if in_code_fence:
            continue
        if '<|' in line or '<<EOF' in line:
            return True
    return False


def has_jsx_components(content):
    for line in content.split('\n'):
        stripped = line.strip()
        if re.match(r'^import\s+', stripped):
            return True
        if re.search(r'<[A-Z]\w+[\s/>]', stripped):
            return True
    return False


def fix_line(line):
    line = line.replace('<|', '&lt;|')
    line = re.sub(r'<<(\w+)', r'&lt;&lt;\1', line)
    parts = re.split(r'(`[^`]+`)', line)
    escaped_parts = []
    for part in parts:
        if part.startswith('`') and part.endswith('`'):
            escaped_parts.append(part)
        else:
            part = re.sub(r'(?<!\\)(?<!\{)\{(?!\{)', r'\\{', part)
            part = re.sub(r'(?<!\\)(?<!\})\}(?!\})', r'\\}', part)
            escaped_parts.append(part)
    return ''.join(escaped_parts)


def fix_mdx_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    if not needs_fixing(content):
        return False
    if has_jsx_components(content):
        return False
    lines = content.split('\n')
    result = []
    in_code_fence = False
    in_frontmatter = False
    frontmatter_count = 0
    for line in lines:
        stripped = line.strip()
        if stripped == '---':
            frontmatter_count += 1
            in_frontmatter = frontmatter_count == 1
            result.append(line)
            continue
        if in_frontmatter:
            result.append(line)
            continue
        if stripped.startswith('```') or stripped.startswith('~~~'):
            in_code_fence = not in_code_fence
            result.append(line)
            continue
        if in_code_fence:
            result.append(line)
            continue
        result.append(fix_line(line))
    new_content = '\n'.join(result)
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        return True
    return False


def fix_docs_dir(docs_dir):
    if not os.path.isdir(docs_dir):
        print(f'No dir: {docs_dir}')
        return
    fixed = 0
    for ext in ('*.md', '*.mdx'):
        for filepath in glob.glob(f'{docs_dir}/**/{ext}', recursive=True):
            if fix_mdx_file(filepath):
                print(f'  Fixed: {filepath}')
                fixed += 1
    print(f'Fixed {fixed} files')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    fix_docs_dir(sys.argv[1])
