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
      <header className="w-full top-0 sticky border-none mx-auto bg-backgroundcolor py-4 z-50">
        <Navbar className="w-8/12 flex mx-auto items-center justify-between bg-backgroundcolor border-none shadow-none">
          <Link to="/" className="">
            {/* {status !== "dashboard" && ( */}
            <img
              src="/logo/hori-logo.png"
              alt="logo"
              className="inline-block mb-1  hover:cursor-pointer  "
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
                  className="bg-transparent text-shadowcolor border-none shadow-none hover:bg-backgroundcolor"
                >
                  <Typography type="small">{title}</Typography>
                </Button>
              </li>
            ))}
          </ul>
        </Navbar>
      </header>
    </>
  );
}
