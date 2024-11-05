import { http, createConfig } from "wagmi";
import { baseSepolia, taikoHekla } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const config = createConfig({
  chains: [taikoHekla, baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
    [taikoHekla.id]: http(),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
});
