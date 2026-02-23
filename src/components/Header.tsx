import { useState, useEffect, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuid4 } from "uuid";
import { config } from "react-spring";

import Slide from "./Slide";

const NavbarItems = [
  { title: "EXHIBITIONS", path: "/exhibitions" },
  { title: "ARTISTS", path: "/artists" },
  { title: "VIEWING ROOM", path: "/viewing-room" },
  { title: "ABOUT", path: "/about" },
  { title: "YOU", path: "/you" },
];

interface SlideContent {
  key: string;
  content: React.ReactElement;
  onClick: () => void;
}

const artList = [
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_0373.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18wMzczLndlYnAiLCJpYXQiOjE3NzE0NTAyODIsImV4cCI6MTgwMjk4NjI4Mn0._C7XNVhuhACEs936UuysrPRZmDMAcbnwQW8Hpxuo2w4",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_1103.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18xMTAzLndlYnAiLCJpYXQiOjE3NzE1MjA1NzIsImV4cCI6MTgwMzA1NjU3Mn0.e8XyLbiyo1URNgvQflzPwmjpXiJBTD6rwuvlOZqPxK0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_1107.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18xMTA3LndlYnAiLCJpYXQiOjE3NzE1MjA2MDEsImV4cCI6MTgwMzA1NjYwMX0.Mpdlsb48C-nS6EAAeUjKQR4goiy4LxAm0l9U9qrFB-s",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_3031.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18zMDMxLmpwZWciLCJpYXQiOjE3NzE1MjA2MjMsImV4cCI6MTgwMzA1NjYyM30.C9Jorx_YS-sA8jOjXvD19L0RLwYziFZrkEo5VAKpUp8",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/Screenshot_2024-07-01_at_3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL1NjcmVlbnNob3RfMjAyNC0wNy0wMV9hdF8zLndlYnAiLCJpYXQiOjE3NzE1MjA2NTQsImV4cCI6MTgwMzA1NjY1NH0.4lwvXdBowu0tlLn2n66RP5KIQAkSYPDrGY9xug-wsp0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/additional_0f5009d947186fbcc31b9165f3efb271c09a8967-AICC2-7.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL2FkZGl0aW9uYWxfMGY1MDA5ZDk0NzE4NmZiY2MzMWI5MTY1ZjNlZmIyNzFjMDlhODk2Ny1BSUNDMi03LmpwZyIsImlhdCI6MTc3MTUyMDcyMywiZXhwIjoxODAzMDU2NzIzfQ.IZXprsYJS1lCBpje__ESd3IoA-0nJzBHzyoXRyJDsv0",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_2268-scaled.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18yMjY4LXNjYWxlZC53ZWJwIiwiaWF0IjoxNzcxNTIwODAxLCJleHAiOjE4MDMwNTY4MDF9.rMsvMIGccODBteoqdjAz3WqR7Wjn8AgL_XjdeusYjVA",
];

export default function Header() {
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [goToSlide, setGoToSlide] = useState(0);
  const router = useNavigate();

  useEffect(() => {
    const slideList = artList.map((art: string, index: number) => {
      return {
        key: uuid4(),
        content: <Slide imgUrl={art} />,
        onClick: () => {
          console.log(`Slide ${index} clicked`);
          setGoToSlide(index);
        },
      };
    });
    // console.log(slideList);
    setSlides(slideList);
  }, []);
  console.log(slides);
  return (
    <>
      <header className="w-full border-none px-80 py-4">
        <Navbar className="w-full flex sticky items-center justify-between bg-transparent border-none shadow-none">
          <Link to="/" className="">
            {/* {status !== "dashboard" && ( */}
            <img
              src="/logo/hori-logo.png"
              alt="logo"
              className="tw-inline-block tw-mb-1 lg:tw-hidden hover:cursor-pointer  "
              width={180}
              height={35}
              // style={{ width: "100%" }}
              onClick={() => console.log("logo clicked")}
            />
            {/* )} */}

            {/* <img
            alt="logo"
            src="/logo/hori-logo.png"
            className="tw-inline-block tw-mb-1 max-lg:tw-hidden"
            width={0}
            height={0}
            sizes="10vw"
            style={{ width: "100%" }} */}
            {/* /> */}
          </Link>
          <ul className="mt-4 list-none flex gap-x-3 w-1/2 lg:mt-0 items-center justify-evenly ">
            {NavbarItems.map(({ title, path }) => (
              <li key={title}>
                <Button
                  onClick={() => router(path)}
                  className="bg-transparent text-primary border-none shadow-none hover:bg-background"
                >
                  <Typography type="small">{title}</Typography>
                </Button>
              </li>
            ))}
          </ul>
        </Navbar>
      </header>
      {/* Hero Section */}
      <section className="w-2/3 h-[35vh] my-6  mx-auto">
        {slides.length > 0 && (
          <Carousel
            slides={slides}
            goToSlide={goToSlide}
            offsetRadius={2}
            showNavigation={false}
            // enableSwipe={true}
            animationConfig={config.gentle}
          />
        )}
      </section>
    </>
  );
}
