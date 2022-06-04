import React from "react";
import "../styles/globals.css";
import "react-day-picker/dist/style.css";
import Layout from "../components/Layout";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
