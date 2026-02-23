import React from "react";

export default function Slide({ imgUrl }: { imgUrl: string }) {
  return (
    <>
      <div className="w-[30vw] h-[30vh] relative flex justify-center items-center group">
        <img
          src="showwall1.webp"
          alt="Hero Banner"
          className="w-full h-full object-contain absolute top-0 left-0 group-hover:cursor-pointer "
        />
        <div className="w-1/4    group-hover:cursor-pointer mb-5 absolute shadow-xl  shadow-shadowcolor rounded-sm">
          <img
            src={imgUrl}
            alt="blue dream"
            className="w-full h-full object-fill"
          />
        </div>
      </div>
    </>
  );
}
