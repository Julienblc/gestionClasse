import moment from "moment";
import App, { AppContext, AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "../components/Layout";
import "../styles/global.scss";
import React from "react";
import StudentsProvider from "../providers/students";

const studentsData = {
  data: [
    {
      id: 0,
      firstname: "Julien",
      lastname: "Blanc",
      picture_url: "https://randomuser.me/api/portraits/men/27.jpg",
    },
    {
      id: 3,
      firstname: "Maxime",
      lastname: "Blanc",
      picture_url: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 8,
      firstname: "Colline",
      lastname: "Blanc",
      picture_url: "https://randomuser.me/api/portraits/women/40.jpg",
    },
    {
      id: 2,
      firstname: "Charlotte",
      lastname: "Chanard",
      picture_url: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 4,
      firstname: "Guilhem",
      lastname: "Fanton",
      picture_url: "https://randomuser.me/api/portraits/men/17.jpg",
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
