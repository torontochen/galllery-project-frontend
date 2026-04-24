import { type Art } from "../types";
import ArtCard from "./ArtCard";

interface MasonryExhibitionColProps {
  artList: Art[];
}

export default function MasonryExhibitionCol({
  artList,
}: MasonryExhibitionColProps) {
  return (
    <>
      <div className="grid gap-1 content-start">
        {artList.map((art, index) => (
          <div key={art.uid}>
            <ArtCard {...art} />
          </div>
        ))}
      </div>
    </>
  );
}
