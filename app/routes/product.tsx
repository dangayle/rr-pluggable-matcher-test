import type { Route } from "./+types/product";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Product: ${params.slug}` },
    { name: "description", content: `Product page for SKU ${params.sku}` },
  ];
}

export default function ProductPage({ params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Single Product Page</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Product Details</h2>
        <dl className="space-y-2">
          <div>
            <dt className="font-medium text-gray-700">Slug:</dt>
            <dd className="text-gray-900">{params.slug}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">SKU:</dt>
            <dd className="text-gray-900">{params.sku}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Type:</dt>
            <dd className="text-gray-900">Single Product (s prefix)</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          This route uses <strong>Hono's regex syntax</strong>:{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">/:slug{'{[^/]+}'}/s:sku{'{\\w+}'}</code>
        </p>
        <p className="mt-2">
          Hono's curly brace syntax allows regex constraints on parameters,
          matching URLs like: <code className="bg-gray-200 px-2 py-1 rounded">/breville-toaster/s296843</code>
        </p>
        <p className="mt-2">
          This pattern (with 's' directly before the param) is <strong>not supported</strong> by
          React Router's default matcher.
        </p>
      </div>
    </div>
  );
}


