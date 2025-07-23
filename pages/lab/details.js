import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceDetails from "@/components/ResourceDetails";
import ValidationErrors from "@/components/ValidationErrors";
import useFhirData from "@/hooks/useFhirData";

export default function LabDetailsPage() {
  const { report, observations, loading, errors } = useFhirData();
  const router = useRouter();

  if (errors?.length > 0) {
    return (
      <MainLayout>
        <ValidationErrors errors={errors} />
      </MainLayout>
    );
  }

  if (loading || !report) {
    return (
      <MainLayout>
        <p className="p-4 font-semibold">Loading FHIR data...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4">
        <Breadcrumbs
          items={[
            { label: "Records", onClick: () => router.push("/") },
            { label: "Lab and Diagnostics", onClick: () => router.push("/lab") },
            { label: report?.code?.text || "Report Details" },
          ]}
        />
        <div className="mt-6">
          <ResourceDetails resource={report} observations={observations} />
        </div>
      </div>
    </MainLayout>
  );
}
