import { useEffect, useState } from "react";
import { Fhir } from "fhir";

export default function useFhirData() {
  const [report, setReport] = useState(null);
  const [observations, setObservations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFHIR() {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FHIR_DR_URL,
        );
        const json = await response.json();

        const client = new Fhir();
        const result = client.validate(json);

        if (!result.valid) {
          setErrors(result.messages || []);
          return;
        }

        const entries = json.entry;
        const diagnosticReport = entries.find(
          (e) => e.resource.resourceType === "DiagnosticReport",
        )?.resource;

        setReport(diagnosticReport);

        const obsIds = diagnosticReport?.result?.map((r) =>
          r.reference.replace("Observation/", ""),
        );

        const obs = entries
          .filter(
            (e) =>
              e.resource.resourceType === "Observation" &&
              obsIds.includes(e.resource.id),
          )
          .map((e) => e.resource);

        setObservations(obs);
      } catch (err) {
        console.error("FHIR parsing error:", err);
        setErrors([{ message: "An error occurred while fetching FHIR data." }]);
      } finally {
        setLoading(false);
      }
    }

    fetchFHIR();
  }, []);

  return { report, observations, errors, loading };
}
