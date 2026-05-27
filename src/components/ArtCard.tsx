import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { type Art as ArtProps } from "../types";
import { currencyFormatter } from "../utils/auth";
import { useArtStore } from "../store/store";

interface ArtCardProps extends ArtProps {
  ratio: number | null;
}

export default function ArtCard(art: ArtProps) {
  const { title, description, price, image_url, genres, medium, uid } = art;
  const { setViewingRoomArt } = useArtStore();
  const navigate = useNavigate();
  const [artForSpecificPage, setArtForSpecificPage] =
    useState<ArtCardProps | null>(null);

  const handleImageLoad = (e: {
    target: { naturalWidth: any; naturalHeight: any };
  }) => {
    const { naturalWidth, naturalHeight } = e.target;
    const ratio = naturalWidth / naturalHeight;
    setArtForSpecificPage({ ...art, ratio });
    // console.log("Aspect Ratio:", ratio);
  };

  return (
    <>
      <Card
        className="max-w-xs hover:shadow-lg hover:cursor-pointer hover:scale-105"
        onClick={() =>
          navigate(`/${uid}`, { state: { ...artForSpecificPage } })
        }
        onMouseEnter={() => setViewingRoomArt(image_url)}
      >
        <Card.Header
          as="img"
          src={image_url}
          alt="image"
          className="object-fill"
          onLoad={handleImageLoad}
        />
        <Card.Body className="flex flex-col justify-start items-start gap-y-1">
          <div className="my-1 w-full flex items-center justify-between">
            <Typography className="text-[1rem] text-shadowcolor font-bold">
              {title}
            </Typography>
            <Typography className=" text-[1rem] font-bold text-shadowcolor">
              {currencyFormatter(price)}
            </Typography>
            {/* <Typography type="h6">Apple AirPods</Typography>
          <Typography type="h6">$95.00</Typography> */}
          </div>

          <Typography className="my-2 text-sm font-light text-shadowcolor">
            {`  ${genres}  ${description}  ${medium}`}
          </Typography>
        </Card.Body>
      </Card>
    </>
  );
}
