import { LineDecoration } from "../../components/line-decoration";

export default function Footer() {
  return (
    <div className="flex grow justify-around align-top h-8 max-h-8 text-(--secondary-text-color)">
      <a
        href="https://twitter.com/gain__online"
        target="_blank"
        className="cursor-pointer text-inherit no-underline"
      >
        twitter
      </a>
      <LineDecoration sx="!mx-0" />
      <a
        href="https://www.instagram.com/gain__online/?next=%2F"
        target="_blank"
        className="cursor-pointer text-inherit no-underline"
      >
        instagram
      </a>
      <LineDecoration sx="!mx-0" />
      <a
        href="https://soundcloud.com/gain_online"
        target="_blank"
        className="cursor-pointer text-inherit no-underline"
      >
        soundcloud
      </a>
    </div>
  );
}
