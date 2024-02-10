const ArtMasterList: any = {
    "cars!": [
        "./cars/mr2 mk1.jpg",
        "./cars/tacoma.jpg",
        "./cars/mr2.jpg",
        "./cars/ae86.jpg",
        "./cars/f150.jpg",
        "./cars/saab.jpg",
        "./cars/gti.jpg"
    ],
    "cloud study one": [
        "./clouds/cloud study 7.jpg",
        "./clouds/cloud study 6.jpg",
        "./clouds/cloud study 5.jpg",
        "./clouds/cloud study 4.jpg",
        "./clouds/cloud study 3.jpg",
        "./clouds/cloud study 2.jpg",
        "./clouds/cloud study 1.jpg"
    ],
    "star charts": [
        "elevation.png",
        "momentum.png",
        "optics.png",
        "magnetism.png"
    ],
    "accretion department": [
        "human condition.png",
        "lazarus awoke.png",
        "5 nights in the city that never sleeps.png",
        "sterile.jpg",
        "the sound of living.png",
        "future reflections.jpg",
        "when did the sky get so far away.jpg",
        "ill advised transport.jpg",
        "self portrait 1.png",
        "media life.png",
        "virtual ghost.png",
        "directory management.jpg",
        "scan away our sins.jpg",
        "leave me here.jpg",
        "sunrise.png",
        "depth and distance.jpg",
        "the places were told not to go.png",
        "i liked it better inside.jpg",
        "a chance encounter.png",
        "one for the books.jpg",
        "smoking kills.jpg",
        "its not getting any easier.jpg",
        "aerodynamic lies.jpg",
        "allstar.png",
        "take me there.jpg",
        "genesis.jpg"
    ]
}

var ArtMasterDict: any = buildMasterDict()
function buildMasterDict(){
    // define result
    let masterDict: any = {};
    // iterate over each collection in ArtMasterList
    let keys = Object.keys(ArtMasterList)
    keys.forEach((collectionName: string) => {
        let collectionDict: any = {};
        // iterate over all values within that collection
        let collection = ArtMasterList[collectionName]
        collection.forEach((imageName: string) => {
            const shortName = (imageName.split("/").pop() || "").split(".")[0]
            collectionDict[shortName] = imageName
        })
        masterDict[collectionName] = collectionDict;
    })
    return masterDict
}

function certificateText(shortName: string){
    return `this card certifies that the artist, gain, declares the accompanying piece of artwork titled '${shortName}' to be an authentic, original, and unique piece of his own creative efforts.`
}

function getFromMasterDict(collectionName: string, imageName: string){
    return (ArtMasterDict[collectionName] || "")[imageName] || ""
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
            <a style={{marginTop: "2em"}}>not an nft. authentic, original, and unique piece of art.</a>
        </div>
    )
}

export {ArtMasterList, ArtMasterDict, InfoCard, getFromMasterDict};