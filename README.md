# React Router Pluggable Matcher Demo

This demo application showcases React Router's pluggable matcher architecture using **Hono's RegExpRouter** as an alternative routing implementation.

## What This Demonstrates

The demo implements the **Crate & Barrel use case** discussed with Michael Jackson, where product URLs have combination identifiers:
- `s` prefix for single products: `/breville-toaster/s296843`
- `f` prefix for product families: `/kitchen-appliances/f296843`

These patterns use **Hono's regex syntax** (`/:slug{[^/]+}/s:sku{\w+}`) with adjacent literal prefixes that are impossible with React Router's default matcher. The Hono adapter enables these patterns in React Router.

## Architecture

### Pluggable Matcher
React Router's new pluggable matcher architecture allows you to replace the default routing algorithm with any custom implementation:

```typescript
import { setRouteMatcher } from 'react-router';
import { HonoRegExpMatcher } from './lib/hono-matcher';

setRouteMatcher(new HonoRegExpMatcher());
```

### Hono Adapter
The `HonoRegExpMatcher` class implements React Router's `RouteMatcher` interface, delegating all route matching to Hono's `RegExpRouter`. This demonstrates:
- Zero breaking changes to existing React Router code
- Full type safety with TypeScript
- Ability to use any third-party routing library

## Features

- ✅ **Custom route patterns** - Support for patterns like `/:slug/s:sku`
- ✅ **Zero breaking changes** - Default React Router behavior preserved
- ✅ **Type-safe** - Full TypeScript support throughout
- ✅ **SSR compatible** - Works with server-side rendering
- ✅ **No external React Router dependencies** - Uses only the pluggable matcher interface

## Getting Started

### Prerequisites

This demo requires the pluggable matcher feature which is currently on the `feat/pluggable-matcher` branch of the React Router fork.

### Installation

```bash
# Install dependencies
npm install

# The react-router package should be linked to the local fork with pluggable matcher
# npm link react-router
```

### Development

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see the demo.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Routes

The application includes three main routes:

1. **Home** (`/`) - Overview and test links
2. **Single Product** (`/:slug/s:sku`) - Matches URLs like `/breville-toaster/s296843`
3. **Product Family** (`/:slug/f:familyId`) - Matches URLs like `/kitchen-appliances/f296843`

## Code Structure

```
app/
├── lib/
│   └── hono-matcher.ts       # Hono RegExpRouter adapter
├── routes/
│   ├── home.tsx              # Home page with demo links
│   ├── product.tsx           # Single product page
│   └── family.tsx            # Product family page
├── entry.client.tsx          # Client-side matcher setup
├── entry.server.tsx          # Server-side matcher setup
└── routes.ts                 # Route definitions
```

## Implementation Details

### RouteMatcher Interface

The `RouteMatcher` interface defines two methods:
- `matchPath()` - Match a single path pattern
- `matchRoutes()` - Match against a route tree

### HonoRegExpMatcher

The adapter:
1. Converts React Router patterns to Hono-compatible patterns
2. Delegates matching to Hono's `RegExpRouter`
3. Converts Hono's results back to React Router's expected format
4. Handles nested routes and parameter extraction

## Benefits

1. **SEO-friendly URLs** - No mass redirects needed for existing URL structures
2. **Performance** - Leverage Hono's optimized routing algorithms
3. **Flexibility** - Use any routing library or custom algorithm
4. **Backwards compatible** - Existing React Router apps work unchanged
5. **Migration path** - Easy to adopt for apps with legacy route patterns

## Use Cases

This architecture enables:
- **Legacy route support** - Reimplement old React Router regex matchers
- **Alternative routers** - Use Hono, path-to-regexp, or any routing library
- **Custom algorithms** - Implement domain-specific routing logic
- **Performance optimization** - Choose the fastest router for your use case

## Related

- [React Router Pluggable Matcher Implementation](https://github.com/dangayle/react-router/tree/feat/pluggable-matcher)
- [Hono Router](https://github.com/honojs/hono/tree/main/src/router)
- [React Router](https://reactrouter.com)

## License

MIT
