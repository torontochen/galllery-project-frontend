import { useState, useEffect } from "react";
import { useArtStore, useArtistStore, useUserStore } from "../store/store";
import type { Art } from "../types";
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Facebook, Instagram, X } from "iconoir-react";
import MasonryExhibitionCol from "../components/MasonryExhibitionCol";

interface MasonryColArts {
  artList: Art[];
}

export default function ArtistPage() {
  const { artists, currentArtist, setCurrentArtist } = useArtistStore();
  const { filteredArts } = useArtStore();
  const { accessToken, browserWidth } = useUserStore();
  const [artistArts, setArtistArts] = useState<Art[]>();
  const [masonryColArtList, setMasonryColArtList] = useState<MasonryColArts[]>(
    []
  ); // Initialize with the first artist or null
  const [numberOfMasonryCols, setNumberOfMasonryCols] = useState<number>(0);

  useEffect(() => {
    console.log("browserWidth in ArtistFeatured", browserWidth);
    if (browserWidth >= 1280) setNumberOfMasonryCols(3);
    if (browserWidth < 1280) setNumberOfMasonryCols(2);
    // if (browserWidth < 1024) setNumberOfMasonryCols(2);
  }, [browserWidth]);

  useEffect(() => {
    const localFilteredArts = filteredArts.filter(
      (art) => art.artist.uid === currentArtist.uid
    );
    setArtistArts(localFilteredArts);
  }, [currentArtist, filteredArts, accessToken]);

  useEffect(() => {
    if (artistArts) {
      const unitsPerCol = Math.floor(artistArts.length / numberOfMasonryCols);
      console.log("unitsPerCol", unitsPerCol);

      let leftArts = artistArts.length - unitsPerCol * numberOfMasonryCols;
      // const numberOfMasonryCols = Math.floor(featuredArtList.length / 3);
      // let indexOfArtistList = 0;
      let colArts: Art[] = [];
      let masonryColArts: MasonryColArts[] = [];
      var index = 0;

      for (let i = 0; i < numberOfMasonryCols; i++) {
        // for (let j = 0; j < 3; j++) {
        //   colArtists.push(artList[indexOfArtistList]);
        //   indexOfArtistList++;
        // }
        if (leftArts > 0) {
          colArts = artistArts.slice(index, index + unitsPerCol + 1);
          index = index + unitsPerCol + 1;
          leftArts--;
          console.log("colArts", colArts);
        } else {
          colArts = artistArts.slice(index, index + unitsPerCol);
          index = index + unitsPerCol;
        }
        masonryColArts.push({ artList: colArts });
        colArts = [];
      }
      // console.log(masonryColArts);
      setMasonryColArtList(masonryColArts);
    }
  }, [artistArts, numberOfMasonryCols]);

  return (
    <>
      <div className="w-full flex max-lg:flex-col max-lg:justify-start justify-center items-start min-h-[70vh] bg-[url('/bg-img.jpg')]  bg-cover bg-center bg-no-repeat gap-x-3 z-80 pb-6">
        <div className=" xl:w-2/12  w-3/12 top-[100px] sticky max-lg:hidden ">
          <Card className="w-full">
            <Card.Header
              as="img"
              src={currentArtist.avatar_url}
              alt="profile-picture"
            />
            <Card.Body className="text-center">
              <select
                className="p-2 ml-1  hover:cursor-pointer font-bold rounded-md border-none border-shadowcolor focus:outline-none text-xl  focus:border-transparent"
                value={currentArtist.uid}
                onChange={(e) => {
                  const index = artists.findIndex(
                    (artist) => artist.uid === e.target.value
                  );
                  setCurrentArtist(artists[index]);
                }}
              >
                {artists.map((artist, index) => (
                  <option
                    key={artist.uid}
                    value={artist.uid}
                    className="text-shadowcolor font-light text-sm"
                  >
                    {`${artist.first_name} ${artist.last_name}`}
                  </option>
                ))}
              </select>
              {/* <Typography type="h5">{`${artist.first_name} ${artist.last_name}`}</Typography> */}
              <Typography
                className="my-1 text-sm font-thin text-justify leading-6 "
                as="p"
              >
                {currentArtist.bio}
              </Typography>
            </Card.Body>
            <Card.Footer className="flex items-center justify-center gap-1">
              <Tooltip>
                <Tooltip.Trigger as={IconButton} size="sm" variant="ghost">
                  <X className="h-3.5 w-3.5" />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Follow
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
              <Tooltip>
                <Tooltip.Trigger as={IconButton} size="sm" variant="ghost">
                  <Facebook className="h-4 w-4" />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Like
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
              <Tooltip>
                <Tooltip.Trigger as={IconButton} size="sm" variant="ghost">
                  <Instagram className="h-4 w-4" />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  Follow
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip>
            </Card.Footer>
          </Card>
        </div>
        <div className=" w-10/12 top-[100px] sticky lg:hidden mx-auto ">
          <Card className="w-full max-lg:flex max-lg:flex-row max-sm:p-3">
            <div className="w-4/12 flex flex-col justify-between items-center gap-y-6">
              <Card.Header
                as="img"
                src={currentArtist.avatar_url}
                alt="profile-picture"
                className="w-full object-cover"
              />
              <div className="flex items-center justify-end gap-1 mb-6">
                <Tooltip>
                  <Tooltip.Trigger as={IconButton} size="xs" variant="ghost">
                    <X className="h-3.5 w-3.5" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Follow
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
                <Tooltip>
                  <Tooltip.Trigger as={IconButton} size="xs" variant="ghost">
                    <Facebook className="h-4 w-4" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Like
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
                <Tooltip>
                  <Tooltip.Trigger as={IconButton} size="xs" variant="ghost">
                    <Instagram className="h-4 w-4" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Follow
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip>
              </div>
            </div>

            <Card.Body className=" flex flex-col justify-between items-center gap-y-6 text-center space-y-3">
              <select
                className="p-2 ml-1  hover:cursor-pointer font-bold rounded-md border-none border-shadowcolor focus:outline-none text-xl max-sm:text-md focus:border-transparent"
                value={currentArtist.uid}
                onChange={(e) => {
                  const index = artists.findIndex(
                    (artist) => artist.uid === e.target.value
                  );
                  setCurrentArtist(artists[index]);
                }}
              >
                {artists.map((artist, index) => (
                  <option
                    key={artist.uid}
                    value={artist.uid}
                    className="text-shadowcolor font-light text-sm"
                  >
                    {`${artist.first_name} ${artist.last_name}`}
                  </option>
                ))}
              </select>
              {/* <Typography type="h5">{`${artist.first_name} ${artist.last_name}`}</Typography> */}
              <Typography
                className="my-1 text-sm max-sm:xs font-thin text-justify leading-6 "
                as="p"
              >
                {currentArtist.bio}
              </Typography>
            </Card.Body>
          </Card>
        </div>
        <div className="w-6/12 max-lg:w-10/12 max-lg:gap-1  mt-2 max-lg:mx-auto grid grid-cols-2 gap-1 xl:grid-cols-3">
          {masonryColArtList.length > 0 &&
            masonryColArtList.map((colList, index) => (
              <MasonryExhibitionCol key={index} artList={colList.artList} />
            ))}
        </div>
      </div>
    </>
  );
}
