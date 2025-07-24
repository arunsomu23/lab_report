import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { FhirDataProvider } from "@/context/FhirDataContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const requiresAuth = Component.authRequired !== false;

    if (requiresAuth && !token) {
      router.replace("/login");
    }
  }, [Component, router.pathname]);

  const isFhirRoute = router.pathname.startsWith("/lab");
  const Page = (
    <Component {...pageProps} />
  );

  return isFhirRoute ? (
    <FhirDataProvider>{Page}</FhirDataProvider>
  ) : (
    Page
  );
};