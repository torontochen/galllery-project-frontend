import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { type Art as ArtProps } from "../types";
import { currencyFormatter } from "../utils/auth";

interface ArtCardProps extends ArtProps {
  ratio: number | null;
}

export default function ArtCard(art: ArtProps) {
  const { title, description, price, image_url, genres, medium, uid } = art;
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
      >
        <Card.Header
          as="img"
          src={image_url}
          alt="image"
          className="object-fill"
          onLoad={handleImageLoad}
        />
        <Card.Body className="flex flex-col justify-start items-start gap-y-1">
          <Typography className="text-[1rem] text-shadowcolor font-semibold">
            {title}
          </Typography>
          <Typography className="my-1 text-sm font-thin text-shadowcolor">
            {`  ${genres}  ${description}  ${medium}`}
          </Typography>
          <Typography className="my-1 text-[1rem] font-black text-shadowcolor">
            {currencyFormatter(price)}
          </Typography>
        </Card.Body>
      </Card>
    </>
  );
}
