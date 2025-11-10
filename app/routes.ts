import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Crate & Barrel style patterns using Hono's regex syntax
  route("/:slug{[^/]+}/s:sku{\\w+}", "routes/product.tsx"),
  route("/:slug{[^/]+}/f:familyId{\\w+}", "routes/family.tsx"),
] satisfies RouteConfig;
