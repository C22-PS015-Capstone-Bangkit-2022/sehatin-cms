import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import initAuth from "../utils/initAuth";
import { QueryClient, QueryClientProvider } from "react-query";
initAuth();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
