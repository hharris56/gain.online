import "./mobileView.css";
import MobileHeader from "../../components/header/mobileHeader";
import Footer from "../../features/layout/footer";

export default function MobileView(props: any) {
  return (
    <>
      <MobileHeader />
      <div style={{ padding: "1rem" }}>{props.children}</div>
      <Footer />
    </>
  );
}
