export default function Resource({ resourceType, onClick }) {
  const formattedType = resourceType?.resourceType?.replace(
    /([a-z])([A-Z])/g,
    "$1 $2"
  );
  const formattedDate = new Date(
    resourceType?.effectiveDateTime
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="p-6 border rounded-lg bg-white hover:bg-blue-100 transition shadow">
      <button
        onClick={onClick}
        className="text-left w-full focus:outline-none"
        aria-label={`View details for ${resourceType?.code?.text ?? "report"}`}
      >
        <h3 className="text-xl font-semibold mb-2">🩸{resourceType.code?.text}</h3>
        <p className="text-sm text-gray-700 mb-1 pl-6">{formattedType}</p>
        <p className="text-sm text-gray-700 pl-6">{formattedDate}</p>
      </button>
    </article>
  );
}
