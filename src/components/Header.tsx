import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  Card,
  List,
  Collapse,
  DrawerDismissTrigger,
} from "@material-tailwind/react";
import { ProfileCircle, Cart, Xmark, Menu, NavArrowRight } from "iconoir-react";

import { useUserStore } from "../store/store";
import { logoutAction } from "../utils/auth";

const NavbarItems = [
  { title: "EXHIBITIONS", path: "/exhibitions" },
  { title: "ARTISTS", path: "/artists" },
  { title: "VIEWING ROOM", path: "/viewing-room" },
  { title: "YOU", path: "/auth?mode=login" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, accessToken } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
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
        <Navbar className="xl:w-8/12 w-9/12 max-md:hidden flex mx-auto items-center justify-between bg-backgroundcolor border-none shadow-none">
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
          <ul className=" list-none flex gap-x-1 w-8/12  lg:w-6/12 lg:mt-0 items-center justify-evenly ">
            {NavbarItems.map(({ title, path }) => (
              <li key={title}>
                {title === "YOU" && accessToken ? (
                  <div
                    className="dropdown group group-hover:cursor-pointer  "
                    data-placement="bottom-start"
                    onMouseOver={openDropdown}
                    onMouseOut={closeDropdown}
                  >
                    <IconButton
                      data-toggle="dropdown"
                      isCircular
                      size="lg"
                      variant="ghost"
                      color="secondary"
                      className="bg-backgroundcolor  border-none hover:shadow-lg  "
                    >
                      {accessToken &&
                      user.shopping_cart &&
                      user.shopping_cart?.arts.length > 0 ? (
                        <Badge>
                          <Badge.Content>
                            <ProfileCircle className="h-8 w-8 text-shadowcolor translate-x-px stroke-1" />
                          </Badge.Content>
                          <Badge.Indicator className="bg-[red] border-[red] mt-1"></Badge.Indicator>
                        </Badge>
                      ) : (
                        <ProfileCircle className="h-8 w-8 text-shadowcolor translate-x-px stroke-1" />
                      )}
                    </IconButton>

                    <ul
                      className=" hidden shadow-lg  bg-backgroundcolor px-3 py-3 border-t-shadowcolor border-t-[3px] border-shadowcolor rounded-md"
                      id="dropdown"
                      data-role="menu"
                    >
                      {accessToken && (
                        <li className="mb-2 inline-flex justify-between items-center gap-2">
                          <Typography type="small" className="text-shadowcolor">
                            {`Hi ${
                              user.first_name ? user.first_name : "there"
                            }!`}
                          </Typography>
                          {user.shopping_cart &&
                            user.shopping_cart?.arts.length > 0 && (
                              <Badge>
                                <Badge.Content>
                                  {/* <IconButton color="secondary"> */}
                                  <Cart
                                    className="h-5 w-5  text-shadowcolor stroke-1 hover:cursor-pointer"
                                    onClick={() => navigate("shopping-cart")}
                                  />
                                  {/* </IconButton> */}
                                </Badge.Content>
                                <Badge.Indicator className="bg-[red] border-[red]">
                                  {user.shopping_cart?.arts.length}
                                </Badge.Indicator>
                              </Badge>
                            )}
                        </li>
                      )}
                      {accessToken && (
                        <hr className="text-hovertextcolor h-[1px] my-2 w-full" />
                      )}

                      <li className="mb-2 self-stretch">
                        <button
                          className=" text-shadowcolor  hover:text-hovertextcolor  mx-0 px-0"
                          onClick={() => changeRoute("/profile")}
                        >
                          <Typography type="small">Profile</Typography>
                        </button>
                      </li>

                      <li>
                        <button
                          className=" text-shadowcolor hover:text-hovertextcolor mx-0 px-0"
                          onClick={logoutAction}
                        >
                          <Typography type="small">Sign Out</Typography>
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate(path)}
                    className={`${
                      title === "YOU" ? "rounded-full" : ""
                    } bg-transparent text-shadowcolor border-none  shadow-none ${
                      path.includes(location.pathname) &&
                      location.pathname !== "/"
                        ? "bg-hovertextcolor text-backgroundcolor"
                        : ""
                    } hover:bg-backgroundcolor hover:text-shadowcolor`}
                  >
                    <Typography type="small">
                      {/* {title === "YOU"
                        ? user.email
                          ? user.first_name
                          : title
                        : title} */}
                      {title}
                    </Typography>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Navbar>

        <Navbar className="md:hidden  w-10/12 flex mx-auto items-center justify-between bg-backgroundcolor border-none shadow-none">
          <Link to="/" className="">
            <img
              src="/logo/hori-logo.png"
              alt="logo"
              className="inline-block mb-1  hover:cursor-pointer max-lg:hidden "
              width={80}
              height={25}
              onClick={() => console.log("logo clicked")}
            />
            <img
              src="/logo/hori-logo.png"
              alt="logo"
              className="inline-block mb-1  hover:cursor-pointer lg:hidden "
              width={180}
              height={35}
              onClick={() => console.log("logo clicked")}
            />
          </Link>

          <Drawer>
            <Drawer.Trigger
              as={Button}
              className="bg-backgroundcolor text-lg text-black border-none shadow-none"
            >
              <Menu className="h-7 w-7 stroke-1" />
            </Drawer.Trigger>
            <Drawer.Overlay>
              <Drawer.Panel placement="right" className="p-0 w-5/12">
                <div className="flex items-center justify-between gap-2">
                  <Drawer.DismissTrigger
                    size="sm"
                    variant="ghost"
                    color="secondary"
                    className="absolute right-4 top-2"
                    isCircular
                  >
                    <Xmark className="h-4 w-4" />
                  </Drawer.DismissTrigger>
                </div>
                <Card className="border-none shadow-none">
                  <Card.Body className="w-full p-0">
                    <ul className="mt-10 py-2 px-3 space-y-4">
                      {NavbarItems.map(({ title, path }) => (
                        <li
                          key={title}
                          onClick={() => setIsOpen((cur) => !cur)}
                        >
                          {title === "YOU" && accessToken ? (
                            <div
                              className="dropdown group group-hover:cursor-pointer  "
                              // data-placement="bottom-start"
                              onMouseOver={openDropdown}
                              onMouseOut={closeDropdown}
                            >
                              {accessToken &&
                              user.shopping_cart &&
                              user.shopping_cart?.arts.length > 0 ? (
                                <div className=" w-full flex items-center justify-between pr-2">
                                  <IconButton
                                    isCircular
                                    size="sm"
                                    variant="ghost"
                                    color="secondary"
                                    className="bg-backgroundcolor  border-none  "
                                  >
                                    <Badge>
                                      <Badge.Content>
                                        <ProfileCircle className="h-8 w-8 text-shadowcolor translate-x-px stroke-1" />
                                      </Badge.Content>
                                      <Badge.Indicator className="bg-[red] border-[red] mt-1"></Badge.Indicator>
                                    </Badge>
                                  </IconButton>

                                  <NavArrowRight
                                    className={`h-4 w-4 ${
                                      isOpen ? "rotate-90" : ""
                                    }`}
                                  />
                                </div>
                              ) : (
                                <div className=" w-full flex items-center justify-between">
                                  <IconButton
                                    isCircular
                                    size="sm"
                                    variant="ghost"
                                    color="secondary"
                                    className="bg-backgroundcolor  border-none   "
                                    onClick={() => setIsOpen((cur) => !cur)}
                                  >
                                    <ProfileCircle className="h-8 w-8 text-shadowcolor translate-x-px stroke-1" />
                                  </IconButton>
                                  <NavArrowRight
                                    className={`h-4 w-4 ${
                                      isOpen ? "rotate-90" : ""
                                    }`}
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <Drawer.DismissTrigger
                              onClick={() => {
                                navigate(path);
                              }}
                              className={`${
                                title === "YOU" ? "rounded-full" : ""
                              } bg-transparent text-shadowcolor border-none  shadow-none ${
                                path.includes(location.pathname) &&
                                location.pathname !== "/"
                                  ? "bg-hovertextcolor text-backgroundcolor"
                                  : ""
                              } hover:bg-backgroundcolor hover:text-shadowcolor`}
                            >
                              <Typography type="small">{title}</Typography>
                            </Drawer.DismissTrigger>
                          )}
                        </li>
                      ))}
                    </ul>
                    {isOpen && (
                      <hr className="text-hovertextcolor h-[1px] my-2 w-full" />
                    )}
                    <Collapse open={isOpen}>
                      <ul className="   bg-white px-4 py-2  text-left">
                        {accessToken && (
                          <li className="mb-2 inline-flex justify-between items-center gap-8">
                            <Typography
                              type="small"
                              className="text-shadowcolor"
                            >
                              {`Hi ${
                                user.first_name ? user.first_name : "there"
                              }!`}
                            </Typography>
                            {user.shopping_cart &&
                              user.shopping_cart?.arts.length > 0 && (
                                <Drawer.DismissTrigger>
                                  <Badge>
                                    <Badge.Content>
                                      <Cart
                                        className="h-5 w-5 text-sm text-shadowcolor stroke-1 hover:cursor-pointer"
                                        onClick={() =>
                                          navigate("shopping-cart")
                                        }
                                      />
                                    </Badge.Content>
                                    <Badge.Indicator className="bg-[red] border-[red]">
                                      {user.shopping_cart?.arts.length}
                                    </Badge.Indicator>
                                  </Badge>
                                </Drawer.DismissTrigger>
                              )}
                          </li>
                        )}

                        <li className="mb-2 self-stretch">
                          <Drawer.DismissTrigger
                            className=" text-shadowcolor  hover:text-hovertextcolor  mx-0 px-0"
                            onClick={() => changeRoute("/profile")}
                          >
                            <Typography type="small">Profile</Typography>
                          </Drawer.DismissTrigger>
                        </li>

                        <li>
                          <Drawer.DismissTrigger
                            className=" text-shadowcolor hover:text-hovertextcolor mx-0 px-0"
                            onClick={logoutAction}
                          >
                            <Typography type="small">Sign Out</Typography>
                          </Drawer.DismissTrigger>
                        </li>
                      </ul>
                    </Collapse>
                  </Card.Body>
                </Card>
              </Drawer.Panel>
            </Drawer.Overlay>
          </Drawer>
        </Navbar>
      </header>
    </>
  );
}
