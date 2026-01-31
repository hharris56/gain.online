const ArtMasterList: any = {
  "cars!": [
    "./cars/911 targa.jpg",
    "./cars/mr2 mk1.jpg",
    "./cars/tacoma.jpg",
    "./cars/mr2.jpg",
    "./cars/ae86.jpg",
    "./cars/f150.jpg",
    "./cars/saab.jpg",
    "./cars/gti.jpg",
  ],
  "cloud study one": [
    "./clouds/cloud study 7.jpg",
    "./clouds/cloud study 6.jpg",
    "./clouds/cloud study 5.jpg",
    "./clouds/cloud study 4.jpg",
    "./clouds/cloud study 3.jpg",
    "./clouds/cloud study 2.jpg",
    "./clouds/cloud study 1.jpg",
  ],
  "star charts": [
    "starcharts/elevation.png",
    "starcharts/momentum.png",
    "starcharts/optics.png",
    "starcharts/magnetism.png",
  ],
  "accretion department": [
    "accretion/human condition.png",
    "accretion/lazarus awoke.png",
    "accretion/5 nights in the city that never sleeps.png",
    "accretion/sterile.jpg",
    "accretion/the sound of living.png",
    "accretion/future reflections.jpg",
    "accretion/when did the sky get so far away.jpg",
    "accretion/ill advised transport.jpg",
    "accretion/self portrait 1.png",
    "accretion/media life.png",
    "accretion/virtual ghost.png",
    "accretion/directory management.jpg",
    "accretion/scan away our sins.jpg",
    "accretion/leave me here.jpg",
    "accretion/sunrise.png",
    "accretion/depth and distance.jpg",
    "accretion/the places were told not to go.png",
    "accretion/i liked it better inside.jpg",
    "accretion/a chance encounter.png",
    "accretion/one for the books.jpg",
    "accretion/smoking kills.jpg",
    "accretion/its not getting any easier.jpg",
    "accretion/aerodynamic lies.jpg",
    "accretion/allstar.png",
    "accretion/take me there.jpg",
    "accretion/genesis.jpg",
  ],
};

var ArtMasterDict: any = buildMasterDict();
function buildMasterDict() {
  // define result
  let masterDict: any = {};
  // iterate over each collection in ArtMasterList
  let keys = Object.keys(ArtMasterList);
  keys.forEach((collectionName: string) => {
    let collectionDict: any = {};
    // iterate over all values within that collection
    let collection = ArtMasterList[collectionName];
    collection.forEach((imageName: string) => {
      const shortName = (imageName.split("/").pop() || "").split(".")[0];
      collectionDict[shortName] = imageName;
    });
    masterDict[collectionName] = collectionDict;
  });
  return masterDict;
}

function certificateText(shortName: string) {
  return `this card certifies that the artist, gain, declares the accompanying piece of artwork titled '${shortName}' to be an authentic, original, and unique piece of his own creative efforts.`;
}

function getFromMasterDict(collectionName: string, imageName: string) {
  return (ArtMasterDict[collectionName] || "")[imageName] || "";
}

export { ArtMasterList, ArtMasterDict, getFromMasterDict };
