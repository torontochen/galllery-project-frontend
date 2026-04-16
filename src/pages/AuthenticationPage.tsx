import {
  redirect,
  type ActionFunctionArgs,
  data as returnData,
} from "react-router-dom";
import toast from "react-hot-toast";

import AuthForm from "../components/AuthForm";
import { setUser, setAccessToken, setTokenExpired } from "../store/store";
import axios from "../api/axios";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw returnData({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    isTrustedDevice: data.get("trusted_device"),
  };

  // console.log("authData", authData);

  const AUTH_URL = "/api/auth/" + mode;
  try {
    const response = await axios.post(AUTH_URL, JSON.stringify(authData), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log(response);
    const { user, access_token } = response?.data;
    //console.log(JSON.stringify(response));

    // const roles = response?.data?.roles;
    setUser(user);
    setAccessToken(access_token);
    setTokenExpired(false);

    // navigate(from, { replace: true });
    if (mode === "signup")
      toast.success("Please verify your email before logging in.", {
        duration: 6000,
      });
    if (mode === "login") toast.success("Logged in successfully!");

    return redirect("/");
    // return;
  } catch (err: any) {
    console.log("error", err);
    if (
      err.response?.status === 422 ||
      err.response?.status === 401 ||
      err.response?.status === 400
    ) {
      return err.response.data;
    } else {
      throw returnData(
        { message: "Could not authenticate user." },
        { status: 500 }
      );
    }
  }

  // const response = await fetch("http://localhost:8000/api/auth/" + mode, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(authData),
  // });

  // console.log("response", response);

  // if (
  //   response.status === 422 ||
  //   response.status === 401 ||
  //   response.status === 400
  // ) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw returnData(
  //     { message: "Could not authenticate user." },
  //     { status: 500 }
  //   );
  // }

  // const resData = await response.json();
  // console.log("response json", resData);

  // const token = resData.access_token;

  // setUser(resData.user);

  // localStorage.setItem("token", token);
  // return redirect("/");
}
