import { RegExpRouter } from "hono/router/reg-exp-router";
import type { Location } from "react-router";
import type {
  RouteMatcher,
  PathPattern,
  PathMatch,
  AgnosticRouteMatch,
  AgnosticRouteObject,
} from "react-router";
import { defaultMatcher } from "react-router";

/**
 * Adapter that uses Hono's RegExpRouter for React Router route matching.
 * Supports Hono's curly brace regex syntax: /:slug{[^/]+}/s:sku{\w+}
 */
export class HonoRegExpMatcher implements RouteMatcher {
  readonly name = "HonoRegExpMatcher";

  matchPath<ParamKey extends string = string, Path extends string = string>(
    pattern: PathPattern<Path> | Path,
    pathname: string,
  ): PathMatch<ParamKey> | null {
    const pathPattern = typeof pattern === "string" ? pattern : pattern.path;
    
    // Use Hono to match
    const router = new RegExpRouter();
    router.add("GET", pathPattern as string, true);
    const [matches, groups] = router.match("GET", pathname);
    
    if (!matches[0]) return null;
    
    // Extract params from Hono's result
    const paramIndices = matches[0][1] || {};
    const params: Record<string, string> = {};
    for (const [name, idx] of Object.entries(paramIndices)) {
      if (typeof idx === 'number' && groups[idx]) {
        params[name] = groups[idx];
      }
    }

    return {
      params: params as any,
      pathname,
      pathnameBase: pathname,
      pattern: typeof pattern === "string" ? { path: pattern } : pattern,
    };
  }

  matchRoutes<
    RouteObjectType extends AgnosticRouteObject = AgnosticRouteObject,
  >(
    routes: RouteObjectType[],
    locationArg: Partial<Location> | string,
    basename = "/",
  ): AgnosticRouteMatch<string, RouteObjectType>[] | null {
    // Delegate to default matcher which will call our matchPath
    return defaultMatcher.matchRoutes(routes, locationArg, basename);
  }
}
