import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Gestion de la classe" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <header>
      {/* <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav> */}
    </header>
    {children}
    <footer></footer>
  </div>
);

export default Layout;
