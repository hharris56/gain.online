import { LineDecoration } from "../../components/line-decoration";

const className = "cursor-pointer text-inherit underline";

export default function Footer() {
  return (
    <div className="flex grow justify-around items-center align-top h-8 text-(--secondary-text-color) mb-2">
      <a
        href="https://twitter.com/gain__online"
        target="_blank"
        className={className}
      >
        twitter
      </a>
      <LineDecoration sx="!mx-0" />
      <a
        href="https://www.instagram.com/gain__online/?next=%2F"
        target="_blank"
        className={className}
      >
        instagram
      </a>
      <LineDecoration sx="!mx-0" />
      <a
        href="https://soundcloud.com/gain_online"
        target="_blank"
        className={className}
      >
        soundcloud
      </a>
    </div>
  );
}
