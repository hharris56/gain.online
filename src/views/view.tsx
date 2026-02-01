"use client";

import { useLayoutEffect } from "react";
import { Header, HeaderBuffer } from "../components/header/header";
import Footer from "@/features/layout/footer";
import { useIsMobile } from "../hooks/mobileHooks";
import MobileView from "./mobileView/mobileView";
import { usePathname } from "next/navigation";
import ColorManager from "../hooks/colorManager";
import { UniversalHeader } from "@/features/layout/header";

export default function View({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  useLayoutEffect(() => {
    const cm = new ColorManager();
    cm.resetColors();
  }, []);

  var newLayout: any = <></>;
  newLayout = useIsMobile() ? (
    // mobile view
    <MobileView>
      <div>{children}</div>
    </MobileView>
  ) : (
    // desktop view
    <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
      <Header />
      <HeaderBuffer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0rem 2rem",
        }}
      >
        <div style={{ marginBottom: "2rem", fontSize: "1rem" }}>{children}</div>
        <Footer />
      </div>
    </div>
  );

  // on landing page, don't show layout
  return pathName == "/" ? (
    <>{children}</>
  ) : (
    <div className="webpage-container">
      <div className="flex flex-col md:flex-row md:p-8 md:pb-0">
        <UniversalHeader />
        <div className="flex flex-col px-4 gap-4 md:pl-8">
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
