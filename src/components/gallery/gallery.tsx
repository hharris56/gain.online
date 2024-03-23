import Link from "next/link";
import { getFromMasterDict, InfoCard } from "../../models/artMasterList";
import "./gallery.css"

// TODO: implement mobile view

interface GalleryProps{
    images: string[],
    collectionName: string,
}
function Gallery(props: GalleryProps){
    var galleryContent = props.images.map((imageName: string) => {
        return (
            <GalleryImage key={imageName} imageName={imageName} collectionName={props.collectionName}/>
        )
    });
    var itemGallery = (
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

    return (
        <div className="gallery-item">
            <a href={href}>
                <img key={"img:" + props.imageName} 
                className="image-base gallery-image" src={`/art/${props.imageName}`}/>
            </a>
            <InfoCard name={shortName} size={0.2}/>
        </div>
    )
}

export { Gallery }