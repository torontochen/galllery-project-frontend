import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowRight } from "iconoir-react";
import { Button } from "@material-tailwind/react";

import MasonryGalleryCol from "./MasonryGalleryCol";
import { useArtStore, useArtistStore, useUserStore } from "../store/store";

interface MasonryColArtists {
  imgUrlList: string[];
}

export default function ArtistFeatured() {
  const { artists, currentArtist } = useArtistStore();
  const { arts, filteredArts } = useArtStore();
  const { browserWidth } = useUserStore();
  console.log("browserWidth in ArtistFeatured", browserWidth);
  const navigate = useNavigate();
  const [masonryColArtistList, setMasonryColArtistList] = useState<
    MasonryColArtists[]
  >([]);
  const [numberOfMasonryCols, setNumberOfMasonryCols] = useState<number>(0);

  useEffect(() => {
    console.log("browserWidth in ArtistFeatured", browserWidth);
    if (browserWidth >= 768) setNumberOfMasonryCols(4);
    if (browserWidth < 768) setNumberOfMasonryCols(2);
  }, [browserWidth]);

  useEffect(() => {
    let featuredArtList: string[] = [];
    filteredArts.forEach((art) => {
      if (art.artist.uid === currentArtist.uid) {
        featuredArtList.push(art.image_url);
      }
    });
    if (featuredArtList.length > 0) {
      featuredArtList.unshift(currentArtist.avatar_url);
    }
    console.log("featuredArtList", featuredArtList);
    console.log("numberOfMasonryCols", numberOfMasonryCols);
    const unitsPerCol = Math.floor(
      featuredArtList.length / numberOfMasonryCols
    );
    console.log("unitsPerCol", unitsPerCol);

    let leftArts = featuredArtList.length - unitsPerCol * numberOfMasonryCols;
    // const numberOfMasonryCols = Math.floor(featuredArtList.length / 3);
    // let indexOfArtistList = 0;
    let colArts: string[] = [];
    let masonryColArtists: MasonryColArtists[] = [];
    var index = 0;

    for (let i = 0; i < numberOfMasonryCols; i++) {
      // for (let j = 0; j < 3; j++) {
      //   colArtists.push(artList[indexOfArtistList]);
      //   indexOfArtistList++;
      // }
      if (leftArts > 0) {
        colArts = featuredArtList.slice(index, index + unitsPerCol + 1);
        index = index + unitsPerCol + 1;
        leftArts--;
        console.log("colArts", colArts);
      } else {
        colArts = featuredArtList.slice(index, index + unitsPerCol);
        index = index + unitsPerCol;
      }
      masonryColArtists.push({ imgUrlList: colArts });
      colArts = [];
    }

    console.log(masonryColArtists);
    setMasonryColArtistList(masonryColArtists);
  }, [arts, artists, numberOfMasonryCols]);
  return (
    <>
      <div className="w-full  py-4 bg-[url('/bg-img1.jpeg')] bg-cover bg-center bg-no-repeat flex flex-col justify-start  items-start ">
        <Button
          className="inline-flex justify-start bg-transparent border-none shadow-none hover:shadow-none hover:bg-transparent items-center w-8/12 mx-auto font-semibold text-lg text-shadowcolor hover:opacity-50"
          onClick={() => navigate("/artists") /* navigate to artists page */}
        >
          FEATURED ARTISTS
          <ArrowRight className="h-4 w-[3rem] font-black" />
        </Button>
        <div
          className={`w-8/12 max-sm:w-11/12  mx-auto p-4 grid grid-cols-2 gap-4 md:grid-cols-4`}
        >
          {masonryColArtistList.length > 0 &&
            masonryColArtistList.map((colArtists, index) => (
              <MasonryGalleryCol
                key={index}
                imgUrlList={colArtists.imgUrlList}
              />
            ))}
        </div>
      </div>
    </>
  );
}
