import React, { useState, useEffect } from "react";
import { IconButton, Button } from "@material-tailwind/react";
import { v4 as uuid4 } from "uuid";

import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import Slide from "./Slide";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

interface SlideContent {
  key: string;
  content: React.ReactElement;
  onClick: () => void;
}

const artList = [
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_1103.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18xMTAzLndlYnAiLCJpYXQiOjE3NzE1MjA1NzIsImV4cCI6MTgwMzA1NjU3Mn0.e8XyLbiyo1URNgvQflzPwmjpXiJBTD6rwuvlOZqPxK0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_0373.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18wMzczLndlYnAiLCJpYXQiOjE3NzE0NTAyODIsImV4cCI6MTgwMjk4NjI4Mn0._C7XNVhuhACEs936UuysrPRZmDMAcbnwQW8Hpxuo2w4",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_1107.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18xMTA3LndlYnAiLCJpYXQiOjE3NzE1MjA2MDEsImV4cCI6MTgwMzA1NjYwMX0.Mpdlsb48C-nS6EAAeUjKQR4goiy4LxAm0l9U9qrFB-s",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_3031.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18zMDMxLmpwZWciLCJpYXQiOjE3NzE1MjA2MjMsImV4cCI6MTgwMzA1NjYyM30.C9Jorx_YS-sA8jOjXvD19L0RLwYziFZrkEo5VAKpUp8",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/Screenshot_2024-07-01_at_3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL1NjcmVlbnNob3RfMjAyNC0wNy0wMV9hdF8zLndlYnAiLCJpYXQiOjE3NzE1MjA2NTQsImV4cCI6MTgwMzA1NjY1NH0.4lwvXdBowu0tlLn2n66RP5KIQAkSYPDrGY9xug-wsp0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/additional_0f5009d947186fbcc31b9165f3efb271c09a8967-AICC2-7.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL2FkZGl0aW9uYWxfMGY1MDA5ZDk0NzE4NmZiY2MzMWI5MTY1ZjNlZmIyNzFjMDlhODk2Ny1BSUNDMi03LmpwZyIsImlhdCI6MTc3MTUyMDcyMywiZXhwIjoxODAzMDU2NzIzfQ.IZXprsYJS1lCBpje__ESd3IoA-0nJzBHzyoXRyJDsv0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_2268-scaled.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18yMjY4LXNjYWxlZC53ZWJwIiwiaWF0IjoxNzcxNTIwODAxLCJleHAiOjE4MDMwNTY4MDF9.rMsvMIGccODBteoqdjAz3WqR7Wjn8AgL_XjdeusYjVA",
];

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
  return `<span class="${className} w-1 h-1 mt-10 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:bg-[#121212] !opacity-50 !bg-[#474646]"></span>`;
  // `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))] !opacity-50 ![background:rgb(var(--color-background))]"></span>`;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [goToSlide, setGoToSlide] = useState(0);

  useEffect(() => {
    const slideList = artList.map((art: string, index: number) => {
      return {
        key: uuid4(),
        content: <Slide imgUrl={art} use="H" />,
        onClick: () => {
          // console.log(`Slide ${index} clicked`);
          setGoToSlide(index);
        },
      };
    });
    setSlides(slideList);
  }, []);
  // console.log(slides);
  return (
    <>
      {/* Hero Section */}
      <div className="w-full  bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat z-80 ">
        <div className=" w-10/12  mx-auto py-10 flex justify-evenly items-center">
          <div className="w-4/12 flex flex-col justify-between items-start gap-y-8">
            <h3 className="text-4xl  font-bold w-full mx-auto text-left text-shadowcolor">
              Curation with Intention
            </h3>
            <p className="text-lg   text-gray-600 w-full text-left mx-auto text-shadowcolor">
              A sanctuary for contemporary dialogue and timeless mastery.
              Explore our current season of abstract expressionism.
            </p>
            <Button className="text-shadowcolor  block bg-transparent hover:bg-transparent hover:border-opacity-50 hover:opacity-50 border-shadowcolor">
              EXPLORE CURRENT EXHIBITION
            </Button>
          </div>

          <section className="w-4/12 border-none">
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
