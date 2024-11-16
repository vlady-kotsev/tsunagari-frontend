import { WagmiProvider } from "wagmi";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Title from "./components/Title/Title.tsx";
import Bridge from "./pages/Bridge/Bridge.tsx";
import { config } from "../config/wagmiConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../config/wagmiConfig";

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <App>
        <Title />
        <Bridge />
      </App>
    </QueryClientProvider>
  </WagmiProvider>
);
