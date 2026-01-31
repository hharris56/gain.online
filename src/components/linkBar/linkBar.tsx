import "./linkBar.css";
import LinkButton from "../buttons/linkButton";

interface MusicLinkProps {
  links: any;
  sx?: any;
}

function MusicLinkBar(props: MusicLinkProps) {
  return (
    <span className="link-bar" style={props.sx}>
      {props.links.spotify && (
        <LinkButton link={props.links.spotify} icon="spotify" text="spotify" />
      )}
      {props.links.apple && (
        <LinkButton link={props.links.apple} icon="apple" text="apple music" />
      )}
      {props.links.soundcloud && (
        <LinkButton
          link={props.links.soundcloud}
          icon="soundcloud"
          text="soundcloud"
        />
      )}
    </span>
  );
}

export { MusicLinkBar };
