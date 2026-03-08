import React from "react";

interface MasonryGalleryColProps {
  imgUrlList: string[];
}

export default function MasonryGalleryCol({
  imgUrlList,
}: MasonryGalleryColProps) {
  return (
    <>
      <div className="grid gap-4 content-start">
        {imgUrlList.map((url, index) => (
          <div key={url}>
            <img
              className="object-cover object-center h-auto max-w-full rounded-lg"
              src={url}
              alt="gallery-photo"
            />
          </div>
        ))}
      </div>
    </>
  );
}
