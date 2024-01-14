import Link from "next/link";
import { certificateText, getFromMasterDict } from "../../app/visual/artMasterList";
import "./gallery.css"

interface GalleryProps{
    images: string[],
    collectionName: string,
}
function Gallery(props: GalleryProps){
    var galleryContent = props.images.map((pic: string) => {
        return (
            <GalleryImage imageName={pic} collectionName={props.collectionName}></GalleryImage>
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
            <Link href={href}>
                <img key={props.imageName} 
                className="image-base gallery-image" src={`/art/${props.imageName}`}/>
            </Link>
            <div className="image-info-card" style={{fontSize: ".15rem"}}>
                {certificateText(shortName)}
            </div>
        </div>
    )
}

export default Gallery