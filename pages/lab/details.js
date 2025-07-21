import MainLayout from "@/layouts/MainLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceDetails from "@/components/ResourceDetails";
import useFhirData from "@/hooks/useFhirData";
import { useRouter } from "next/router";

export default function LabDetailsPage() {
  const { report, observations, loading, errors } = useFhirData();
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
            { label: "Lab and Diagnostics", onClick: () => router.push("/lab") },
            { label: report?.code?.text || "Details" },
          ]}
        />
        <div className="mt-6">
          <ResourceDetails resource={report} observations={observations} />
        </div>
      </div>
    </MainLayout>
  );
}
