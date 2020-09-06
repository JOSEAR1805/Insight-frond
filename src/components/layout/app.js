import { Layout } from "antd";
import Head from "next/head";

import HeaderApp from "./header";
import SiderbarApp from "./sidebar";
import ContentApp from "./content";
import FooterApp from "./footer";

const SiderDemo = (props) => {
  const { children, navigation } = props;

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          httpEquiv="Content-Security-Policy: default-src *://66.97.36.222"
          content="upgrade-insecure-requests"
        />
      </Head>

      <SiderbarApp />
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderApp />
        <Layout>
          <ContentApp navigation={navigation && navigation.length >= 1 ? navigation : []}>
            {children}
          </ContentApp>
        </Layout>
        <FooterApp />
      </Layout>
    </Layout>
  );
};

export default SiderDemo;
