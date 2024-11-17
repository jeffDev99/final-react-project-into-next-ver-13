import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "@/configs/reactQuery.js";
import ProtectedRoute from "@/Components/modules/ProtectedRoute/ProtectedRoute";
export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </QueryClientProvider>
  );
}
