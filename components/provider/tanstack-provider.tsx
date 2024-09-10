"use client"

import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
export const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  //const queryClient = new QueryClient({
  //  mutationCache: new MutationCache({
  //    onSuccess: (_data, _variables, _context, mutation) => {
  //      // Invalidate all queries upon mutation success
  //      queryClient.invalidateQueries();
  //
  //      // Optionally, you can tie invalidation to specific queries using mutation options
  //      if (mutation.options.mutationKey) {
  //        queryClient.invalidateQueries({
  //          queryKey: mutation.options.mutationKey,
  //        });
  //      }
  //    },
  //  }),
  //});

  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
