import { useEffect, useState } from "react";
import { useArtStore, useUserStore } from "../store/store";
import * as _ from "lodash-es";

import MasonryExhibitionCol from "../components/MasonryExhibitionCol";
import { type Art } from "../types";

interface MasonryColArts {
  artList: Art[];
}

export default function ExhibitionPage() {
  const { arts, filteredArts, setFilteredArts } = useArtStore();
  const { user, accessToken, browserWidth } = useUserStore();
  const [localFilteredArts, setLocalFilteredArts] =
    useState<Art[]>(filteredArts);
  const [style, setStyle] = useState<string>("All");
  const [medium, setMedium] = useState<string>("All");
  const [masonryColArtList, setMasonryColArtList] = useState<MasonryColArts[]>(
    []
  );
  const [numberOfMasonryCols, setNumberOfMasonryCols] = useState<number>(0);

  console.log("filteredArts in ExhibitionPage", filteredArts);
  const styleList = _.uniqBy(arts, "genres").map((art) => art.genres);
  styleList.unshift("All");
  // console.log("styleList", styleList);
  const mediumList = _.uniqBy(arts, "medium").map((art) => art.medium);
  mediumList.unshift("All");
  // console.log("mediumList", mediumList);
  console.log("browserWidth in ExhibitionPage", browserWidth);

  useEffect(() => {
    console.log("browserWidth in ArtistFeatured", browserWidth);
    if (browserWidth > 1280) setNumberOfMasonryCols(4);
    if (browserWidth >= 1024 && browserWidth <= 1280) setNumberOfMasonryCols(3);
    if (browserWidth < 1024) setNumberOfMasonryCols(2);
  }, [browserWidth]);

  useEffect(() => {
    let filtered = filteredArts;
    if (style !== "All") {
      filtered = filtered.filter((art) => art.genres === style);
    }
    if (medium !== "All") {
      filtered = filtered.filter((art) => art.medium === medium);
    }
    setLocalFilteredArts(filtered);
  }, [style, medium, filteredArts]);

  useEffect(() => {
    // console.log("filteredArts", localFilteredArts);
    const unitsPerCol = Math.floor(
      localFilteredArts.length / numberOfMasonryCols
    );
    console.log("unitsPerCol", unitsPerCol);

    let leftArts = localFilteredArts.length - unitsPerCol * numberOfMasonryCols;
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
        colArts = localFilteredArts.slice(index, index + unitsPerCol + 1);
        index = index + unitsPerCol + 1;
        leftArts--;
        console.log("colArts", colArts);
      } else {
        colArts = localFilteredArts.slice(index, index + unitsPerCol);
        index = index + unitsPerCol;
      }
      masonryColArts.push({ artList: colArts });
      colArts = [];
    }
    // console.log(masonryColArts);
    setMasonryColArtList(masonryColArts);
  }, [localFilteredArts, numberOfMasonryCols]);

  useEffect(() => {
    if (
      accessToken &&
      user.shopping_cart &&
      user.shopping_cart.arts.length > 0
    ) {
      const cartArts = user.shopping_cart.arts;
      let updatedArts: Art[] = [];
      filteredArts.forEach((art: Art) => {
        const isInCart = cartArts.some((cartArt) => {
          // console.log("cartArt.art_id", cartArt);
          // console.log("art.uid", art);
          return cartArt.art_id === art.uid;
        });
        // console.log("isInCart", isInCart);
        if (!isInCart) {
          updatedArts.push(art);
        }
      });
      console.log("updatedArts", updatedArts);
      setFilteredArts(updatedArts);
    }
  }, [accessToken, user]);

  return (
    <>
      <div className="bg-[url('/bg-img.jpg')] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-start items-center">
        <div className="w-full py-4 flex justify-center items-center gap-x-10 max-sm:gap-x-2">
          <label className="text-lg max-sm:text-xs text-shadowcolor ">
            By Style:
            <select
              className="p-2 ml-1  hover:cursor-pointer  rounded-md border-2 border-shadowcolor focus:outline-none   focus:border-transparent"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {styleList.map((styleOption, index) => (
                <option
                  key={index}
                  value={styleOption}
                  className="text-shadowcolor font-light"
                >
                  {styleOption}
                </option>
              ))}
            </select>
          </label>

          <label className="text-lg max-sm:text-xs text-shadowcolor">
            By Medium:
            <select
              className="p-2 ml-1 hover:cursor-pointer  mr-4 rounded-md border-2 border-shadowcolor focus:outline-none   focus:border-transparent"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
            >
              {mediumList.map((mediumOption, index) => (
                <option key={index} value={mediumOption}>
                  {mediumOption}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-8/12 max-md:w-11/12 mx-auto p-4 grid grid-cols-2 gap-1 lg:max-xl:grid-cols-3 xl:grid-cols-4">
          {masonryColArtList.length > 0 &&
            masonryColArtList.map((colList, index) => (
              <MasonryExhibitionCol key={index} artList={colList.artList} />
            ))}
        </div>
      </div>
    </>
  );
}
