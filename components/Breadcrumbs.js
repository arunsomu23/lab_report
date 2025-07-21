export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600">
      <ol className="flex flex-wrap items-center">
        {items.map((item, index) => (
          <li key={index} className="inline-block">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="text-blue-600 hover:underline focus:outline-none"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </button>
            ) : (
              <span className="font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
