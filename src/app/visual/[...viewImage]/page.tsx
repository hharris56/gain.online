import {getFromMasterDict} from "../../../models/artMasterList"
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
            style={{fontSize: "0.75rem", marginRight: "0rem", backgroundImage: "/assets/certificate big.png"}}>
                <div style={{backgroundColor: "white"}}>
                    <div><b>gain++</b> (b.1998)</div>
                    <i><b>{shortName}</b></i>
                </div>
            </div>
        </div>
    )
}