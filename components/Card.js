export default function Card({ onClick }) {
  return (
    <article
      className="cursor-pointer p-4 border rounded-lg shadow-sm bg-white hover:bg-blue-100 transition"
    >
      <button
        onClick={onClick}
        className="text-left w-full focus:outline-none"
        aria-label="View Lab & Diagnostics"
      >
        <h2 className="text-lg font-bold">🧪 Lab & Diagnostics</h2>
        <p className="text-gray-600 mt-2">
          Results for blood, urine, and general lab tests.
        </p>
      </button>
    </article>
  );
}
