import { useState, useEffect } from "react";
import { useArtStore, useUserStore } from "../store/store";
import type { Art } from "../types";
import MasonryExhibitionCol from "../components/MasonryExhibitionCol";

interface MasonryColArts {
  artList: Art[];
}

export default function ViewingRoomPage() {
  const { filteredArts, viewingRoomArt } = useArtStore();
  const { browserWidth } = useUserStore();
  const [masonryColArtList, setMasonryColArtList] = useState<MasonryColArts[]>(
    []
  );
  const [numberOfMasonryCols, setNumberOfMasonryCols] = useState<number>(0);

  useEffect(() => {
    console.log("browserWidth in ArtistFeatured", browserWidth);
    if (browserWidth >= 1280) setNumberOfMasonryCols(3);
    if (browserWidth < 1280) setNumberOfMasonryCols(2);
    // if (browserWidth < 1024) setNumberOfMasonryCols(2);
  }, [browserWidth]);

  useEffect(() => {
    if (filteredArts) {
      const unitsPerCol = Math.floor(filteredArts.length / numberOfMasonryCols);
      console.log("unitsPerCol", unitsPerCol);

      let leftArts = filteredArts.length - unitsPerCol * numberOfMasonryCols;
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
          colArts = filteredArts.slice(index, index + unitsPerCol + 1);
          index = index + unitsPerCol + 1;
          leftArts--;
          console.log("colArts", colArts);
        } else {
          colArts = filteredArts.slice(index, index + unitsPerCol);
          index = index + unitsPerCol;
        }
        masonryColArts.push({ artList: colArts });
        colArts = [];
      }
      // console.log(masonryColArts);
      setMasonryColArtList(masonryColArts);
    }
    // console.log(masonryColArts);
  }, [filteredArts, numberOfMasonryCols]);
  return (
    <>
      <div className="w-full flex max-lg:flex-col max-lg:justify-start max-lg:items-center justify-center items-start min-h-[70vh] bg-[url('/bg-img.jpg')]  bg-cover bg-center bg-no-repeat gap-x-3 z-80">
        <div className="w-3/12 max-lg:w-10/12 top-[10px] sticky">
          <div className=" h-[40vh] w-full relative flex justify-center items-center group bg-[url('/showwall4.jpg')]  bg-contain bg-center bg-no-repeat">
            {/* <img
              src="showwall4.jpg"
              alt="Hero Banner"
              className="w-full h-full object-contain absolute top-0 left-0 group-hover:cursor-pointer "
            /> */}
            <div className="w-1/3 group-hover:cursor-pointer mt-5 absolute shadow-lg  shadow-shadowcolor rounded-sm">
              <img
                src={viewingRoomArt}
                alt="blue dream"
                className="w-full h-full object-fill"
              />
            </div>
          </div>
        </div>
        <div className="w-5/12 mt-2 max-lg:w-10/12 grid grid-cols-2 gap-1 xl:grid-cols-3">
          {masonryColArtList.length > 0 &&
            masonryColArtList.map((colList, index) => (
              <MasonryExhibitionCol key={index} artList={colList.artList} />
            ))}
        </div>
      </div>
    </>
  );
}
