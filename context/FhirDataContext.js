import { createContext, useContext, useEffect, useState, useCallback } from "react";

const FhirDataContext = createContext();

export function useFhirContext() {
  const context = useContext(FhirDataContext);
  if (!context) {
    throw new Error("useFhirContext must be used inside FhirDataProvider");
  }
  return context;
}

export function FhirDataProvider({ children }) {
  const [report, setReport] = useState(null);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const cached = sessionStorage.getItem("fhirData");
    if (!cached) return;

    try {
      const parsed = JSON.parse(cached);
      setReport(parsed.report ?? null);
      setObservations(parsed.observations ?? []);
      setErrors(parsed.errors ?? []);
    } catch (e) {
      console.error("Failed to parse cached FHIR data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const setFhirData = useCallback((data) => {
    setErrors(data.errors);
    setReport(data.report);
    setObservations(data.observations);
    sessionStorage.setItem("fhirData", JSON.stringify(data));
    setLoading(false);
  }, []);

  return (
    <FhirDataContext.Provider
      value={{ report, observations, loading, errors, setFhirData }}
    >
      {children}
    </FhirDataContext.Provider>
  );
}
