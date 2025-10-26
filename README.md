# Hugo Commerce Theme

A Hugo theme designed for product landing pages with integrated payment processing.

## Features

- 🚀 Product landing page optimized for conversions
- 💳 Stripe payment integration
- 📱 Fully responsive design
- 🎨 Tailwind CSS styling
- ⚡ Fast static site generation
- 📊 Data-driven configuration (TOML/YAML)
- 🔧 Easy customization

## Quick Start

```bash
# Create a new Hugo site
hugo new site my-product

# Add the theme as a submodule
cd my-product
git submodule add https://github.com/yourusername/hugo-commerce-theme.git themes/hugo-commerce-theme

# Copy example site content
cp -r themes/hugo-commerce-theme/exampleSite/* .

# Start the Hugo server
hugo server
```

## Documentation

- [Getting Started](docs/GETTING_STARTED.md)
- [Configuration Guide](docs/CONFIGURATION.md)
- [Architecture Design](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)

## Structure

```
hugo-commerce-theme/
├── archetypes/         # Content templates
├── assets/            # CSS, JS (processed by Hugo Pipes)
├── data/              # Example data files
├── docs/              # Documentation
├── exampleSite/       # Example implementation
├── i18n/              # Internationalization
├── layouts/           # Hugo templates
│   ├── _default/      # Default layouts
│   ├── partials/      # Reusable components
│   ├── shortcodes/    # Custom shortcodes
│   └── checkout/      # Checkout page layout
├── static/            # Static assets (served as-is)
└── theme.toml         # Theme metadata
```

## Requirements

- Hugo >= 0.112.0 (extended version)
- Node.js >= 18.x (for Tailwind CSS)

## License

MIT License - see [LICENSE](LICENSE) for details

## Credits

Based on [Hugo Product Launch](https://github.com/janraasch/hugo-product-launch) by Jan Raasch
