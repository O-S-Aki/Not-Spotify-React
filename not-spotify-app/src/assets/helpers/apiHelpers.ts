import { IArtistList, ISimpleArtist, ISimpleTrack } from "./interfaces/interfaces";

// capitalizes the first leter of a string
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// maps a simple artist API response into a strongly typed object
export const mapSimpleArtist = (fetchedArtist: any): ISimpleArtist => {
  const artist: ISimpleArtist = {
    id: fetchedArtist.id,
    name: fetchedArtist.name,
    image: fetchedArtist.images[0].url || "",
    type: capitalizeFirst(fetchedArtist.type),
  }

  return artist;
}

// maps an artist list API response into a strongly typed object
export const mapArtistList = (fetchedArtists: any): IArtistList => {
  let artistList: IArtistList = {
    items: [],
    total: 0,
  }
  
  fetchedArtists.items.forEach((fetchedArtist: any) => {
    const artist = mapSimpleArtist(fetchedArtist);
    artistList.items.push(artist);
    artistList.total ++;
  });

  return artistList;
}

export const mapSimpleTrack = (fetchedTrack: any): ISimpleTrack => {
  const track: ISimpleTrack = {
    id: fetchedTrack.id,
    name: fetchedTrack.name,
    image: fetchedTrack.images[0].url || "",
    trackNumber: fetchedTrack.track_number,
    artists: mapArtistList(fetchedTrack.artists),
    type: capitalizeFirst(fetchedTrack.type),
  }
}