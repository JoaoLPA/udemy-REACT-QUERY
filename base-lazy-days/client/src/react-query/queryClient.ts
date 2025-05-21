import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";

import { toast } from "@/components/app/toast";

// eslint-disable-next-line @typescript-eslint/ban-types
type actionsTypes = "query" | "mutation" | (string & {});

function titleFactory(errorMsg: string, actionType: actionsTypes) {
  const action = actionType === "query" ? "fetch" : "update";

  return `could not ${action} data: ${
    errorMsg ?? "error connecting to server"
  }`;
}

function errorHandler(errorMsg: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    const action = "fetch";
    const title = `could not ${action} data: ${
      errorMsg ?? "error connecting to server"
    }`;
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 90000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const title = titleFactory(error.message, "query");
      return errorHandler(title);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = titleFactory(error.message, "mutation");
      return errorHandler(title);
    },
  }),
};

export const queryClient = new QueryClient(queryClientOptions);
