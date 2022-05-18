import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import initAuth from "../utils/initAuth";
initAuth();
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
