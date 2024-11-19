import { useEffect, useState } from "react";
import { getCookies } from "@/utils/config";
import { useRouter } from "next/router";
import api from "@/configs/api";

export default function useVerifyUs() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = getCookies("Token");
      setToken(token);
      if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
      }
      if (!!token && (window.location.pathname.startsWith("/") || window.location.pathname.startsWith("/register"))) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        router.push("/dashboard");
      }
      if (!token && window.location.pathname.startsWith("/dashboard")) {
        router.push("/");
      }
    }
  }, [token]);
  return {};
}
