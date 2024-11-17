import useVerifyUs from "@/hook/useVerifyUs";

export default function ProtectedRoute({ children }) {
  useVerifyUs()
  return children;
}
