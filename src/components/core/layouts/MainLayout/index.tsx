"use client";

import { AppProgressBar } from "next-nprogress-bar";
import FooterLayoutComponent from "./FooterLayout";
import themeColors from "@/style/themes/default/colors";

import dynamic from "next/dynamic";
const HeaderLayoutComponent = dynamic(() => import("./HeaderLayout"));

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderLayoutComponent />
      <AppProgressBar
        height="4px"
        color={themeColors.primary}
        options={{ showSpinner: false }}
        shallowRouting
      />
      <main
        style={{
          marginTop: "80px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
      <FooterLayoutComponent />
    </>
  );
}

export default MainLayout;
