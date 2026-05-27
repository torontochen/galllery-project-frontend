import { Typography, IconButton } from "@material-tailwind/react";
import { Facebook, Instagram, X, Github, Dribbble } from "iconoir-react";
import { Link } from "react-router-dom";

const LINKS = [
  {
    title: "Gallery",
    items: [
      {
        title: "About us",
        href: "about-us",
      },
      {
        title: "Careers",
        href: "careers",
      },
    ],
  },
  {
    title: "Publication",
    items: [
      {
        title: "Press",
        href: "press",
      },
      {
        title: "News",
        href: "news",
      },
      {
        title: "Blog",
        href: "blog",
      },
    ],
  },

  {
    title: "Resource",
    items: [
      {
        title: "Newsletter",
        href: "news-letter",
      },
      {
        title: "Events",
        href: "events",
      },
      {
        title: "Help center",
        href: "help-center",
      },
    ],
  },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative w-full pt-10  ">
      <div className="mx-auto w-full max-w-7xl px-8  ">
        <div className="grid grid-cols-1 justify-end items-start gap-4 md:grid-cols-2 ">
          {/* <Typography type="h6" className="mb-4 font-semibold opacity-50">
            Material Tailwind
          </Typography> */}
          <img
            src="/logo/hori-logo.png"
            alt="logo"
            className="  inline-block w-[10rem] h-[2rem] hover:cursor-pointer self-start "
            width={0}
            height={0}
            onClick={() => console.log("logo clicked")}
          />
          <div className="grid grid-cols-3 justify-end gap-x-10 gap-y-4  ">
            {LINKS.map(({ title, items }) => (
              <ul key={title} className="justify-self-center">
                <Typography className=" font-bold opacity-75  ">
                  {title}
                </Typography>
                {items.map(({ title, href }) => (
                  <li key={title}>
                    <Typography className="py-1 hover:text-hovertextcolor text-sm  text-shadowcolor font-medium transition-colors">
                      <Link to={href}>{title}</Link>
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 border-t border-surface  py-4 md:flex-row md:justify-between">
          <Typography type="small" className="text-center">
            &copy; {YEAR} <a href="http://localhost:5173">Monohaus</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-1 sm:justify-center">
            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="sm"
              className="border-shadowcolor"
            >
              <Facebook className="h-4 w-4" />
            </IconButton>
            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="sm"
              className="border-shadowcolor"
            >
              <Instagram className="h-4 w-4" />
            </IconButton>
            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="sm"
              className="border-shadowcolor"
            >
              <X className="h-4 w-4" />
            </IconButton>
            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="sm"
              className="border-shadowcolor"
            >
              <Github className="h-4 w-4" />
            </IconButton>
            <IconButton
              as="a"
              href="#"
              color="secondary"
              variant="ghost"
              size="sm"
              className="border-shadowcolor"
            >
              <Dribbble className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
