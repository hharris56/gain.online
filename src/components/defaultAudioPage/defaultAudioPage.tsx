import "./defaultAudioPage.css";
import { MusicLinkBar } from "../linkBar/linkBar";
import BackButton from "../buttons/backButton";

interface AudioPageProps {
  cover: string;
  title: string;
  date?: string;
  links?: any;
  description?: string;
}
export default function DefaultAudioPage(props: AudioPageProps) {
  return (
    <div className="dap-container">
      {/* <BackButton route="/audio"/> */}
      <img
        src={props.cover}
        className="dap-image lg:hidden"
        style={{ width: "75vw" }}
      />
      <div className="dap-row">
        <img src={props.cover} className="dap-image hidden lg:flex" />
        <div className="dap-text-container">
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {props.title}
          </div>
          <p
            style={{
              color: "var(--secondary-text-color)",
              textAlign: "center",
            }}
          >
            {props.date}
          </p>
          <div className="dap-text mt-8">
            <MusicLinkBar links={props.links} sx={{ marginBottom: "2rem" }} />
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
