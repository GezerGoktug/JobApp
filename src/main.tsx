import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import JobProvider from "./context/JobProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <JobProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </JobProvider>
);
