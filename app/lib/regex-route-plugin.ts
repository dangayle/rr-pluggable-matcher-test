import type { Plugin } from "vite";
import { setRouteMatcher } from "react-router";
import { HonoRegExpMatcher } from "./hono-matcher";

/**
 * Vite plugin that sets up the Hono matcher for regex route support.
 */
export function regexRoutePlugin(): Plugin {
  return {
    name: "regex-route-matcher",
    configResolved() {
      // Set up the matcher when Vite config is resolved (before any builds)
      setRouteMatcher(new HonoRegExpMatcher());
      console.log("[RegexRoutePlugin] HonoRegExpMatcher set up");
    },
  };
}
