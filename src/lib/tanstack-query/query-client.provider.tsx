"use client";

import React from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
  QueryCache,
} from "@tanstack/react-query";
import { clientErrorHandler } from "../error/error-handler";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, _) => {
      // Triggers once per failed network request
      return clientErrorHandler(error);
    },
  }),
});

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={queryClient}>{children}</Provider>;
}
