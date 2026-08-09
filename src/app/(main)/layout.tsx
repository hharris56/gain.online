import "../globals.css";
import Footer from "@/features/layout/footer";
import { UniversalHeader } from "@/features/layout/header";
import NoSsr from "../../hooks/noSsr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoSsr>
      <div className="flex flex-col md:flex-row md:p-8 md:pb-0">
        <UniversalHeader />
        <div className="flex flex-col px-4 gap-4 md:pl-8">
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </NoSsr>
  );
}
