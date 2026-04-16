import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

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

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<error>({ type: "", msg: "" });

  //Send reset password link
  const resetPassword = async () => {
    setIsSubmitting(true);
    const passwordRestData = {
      new_password: newPassword,
      confirm_new_password: confirmPassword,
    };

    const RESET_URL = `/api/auth/password-reset-confirm/${token}`;
    try {
      const response = await axios.post(
        RESET_URL,
        JSON.stringify(passwordRestData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);

      setIsSubmitting(false);
      toast.success("Password has been reset.", {
        duration: 5000,
      });
      navigate("/auth?mode=login");
    } catch (err: any) {
      console.log("error", err);
    }
  };

  return (
    <>
      <Card className="max-w-xs w-1/3  mx-auto text-shadowcolor flex flex-col justify-evenly">
        <Card.Header
          as={Card}
          className="grid h-24 place-items-center bg-shadowcolor shadow-none"
        >
          <Typography as="span" type="h4" className="text-primary-foreground">
            Reset Password
          </Typography>
        </Card.Header>
        <Card.Body>
          {/* Password */}
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
                  setNewPassword(e.target.value);
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

          {/* Confirm Password */}
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="confirmPassword"
              type="small"
              className="font-semibold"
            >
              Confirm Password
            </Typography>

            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="ring-shadowcolor ring-2"
              placeholder="6 characters or more"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value !== newPassword) {
                  setError({
                    type: "password",
                    msg: "Passwords do not match !",
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
        </Card.Body>

        <Card.Footer className="text-center mb-2">
          <Button
            isFullWidth
            disabled={
              isSubmitting ||
              error?.type === "password" ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
            className="block mt-6 bg-shadowcolor border-shadowcolor font-semibold"
            onClick={resetPassword}
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
            ) : (
              "Reset Password"
            )}
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}
