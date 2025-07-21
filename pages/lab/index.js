import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Resource from "@/components/Resource";
import useFhirData from "@/hooks/useFhirData";

export default function LabTypePage() {
  const { report, loading, errors } = useFhirData();
  const router = useRouter();

  if (loading) return <p className="p-4">Loading FHIR data...</p>;

  if (errors.length > 0) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-red-600">
          Validation Errors
        </h2>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
          {errors.map((msg, idx) => (
            <li key={idx}>{msg.message}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="p-4">
        <Breadcrumbs
          items={[
            { label: "Records", onClick: () => router.push("/") },
            { label: "Lab and Diagnostics" },
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <Resource
            resourceType={report}
            onClick={() => router.push("/lab/details")}
          />
        </div>
      </div>
    </MainLayout>
  );
}
