import { useState } from "react";
import {
  Form,
  useSearchParams,
  useActionData,
  useNavigation,
  NavLink,
} from "react-router-dom";

import {
  Card,
  Typography,
  Button,
  Input,
  Checkbox,
} from "@material-tailwind/react";

import axios from "../api/axios";

interface error {
  type: string;
  msg: string;
}

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<error>({ type: "", msg: "" });
  const [isCheckingEmail, setIsCheckingEmail] = useState<boolean>(false);
  const [isRegisteredEmail, setIsRegisteredEmail] = useState<boolean>(
    isLogin ? false : true
  );

  // console.log(error);

  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  // console.log(searchParams);

  console.log("data", data);

  // Verify Email
  const checkUser = async () => {
    setError({ type: "", msg: "" });
    // console.log(email);
    if (!email) {
      setError({ type: "email", msg: "email is required !" });
      return;
    }
    if (!email.includes("@")) {
      setError({ type: "email", msg: "please input a valid email !" });
      return;
    }
    setIsCheckingEmail(true);
    const CHECK_USER_URL = "/api/auth/check-user/" + email;

    const response = await axios.get(CHECK_USER_URL, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    // const response = await fetch(
    //   "http://localhost:8000/api/auth/check-user/" + email,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // console.log("response", await response.json());

    // const resData = await response.json();
    console.log("response", response);
    setIsRegisteredEmail(response.data.exists);

    // if (resData.exists && !isLogin) {
    if (response.data.exists && !isLogin) {
      setError({
        type: "email",
        msg: "already a registered user, please sign in or use another email !",
      });
      setIsCheckingEmail(false);
      return;
    }

    // if (!resData.exists && isLogin) {
    if (!response.data.exists && isLogin) {
      setError({
        type: "email",
        msg: " not a registered user, please sign up !",
      });
      setIsCheckingEmail(false);
      return;
    }
    setIsCheckingEmail(false);

    setIsRegisteredEmail(isLogin && true);

    console.log(error);
  };

  return (
    <>
      <Card className="max-w-xs w-1/3  mx-auto text-shadowcolor flex flex-col justify-evenly">
        <Card.Header
          as={Card}
          className="grid h-24 place-items-center bg-shadowcolor shadow-none"
        >
          <Typography as="span" type="h4" className="text-primary-foreground">
            {isLogin ? "Sign In" : "Sign Up"}
          </Typography>
        </Card.Header>
        {/* <Card.Body as="form"> */}
        <Form
          className="flex flex-col justify-between items-stretch p-3"
          method="post"
        >
          <div className="mb-4 mt-2 space-y-1.5 border-shadowcolor">
            <Typography
              as="label"
              htmlFor="email"
              type="small"
              className="font-semibold"
            >
              Email
            </Typography>
            <div className="flex justify-start items-center gap-1">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="someone@example.com"
                className="ring-shadowcolor ring-2"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={checkUser}
              />
              {isCheckingEmail && (
                <svg
                  fill="none"
                  className="h-5 w-5  animate-spin text-surface text-center mx-auto opacity-50"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  ></path>
                  <path
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-shadowcolor"
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                  ></path>
                </svg>
              )}
            </div>

            {error?.type === "email" && (
              <Typography
                // type="small"
                color="error"
                className="font-thin mt-3 block text-xs"
              >
                {error.msg}
              </Typography>
            )}
          </div>
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="password"
              type="small"
              className="font-semibold"
            >
              Password
            </Typography>

            <Input
              id="password"
              type="password"
              name="password"
              className="ring-shadowcolor ring-2"
              placeholder="6 characters or more"
              onChange={(e) => {
                if (e.target.value.length < 6) {
                  setError({
                    type: "password",
                    msg: "password must be at least 6 characters",
                  });
                } else {
                  setError({ type: "", msg: "" });
                }
              }}
            />
            {error?.type === "password" && (
              <Typography
                // type="small"
                color="error"
                className="font-thin   text-xs"
              >
                {error.msg}
              </Typography>
            )}
          </div>
          {/* {isLogin ? (
            <label htmlFor="remember" className="mb-4 flex items-center gap-2">
              <Checkbox id="remember">
                <Checkbox.Indicator className="data-[checked=true]:bg-shadowcolor" />
              </Checkbox>
              <Typography className="text-shadowcolor">Remember Me</Typography>
            </label>
          ) : (
            <div className="h-[1rem] w-full"></div>
          )} */}
          {data && data.detail && (
            <Typography
              // type="small"
              color="error"
              className="font-thin mt-3 block text-xs text-center"
            >
              {data.detail}
            </Typography>
          )}
          <Button
            isFullWidth
            disabled={
              isLogin
                ? !isRegisteredEmail || error?.type !== ""
                : error?.type !== "" || isSubmitting || isRegisteredEmail
            }
            className="block mt-6 bg-shadowcolor border-shadowcolor font-semibold"
          >
            {isSubmitting ? (
              <svg
                fill="none"
                className="h-5 w-5  animate-spin text-surface text-center mx-auto opacity-50"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                ></path>
                <path
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-shadowcolor"
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                ></path>
              </svg>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create   Account"
            )}
          </Button>
        </Form>
        {/* </Card.Body> */}
        <Card.Footer className="text-center">
          <Typography
            type="small"
            className="my-1 flex items-center justify-center gap-1 text-foreground"
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Typography
              type="small"
              // as="a"
              // href="#"
              color="primary"
              className="font-bold text-shadowcolor"
            >
              <NavLink to={`/auth?mode=${isLogin ? "signup" : "login"}`}>
                {isLogin ? "Sign up" : "Sign in"}
              </NavLink>
            </Typography>
          </Typography>
        </Card.Footer>
      </Card>
    </>
  );
}

export default AuthForm;
