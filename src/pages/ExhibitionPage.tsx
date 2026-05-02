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
  const { user, accessToken } = useUserStore();
  const [localFilteredArts, setLocalFilteredArts] =
    useState<Art[]>(filteredArts);
  const [style, setStyle] = useState<string>("All");
  const [medium, setMedium] = useState<string>("All");
  const [masonryColArtList, setMasonryColArtList] = useState<MasonryColArts[]>(
    []
  );
  console.log("filteredArts in ExhibitionPage", filteredArts);
  const styleList = _.uniqBy(arts, "genres").map((art) => art.genres);
  styleList.unshift("All");
  // console.log("styleList", styleList);
  const mediumList = _.uniqBy(arts, "medium").map((art) => art.medium);
  mediumList.unshift("All");
  // console.log("mediumList", mediumList);

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
    const numberOfArtsPerCol = Math.floor(localFilteredArts.length / 4);
    // console.log("numberOfArtsPerCol", numberOfArtsPerCol);
    let leftArts = localFilteredArts.length - numberOfArtsPerCol * 4;
    // console.log("leftArts", leftArts);
    let colArts: Art[] = [];
    let masonryColArts: MasonryColArts[] = [];
    var index = 0;
    for (let i = 0; i < 4; i++) {
      if (leftArts > 0) {
        colArts = localFilteredArts.slice(
          index,
          index + numberOfArtsPerCol + 1
        );
        index = index + numberOfArtsPerCol + 1;
        leftArts--;
        // console.log("colArts", colArts);
      } else {
        colArts = localFilteredArts.slice(index, index + numberOfArtsPerCol);
        index = index + numberOfArtsPerCol;
      }
      masonryColArts.push({ artList: colArts });
      colArts = [];
    }
    // console.log(masonryColArts);
    setMasonryColArtList(masonryColArts);
  }, [localFilteredArts]);

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
  }, []);

  return (
    <>
      <div className="bg-[url('/bg-img.jpg')] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-start items-center">
        <div className="w-full py-4 flex justify-center items-center gap-x-10">
          <label className="text-lg text-shadowcolor ">
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

          <label className="text-lg text-shadowcolor">
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
        <div className="w-8/12  mx-auto p-4 grid grid-cols-2 gap-1 md:grid-cols-4">
          {masonryColArtList.length > 0 &&
            masonryColArtList.map((colList, index) => (
              <MasonryExhibitionCol key={index} artList={colList.artList} />
            ))}
        </div>
      </div>
    </>
  );
}
