import type { Route } from "./+types/family";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Product Family: ${params.slug}` },
    { name: "description", content: `Product family page for ID ${params.familyId}` },
  ];
}

export default function FamilyPage({ params }: Route.ComponentProps) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Product Family Page</h1>
      
      <div className="bg-blue-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Family Details</h2>
        <dl className="space-y-2">
          <div>
            <dt className="font-medium text-gray-700">Slug:</dt>
            <dd className="text-gray-900">{params.slug}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Family ID:</dt>
            <dd className="text-gray-900">{params.familyId}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Type:</dt>
            <dd className="text-gray-900">Product Family (f prefix)</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>
          This route uses <strong>Hono's regex syntax</strong>:{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">/:slug{'{[^/]+}'}/f:familyId{'{\\w+}'}</code>
        </p>
        <p className="mt-2">
          Hono's curly brace syntax allows regex constraints on parameters,
          matching URLs like: <code className="bg-gray-200 px-2 py-1 rounded">/kitchen-appliances/f296843</code>
        </p>
        <p className="mt-2">
          This pattern (with 'f' directly before the param) is <strong>not supported</strong> by
          React Router's default matcher.
        </p>
      </div>
    </div>
  );
}


