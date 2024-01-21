import Link from "next/link";
import { getFromMasterDict } from "../../models/artMasterList";
import "./gallery.css"

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
            <Link href={href}>
                <img key={"img:" + props.imageName} 
                className="image-base gallery-image" src={`/art/${props.imageName}`}/>
            </Link>
            <InfoCard name={shortName} size={0.2}/>
        </div>
    )
}

interface InfoCardProps{
    name: string
    size: number
}
function InfoCard(props: InfoCardProps){
    return (
        <div className="image-info-card" style={{fontSize: `${props.size}rem`}}>
            <p><b>gain++</b> (b.1998)</p>
            <i><b>{props.name}</b></i>
        </div>
    )
}

export { Gallery, InfoCard }