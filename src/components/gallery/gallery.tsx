"use client";

import Link from "next/link";
import { getFromMasterDict } from "../../models/artMasterList";
import "./gallery.css";

interface GalleryProps {
  images: string[];
  collectionName: string;
}
function Gallery(props: GalleryProps) {
  var galleryContent = props.images.map((imageName: string) => {
    return (
      <GalleryImage
        key={imageName}
        imageName={imageName}
        collectionName={props.collectionName}
      />
    );
  });

  const itemGallery = (
    <>
      {/* mobile view */}
      <div className="item-gallery-mobile lg:hidden">
        <div className="item-gallery-content">{galleryContent}</div>
      </div>
      {/* desktop view */}
      <div className="item-gallery hidden lg:flex">
        <div className="item-gallery-content">{galleryContent}</div>
      </div>
    </>
  );

  return itemGallery;
}

interface GalleryImageProps {
  imageName: string;
  collectionName: string;
}
function GalleryImage(props: GalleryImageProps) {
  const shortName = (props.imageName.split("/").pop() || "").split(".")[0];
  const href = `/visual/${props.collectionName}/${shortName}`;

  const layout = (
    <>
      {/* mobile view */}
      <div className="gallery-item lg:hidden">
        <img
          key={"img:" + props.imageName}
          className="image-base gallery-image mobile-gallery-image"
          src={`/art/${props.imageName}`}
        />
      </div>
      {/* desktop view */}
      <div className="gallery-item hidden lg:flex">
        <Link href={href}>
          <img
            key={"img:" + props.imageName}
            className="image-base gallery-image"
            src={`/art/${props.imageName}`}
          />
        </Link>
        <InfoCard name={shortName} size={0.75} />
      </div>
    </>
  );

  return layout;
}

interface InfoCardProps {
  name: string;
  size: number;
}
function InfoCard(props: InfoCardProps) {
  return (
    <div className="image-info-card" style={{ fontSize: `${props.size}rem` }}>
      <a>gain (b.1998)</a>
      <i>
        <b>{props.name}</b>
      </i>
      {/* <a style={{marginTop: "2em"}}>not an nft. authentic, original, and unique piece of art.</a> */}
    </div>
  );
}

export { Gallery, InfoCard };
