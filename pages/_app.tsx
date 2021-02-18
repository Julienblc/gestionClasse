import moment from "moment";
import App, { AppContext, AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "../components/Layout";
import "../styles/global.scss";
import React from "react";
import StudentsProvider from "../providers/students";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import LoadingSpinner from "../components/LoadingSpinner";

const ClassApp = ({ Component, pageProps }: AppProps) => {
  moment.locale("fr");

  const { data, error } = useSWR("/user?limit=10", fetcher);

  if (error)
    return <div>Une erreur est survenue, veuillez re-essayer plus tard.</div>;
  if (!data) return <LoadingSpinner />;

  return (
    <StudentsProvider students={data.data}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </StudentsProvider>
  );
};

ClassApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  appProps.pageProps = {
    ...(appProps.pageProps || {}),
  };

  return { ...appProps };
};

export default ClassApp;
