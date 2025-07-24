import { createContext, useContext, useEffect, useState, useCallback } from "react";
import useFhirData from "@/hooks/useFhirData";

const FhirDataContext = createContext();

export function useFhirContext() {
    const context = useContext(FhirDataContext);
    if (!context) {
        throw new Error("useFhirContext must be used inside FhirDataProvider");
    }
    return context;
}

export function FhirDataProvider({ children }) {
    const { report: initialReport, observations: initialObservations, errors: initialErrors } = useFhirData();

    const [report, setReport] = useState(initialReport ?? null);
    const [observations, setObservations] = useState(initialObservations ?? []);
    const [errors, setErrors] = useState(initialErrors ?? []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setReport(initialReport ?? null);
        setObservations(initialObservations ?? []);
        setErrors(initialErrors ?? []);
        setLoading(false);
    }, [initialReport, initialObservations, initialErrors]);

    return (
        <FhirDataContext.Provider
            value={{ report, observations, loading, errors }}
        >
            {children}
        </FhirDataContext.Provider>
    );
}
