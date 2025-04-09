"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import RefreshTokenWorkerInitializer from "./RefreshTokenWorkerInitializer";

const queryClient = new QueryClient();

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
		<QueryClientProvider client={queryClient}>
			<RefreshTokenWorkerInitializer />
      {children}
    </QueryClientProvider>
  );
};
