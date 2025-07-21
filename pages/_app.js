import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";

const PROTECTED_ROUTES = ["/", "/lab", "/lab/details"];

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    const isProtected = PROTECTED_ROUTES.some((route) =>
      router.pathname.startsWith(route)
    );

    if (!token && isProtected) {
      router.replace("/login");
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
