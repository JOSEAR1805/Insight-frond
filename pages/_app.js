import React, { useEffect } from "react";
import App from "next/app";
import { useRouter } from "next/router";

import "../src/style/antd.less";

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    if (process.browser) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        if (router.pathname === "/login") {
          router.push("/tenders/");
        }
      } else {
        router.push("/login");
      }
    }
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
