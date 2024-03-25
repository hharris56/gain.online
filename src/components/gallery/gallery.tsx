"use client"

import Link from "next/link";
import { getFromMasterDict, InfoCard } from "../../models/artMasterList";
import "./gallery.css"
import { useIsMobile } from "../../hooks/mobileHooks";

interface GalleryProps{
    images: string[],
    collectionName: string,
}
function Gallery(props: GalleryProps){
    const isMobile = useIsMobile()
    var galleryContent = props.images.map((imageName: string) => {
        return (
            <GalleryImage key={imageName} imageName={imageName} collectionName={props.collectionName}/>
        )
    });

    const itemGallery = isMobile ?
    ( // mobile view
        <div className="item-gallery-mobile">
            <div className='item-gallery-content'>
                {galleryContent}
            </div>
        </div>
    ) :
    ( // desktop view
        <div className="item-gallery">
            <div className='item-gallery-content'>
                {galleryContent}
            </div>
        </div>
    )
    return itemGallery
}

interface GalleryImageProps{
    imageName: string,
    collectionName: string,
}
function GalleryImage(props: GalleryImageProps){
    const shortName = (props.imageName.split("/").pop() || "").split(".")[0]
    const href = `/visual/${props.collectionName}/${shortName}`

    const isMobile = useIsMobile()
    const layout = isMobile ?
    ( // mobile view
        <div className="gallery-item">
            <img key={"img:" + props.imageName} 
            className="image-base gallery-image mobile-gallery-image" src={`/art/${props.imageName}`}/>
        </div>
    ) :
    ( // desktop view
        <div className="gallery-item">
            <Link href={href}>
                <img key={"img:" + props.imageName} 
                className="image-base gallery-image" src={`/art/${props.imageName}`}/>
            </Link>
            <InfoCard name={shortName} size={0.2}/>
        </div>
    )
    return layout
}

export { Gallery }