import {getFromMasterDict, certificateText} from "../artMasterList"
import "./imgView.css"

// viewImage is 'collectionName/shortName'
export default function ViewPage({ params }: { params: { viewImage: string } }){
    const collectionName = decodeURI(params.viewImage[0])
    const shortName = decodeURI(params.viewImage[1])
    let imgPath: string = getFromMasterDict(collectionName, shortName)
    // const imgPath: string = ArtMasterDict[collectionName][shortName]
    return (
        imgPath == "" ?
        <div>oops, nothing was found for {collectionName} / {shortName}</div>
        :
        <div className="view-image-container">
            <img key="big image" src={`/art/${imgPath}`} className="view-image"/>
            <div className="image-info-card" 
            style={{fontSize: "1rem", marginRight: "0rem", backgroundImage: "/assets/certificate big.png"}}>
                <div style={{backgroundColor: "white"}}>
                    {certificateText(shortName)}
                </div>
            </div>
        </div>
    )
}