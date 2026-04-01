import { useSwiper } from "swiper/react";

export default function Slide({
  imgUrl,
  use,
}: {
  imgUrl: string;
  use: string;
}) {
  const swiper = useSwiper();
  return (
    <>
      {use == "H" ? (
        <div
          className="w-full h-[30vh] relative flex justify-center items-center group border-none"
          onMouseOver={() => swiper.autoplay.stop()}
          onMouseOut={() => swiper.autoplay.start()}
        >
          {/* <img
            src="showwall1.webp"
            alt="Hero Banner"
            className="w-full h-full object-contain absolute top-0 left-0 group-hover:cursor-pointer "
          /> */}
          <div
            className={` w-10/12 
             group-hover:cursor-pointer mb-5 absolute shadow-sm border-none
              shadow-shadowcolor rounded-sm`}
          >
            <img
              src={imgUrl}
              alt="blue dream"
              className="w-full h-full object-fill "
            />
          </div>
        </div>
      ) : (
        <div className="w-[30vw] h-[30vh] relative flex justify-center items-center group">
          <img
            src="showwall4.jpg"
            alt="Hero Banner"
            className="w-full h-full object-contain absolute top-0 left-0 group-hover:cursor-pointer "
          />
          <div className="w-1/4  group-hover:cursor-pointer mt-5 absolute shadow-lg  shadow-shadowcolor rounded-sm">
            <img
              src={imgUrl}
              alt="blue dream"
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      )}
    </>
  );
}
