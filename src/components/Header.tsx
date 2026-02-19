import { Link, useNavigate } from "react-router-dom";
import { Navbar, Typography, Button } from "@material-tailwind/react";

const NavbarItems = [
  { title: "EXHIBITIONS", path: "/exhibitions" },
  { title: "ARTISTS", path: "/artists" },
  { title: "VIEWING ROOM", path: "/viewing-room" },
  { title: "ABOUT", path: "/about" },
  { title: "YOU", path: "/you" },
];

export default function Header() {
  const router = useNavigate();
  return (
    <>
      <header
        className="w-full border-none px-80 py-4 
    "
      >
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
      <section className="w-full h-[30vh] relative flex justify-center items-center">
        <img
          src="showwall1.webp"
          alt="Hero Banner"
          className="w-full h-full object-contain absolute top-0 left-0"
        />
        <img
          src="https://dvcentdtlqiksqjrwnvc.supabase.co/storage/v1/object/sign/arts/IMG_0373.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80YmJhNWIxMi05Y2YzLTRlODQtOTI1MS05M2I0NTMxNGFlNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcnRzL0lNR18wMzczLndlYnAiLCJpYXQiOjE3NzE0NTAyODIsImV4cCI6MTgwMjk4NjI4Mn0._C7XNVhuhACEs936UuysrPRZmDMAcbnwQW8Hpxuo2w4"
          alt="blue dream"
          className="w-[20vh] h-[14vh] mb-5 absolute shadow-xl block shadow-[#6c6a6a] rounded-sm"
        />
      </section>
    </>
  );
}
