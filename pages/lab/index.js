import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Resource from "@/components/Resource";
import ValidationErrors from "@/components/ValidationErrors";
import { useFhirContext } from "@/context/FhirDataContext";

export default function LabTypePage() {
  const router = useRouter();
  const { report, loading, errors } = useFhirContext();

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
