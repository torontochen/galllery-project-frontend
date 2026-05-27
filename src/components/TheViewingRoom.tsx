import { useState, useEffect } from "react";
import { ArrowRight } from "iconoir-react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import Carousel from "react-spring-3d-carousel";
import { v4 as uuid4 } from "uuid";
import { config } from "react-spring";

import Slide from "./Slide";

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
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/1000x1000_dbb9666a-65b1-48cc-bde7-e47f87d4937d_pnnjn_982051860.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzLzEwMDB4MTAwMF9kYmI5NjY2YS02NWIxLTQ4Y2MtYmRlNy1lNDdmODdkNDkzN2RfcG5uam5fOTgyMDUxODYwLmpwZWciLCJpYXQiOjE3NzI5MDQwNjksImV4cCI6MTgwNDQ0MDA2OX0.0nd1W0kdwul6OAi81FVltYCaM3kTgaBhiO_uj88GlCU",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/3224863-HSC00001-7.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzLzMyMjQ4NjMtSFNDMDAwMDEtNy5qcGciLCJpYXQiOjE3NzI5MDQxMTUsImV4cCI6MTgwNDQ0MDExNX0.QH5xAYAOojpB4fflv4q-RPg0GagADQOtHfHkIsfkoVo",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/92b6f50b6e62fce7c674c068516919d2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzLzkyYjZmNTBiNmU2MmZjZTdjNjc0YzA2ODUxNjkxOWQyLmpwZyIsImlhdCI6MTc3MjkwNDE1NiwiZXhwIjoxODA0NDQwMTU2fQ.2QSl4wfzWtfNVRO2SgV6Xb8LtLFuWgU2jhMmmMTD_lo",
  "https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/autumn_algoma_1_lawrenharris.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL2F1dHVtbl9hbGdvbWFfMV9sYXdyZW5oYXJyaXMuanBnIiwiaWF0IjoxNzcyOTA0MTg2LCJleHAiOjE4MDQ0NDAxODZ9.g1atQcauHJlD0GvHSWd1GK9e1N91RdJazXbRWy2iS3E",
];

export default function TheViewingRoom() {
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [goToSlide, setGoToSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const slideList = artList.map((art: string, index: number) => {
      return {
        key: uuid4(),
        content: <Slide imgUrl={art} use="V" />,
        onClick: () => {
          console.log(`Slide ${index} clicked`);
          setGoToSlide(index);
        },
      };
    });
    setSlides(slideList);
  }, []);

  return (
    <>
      <div className="w-full h-[45vh] py-6 bg-[url('/bg-img2.jpg')] bg-cover bg-center bg-no-repeat flex flex-col justify-between  items-start  ">
        <Button
          className="inline-flex justify-start bg-transparent border-none shadow-none hover:shadow-none hover:bg-transparent items-center w-8/12 mx-auto font-semibold text-lg text-shadowcolor hover:opacity-50"
          onClick={() => navigate("/viewing-room")}
        >
          THE VIEWING ROOM
          <ArrowRight className="h-4 w-[3rem] font-black" />
        </Button>
        <div className="w-8/12 max-sm:w-full h-full mx-auto my-6 mt-4 ">
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
        </div>
      </div>
    </>
  );
}
