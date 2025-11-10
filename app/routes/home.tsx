import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pluggable Matcher Demo" },
    { name: "description", content: "React Router with Hono RegExpRouter" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        React Router Pluggable Matcher Demo
      </h1>

      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">About This Demo</h2>
        <p className="text-gray-700 mb-3">
          This application demonstrates React Router's pluggable matcher
          architecture using <strong>Hono's RegExpRouter</strong>.
        </p>
        <p className="text-gray-700">
          The demo showcases the Crate & Barrel use case where product URLs
          have a combination identifier directly adjacent to the param (s for single product, f for family).
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Test Routes</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Single Product Routes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Pattern: <code className="bg-gray-200 px-2 py-1 rounded">/:slug{'{[^/]+}'}/s:sku{'{\\w+}'}</code>
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Hono's regex syntax with curly braces
              </p>
              <div className="space-y-2">
                <Link
                  to="/breville-toaster/s296843"
                  className="block text-blue-600 hover:underline"
                >
                  → /breville-toaster/s296843
                </Link>
                <Link
                  to="/coffee-maker-deluxe/s123456"
                  className="block text-blue-600 hover:underline"
                >
                  → /coffee-maker-deluxe/s123456
                </Link>
                <Link
                  to="/dining-table-oak/s789012"
                  className="block text-blue-600 hover:underline"
                >
                  → /dining-table-oak/s789012
                </Link>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Product Family Routes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Pattern: <code className="bg-gray-200 px-2 py-1 rounded">/:slug{'{[^/]+}'}/f:familyId{'{\\w+}'}</code>
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Hono's regex syntax with curly braces
              </p>
              <div className="space-y-2">
                <Link
                  to="/kitchen-appliances/f296843"
                  className="block text-blue-600 hover:underline"
                >
                  → /kitchen-appliances/f296843
                </Link>
                <Link
                  to="/living-room-furniture/f555555"
                  className="block text-blue-600 hover:underline"
                >
                  → /living-room-furniture/f555555
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="prose max-w-none">
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                React Router's <code>setRouteMatcher()</code> API sets a custom
                matcher
              </li>
              <li>
                The <code>HonoRegExpMatcher</code> implements the{" "}
                <code>RouteMatcher</code> interface
              </li>
              <li>
                Routes can use JavaScript <code>RegExp</code> objects with named
                capture groups
              </li>
              <li>
                Regex routes are impossible with the default React Router matcher
              </li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>Zero breaking changes</strong> - Default React Router
              behavior preserved
            </li>
            <li>
              <strong>No external dependencies</strong> - Core implementation is
              dependency-free
            </li>
            <li>
              <strong>Type-safe</strong> - Full TypeScript support
            </li>
            <li>
              <strong>Pluggable</strong> - Use any routing library (Hono,
              path-to-regexp, etc.)
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
