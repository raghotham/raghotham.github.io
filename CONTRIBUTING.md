# Contributing

This is a documentation site for llama-stack. 

## Building the Documentation

To build the documentation locally:

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Build the documentation:
   ```bash
   sphinx-build -b html docs/source docs/build/html
   ```

3. View the documentation:
   ```bash
   open docs/build/html/index.html
   ```

## Contributing Changes

1. Make your changes to the documentation in the `docs/source/` directory
2. Test the build locally
3. Commit and push your changes
4. The GitHub Actions workflow will automatically deploy to GitHub Pages

## Documentation Structure

- `docs/source/` - Source files (Markdown and RST)
- `docs/build/html/` - Built HTML output
- `docs/_static/` - Static assets (images, CSS, JS) 