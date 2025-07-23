import { useState } from "react";

export default function ValidationErrors({ errors }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!errors?.length) return null;

  const userAlert = "⚠️ Something went wrong while loading the data.";

  return (
    <div
      className="p-4 mb-6 rounded-md bg-red-50 border border-red-300"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-lg font-semibold text-red-700 mb-2">
        {userAlert}
      </h2>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-sm text-blue-600 hover:underline mb-2"
      >
        {showDetails ? "Hide technical details" : "Show technical details"}
      </button>

      {showDetails && (
        <ul className="list-disc ml-6 mt-1 text-sm text-gray-800">
          {errors.map((msg, idx) => (
            <li key={idx}>{msg.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
