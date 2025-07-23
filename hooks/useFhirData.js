import { useEffect, useState } from "react";
import { Fhir } from "fhir";

export default function useFhirData() {
  const [report, setReport] = useState(null);
  const [observations, setObservations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFHIR = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FHIR_DR_URL);

        if (!response.ok) {
          return handleError(`FHIR API returned status ${response.status}`);
        }

        const json = await response.json();

        if (!json || Object.keys(json).length === 0) {
          return handleError("FHIR API returned an empty or invalid response.");
        }

        const client = new Fhir();
        const result = client.validate(json);

        if (!result.valid) {
          return handleError(result.messages || "FHIR data is invalid.");
        }

        const entries = json.entry;
        if (!Array.isArray(entries)) {
          return handleError("No entries found in FHIR bundle.");
        }

        const diagnosticReport = entries.find(
          (e) => e.resource?.resourceType === "DiagnosticReport"
        )?.resource;

        if (!diagnosticReport) {
          return handleError("DiagnosticReport not found in FHIR bundle.");
        }

        setReport(diagnosticReport);

        const obsIds = diagnosticReport.result?.map((r) =>
          r.reference.replace("Observation/", "")
        ) || [];

        const obs = entries
          .filter(
            (e) =>
              e.resource?.resourceType === "Observation" &&
              obsIds.includes(e.resource.id)
          )
          .map((e) => e.resource);

        setObservations(obs);
      } catch (err) {
        console.error("FHIR fetch error:", err);
        handleError("An error occurred while fetching FHIR data.");
      } finally {
        setLoading(false);
      }
    };

    const handleError = (message) => {
      const formatted =
        typeof message === "string" ? [{ message }] : message;
      setErrors(formatted);
    };

    fetchFHIR();
  }, []);

  return { report, observations, errors, loading };
}
