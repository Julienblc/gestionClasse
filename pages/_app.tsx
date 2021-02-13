import moment from "moment";
import { AppProps } from "next/app";
import "../styles/global.scss";
import Layout from "../components/Layout";
import "../styles/global.scss";

const ClassApp = ({ Component, pageProps }: AppProps) => {
  moment.locale("fr");
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default ClassApp;
