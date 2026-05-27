import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button } from "@material-tailwind/react";
import { v4 as uuid4 } from "uuid";

import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import Slide from "./Slide";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

import { useArtStore } from "../store/store";
import type { Art } from "../types";

interface SlideContent {
  key: string;
  content: React.ReactElement;
  onClick: () => void;
}

function CustomNavigation() {
  const swiper = useSwiper();
  // console.log(swiper);

  return (
    <>
      <IconButton
        isCircular
        size="xs"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-12 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
      </IconButton>
      <IconButton
        isCircular
        size="xs"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-12 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
      </IconButton>
    </>
  );
}

function customPagination(index: number, className: string) {
  return `<span class="${className} w-1 h-1  block [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:bg-[#121212] !opacity-50 !bg-[#474646]"></span>`;
  // `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))] !opacity-50 ![background:rgb(var(--color-background))]"></span>`;
}

export default function HeroSection() {
  const { arts } = useArtStore();
  const navigate = useNavigate();
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [goToSlide, setGoToSlide] = useState(0);

  useEffect(() => {
    const slideList: SlideContent[] = [];
    arts.forEach((art: Art, index: number) => {
      if (index < 5) {
        slideList.push({
          key: art.uid,
          content: <Slide imgUrl={art.image_url} use="H" />,
          onClick: () => {
            // console.log(`Slide ${index} clicked`);
            setGoToSlide(index);
          },
        });
      }
    });
    setSlides(slideList);
  }, [arts]);
  console.log(slides);
  return (
    <>
      {/* Hero Section */}
      <div className="w-full  bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat z-80 ">
        <div className=" w-10/12 max-sm:w-full mx-auto py-10 flex justify-evenly max-lg:gap-y-8 items-center max-lg:flex-col max-lg:justify-start">
          <div className="w-4/12 flex lg:flex-col max-lg:w-10/12 max-lg:gap-x-8 justify-between items-start gap-y-8  ">
            <span className="text-3xl  max-lg:hidden block font-bold w-full mx-auto text-left text-shadowcolor">
              Curation with Intention
            </span>
            <p className="text-lg text-justify max-sm:text-sm text-gray-600 max-lg:w-6/12 text-left mx-auto text-shadowcolor">
              A sanctuary for contemporary dialogue and timeless mastery.
              Explore our current season of abstract expressionism.
            </p>
            <Button
              className="text-shadowcolor max-lg:self-center  max-lg:w-6/12 block bg-transparent hover:bg-transparent hover:border-opacity-50 hover:opacity-50 border-shadowcolor"
              onClick={
                () => navigate("/exhibitions") /* navigate to exhibition page */
              }
            >
              EXPLORE CURRENT EXHIBITION
            </Button>
          </div>

          <section className="w-4/12 border-none max-lg:w-full">
            {slides.length > 0 && (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={true}
                speed={2000}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                parallax={true}
                pagination={{
                  enabled: true,
                  clickable: true,
                  dynamicBullets: true,
                  renderBullet: customPagination,
                }}
                modules={[Navigation, Pagination, Autoplay, Parallax]}
                className="relative border-none self-center rounded-sm [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.key}>{slide.content}</SwiperSlide>
                ))}
                <CustomNavigation />
              </Swiper>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
