import moment from "moment";
import App, { AppContext, AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "../components/Layout";
import "../styles/global.scss";
import React from "react";
import StudentsProvider from "../providers/students";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const studentsData = {
  data: [
    {
      id: 0,
      firstname: "Brianna",
      lastname: "Steeves",
      picture_url: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 3,
      firstname: "Luke",
      lastname: "Scott",
      picture_url: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
      id: 8,
      firstname: "Ella",
      lastname: "Simmons",
      picture_url: "https://randomuser.me/api/portraits/women/30.jpg",
    },
    {
      id: 2,
      firstname: "Emma",
      lastname: "Romero",
      picture_url: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      id: 4,
      firstname: "Dan",
      lastname: "Mitchell",
      picture_url: "https://randomuser.me/api/portraits/men/83.jpg",
    },
    {
      id: 9,
      firstname: "Anne",
      lastname: "Gibson",
      picture_url: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ],
};

const ClassApp = ({ Component, pageProps }: AppProps) => {
  moment.locale("fr");
  return (
    <StudentsProvider students={pageProps.students}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </StudentsProvider>
  );
};

ClassApp.getInitialProps = async (appContext: AppContext) => {
  const students = studentsData.data;
  const appProps = await App.getInitialProps(appContext);

  appProps.pageProps = {
    ...(appProps.pageProps || {}),
    students,
  };

  return { ...appProps };
};

export default ClassApp;
