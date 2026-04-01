import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ProfileCircle } from "iconoir-react";

import { useUserStore } from "../store/store";
import { logoutAction } from "../utils/auth";

const NavbarItems = [
  { title: "EXHIBITIONS", path: "/exhibitions" },
  { title: "ARTISTS", path: "/artists" },
  { title: "VIEWING ROOM", path: "/viewing-room" },
  { title: "ABOUT", path: "/about" },
  { title: "YOU", path: "/auth?mode=login" },
];

export default function Header() {
  const navigate = useNavigate();
  const { user, accessToken } = useUserStore();
  // console.log("Header user:", user);
  // console.log("Header accessToken:", accessToken);

  function changeRoute(route: string) {
    const dropdown = document.getElementById("dropdown");
    dropdown?.classList.remove("block");
    dropdown?.classList.add("hidden");
    navigate(route);
  }

  function openDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown?.classList.remove("hidden");
    dropdown?.classList.add("block");
  }

  function closeDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown?.classList.remove("block");
    dropdown?.classList.add("hidden");
  }

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
                {title === "YOU" && accessToken ? (
                  <div
                    className="dropdown group group-hover:cursor-pointer  "
                    data-placement="bottom"
                    onMouseOver={openDropdown}
                    onMouseOut={closeDropdown}
                  >
                    <IconButton
                      data-toggle="dropdown"
                      isCircular
                      size="lg"
                      variant="ghost"
                      color="secondary"
                      className="bg-backgroundcolor  border-none hover:shadow-lg self-center  "
                    >
                      <ProfileCircle className="h-8 w-8 text-shadowcolor translate-x-px stroke-1 text-center" />
                    </IconButton>
                    <div
                      id="dropdown"
                      data-role="menu"
                      className=" hidden shadow-lg  bg-backgroundcolor px-3 py-3 border-t-shadowcolor border-t-[3px] border-shadowcolor rounded-sm "
                    >
                      <ul className="rounded-sm">
                        <li className="mb-2">
                          <button
                            className=" text-shadowcolor  hover:text-hovertextcolor  mx-0 px-0"
                            onClick={() => changeRoute("/profile")}
                          >
                            <Typography type="small">Profile</Typography>
                          </button>
                        </li>

                        {/* <hr className="text-hovertextcolor h-[1px] my-3" /> */}
                        <li>
                          <button
                            className=" text-primary hover:text-hovertextcolor mx-0 px-0"
                            onClick={logoutAction}
                          >
                            <Typography type="small">Sign Out</Typography>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate(path)}
                    className={`${
                      title === "YOU" ? "rounded-full" : ""
                    } bg-transparent text-shadowcolor border-none  shadow-none hover:bg-backgroundcolor`}
                  >
                    <Typography type="small">
                      {title === "YOU"
                        ? user.email
                          ? user.first_name
                          : title
                        : title}
                    </Typography>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Navbar>
      </header>
    </>
  );
}
