import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const router = useNavigate();
  return (
    <header className="w-full border-none">
      <nav className="w-full flex items-center justify-center">
        <Link
          onClick={() => {
            router.push("/");
          }}
          href="/"
        >
          {status !== "dashboard" && (
            <image
              alt="logo"
              src="/horizontal.png"
              className="tw-inline-block tw-mb-1 lg:tw-hidden "
              width={0}
              height={0}
              sizes="20vw"
              style={{ width: "100%" }}
            />
          )}

          <Image
            alt="logo"
            src="/horizontal.png"
            className="tw-inline-block tw-mb-1 max-lg:tw-hidden"
            width={0}
            height={0}
            sizes="10vw"
            style={{ width: "100%" }}
          />
        </Link>
      </nav>
    </header>
  );
}
