import { useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/layouts/MainLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import Resource from "@/components/Resource";
import ValidationErrors from "@/components/ValidationErrors";
import { useFhirContext } from "@/context/FhirDataContext";
import useFhirData from "@/hooks/useFhirData";

export default function LabTypePage() {
  const router = useRouter();
  const { report, setFhirData } = useFhirContext();
  const {
    report: fetchedReport,
    observations,
    loading: dataLoading,
    errors: fetchErrors,
  } = useFhirData();

  useEffect(() => {
    if (fetchedReport && observations?.length) {
      setFhirData({ report: fetchedReport, observations });
    }
  }, [fetchedReport, observations, setFhirData]);

  if (fetchErrors?.length > 0) {
    setFhirData({ errors: fetchErrors });
    return (
      <MainLayout>
        <ValidationErrors errors={fetchErrors} />
      </MainLayout>
    );
  }

  if (dataLoading || !report) {
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
