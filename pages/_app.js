import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ProfileContextProvider } from "@/context/profileContextProvider";
import Layout from "@/layout";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const isUserLogin = !!Cookies.get("sb_token");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
		return null;
	}

  return (
    <ChakraProvider>
      {isUserLogin ? (
        <ProfileContextProvider>
          <Layout isUserLogin={isUserLogin}>
            <Component {...pageProps} />
          </Layout>
        </ProfileContextProvider>
      ) : (
        <Layout isUserLogin={isUserLogin}>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  );
}
