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
        <div className="flex flex-col px-4 md:pl-8">
          <h1 className="hidden text-4xl font-bold my-4 md:flex md:mt-0">
            gain.online
          </h1>
          <div className="mt-4">
            hey, welcome to my corner of the web. my name is{" "}
            <mark className="bg-(--primary-text-color) text-(--primary-text-color)">
              nicetrylol
            </mark>{" "}
            but <u>online</u> i go by <u>gain</u>. im a 27yo artist, programmer,
            and avid enjoyer of all things related to music and design. for now
            this site acts as a personal blog, soon it will return to
            functioning as an archive of my current and past works. until then
            you can check out some of my music via the socials below.
            {/* of all things related to music and design. check out some of my work, */}
            {/* you can reach me via the contact page or find me on my socials. */}
          </div>
          <div className="flex flex-row gap-4 justify-center mt-4">
            <a href="/releases">[releases]</a>
            <a href="/blog">[blog]</a>
          </div>
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </NoSsr>
  );
}
