import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-100 min-h-screen">
          <App />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
