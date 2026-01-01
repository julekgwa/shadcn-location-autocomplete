# locn-autocomplete

A **provider-agnostic** Shadcn autocomplete component for searching **addresses and places**.

It supports multiple built-in geocoding providers including **OpenStreetMap (free)**, **OpenCage**, **Google Places**, **Mapbox**, **LocationIQ**, **Geoapify**, **HERE**, and **TomTom** — or you can plug in **any custom API**.

Designed to be **easy to integrate**, **fully customizable**, and flexible enough to work with **any backend or frontend framework**.

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="https://locn.juniusl.space/providers-dark.png"
  />
  <source
    media="(prefers-color-scheme: light)"
    srcset="https://locn.juniusl.space/providers-light.png"
  />
  <img
    alt="Supported location providers"
    src="https://locn.juniusl.space/providers-light.png"
  />
</picture>

## Features
- 🔌 **Provider-agnostic** — use built-in providers or your own API
- 🧩 **Shadcn UI–based** — consistent with your existing design system
- 🎨 **Multiple UX variants** — connected or detached input & results
- ⚡ **Debounced search** — optimized for performance
- 🧠 **Fully typed** — generic support with access to raw provider data
- 🌍 **Location-first** — built specifically for address and place search

## Tech Stack
- [TanStack Start](https://tanstack.com/start) - Full-stack framework for building web applications
- [Shadcn UI](https://shadcn.com/) - Component library built with Base UI and Tailwind CSS
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Bun](https://bun.sh/) - Bun package manager
- [Lucide](https://lucide.dev/) - Open-source icon library
- [Fumadocs](https://fumadocs.dev/) - Documentation framework for React applications

---
## Getting Started
To get started with the LocationAutocomplete component, follow the installation instructions in the [documentation](https://locn.juniusl.space/docs/components/location-autocomplete).

---

## Development

### Installation

```bash
bun install
```

### Running the Development Server

```bash
bun dev
```

### Building the Project

```bash
bun run build
```

### Building shadcn registry

```bash
bun run registry:build
```

## License
MIT