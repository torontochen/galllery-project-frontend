import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Typography,
  Button,
  Input,
  Checkbox,
  Dialog,
  IconButton,
} from "@material-tailwind/react";
import { Xmark, EditPencil } from "iconoir-react";

import { PhoneNumberUtil } from "google-libphonenumber";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { axiosPrivate } from "../api/axios";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

import { useUserStore } from "../store/store";

interface error {
  type: string;
  msg: string;
}

function ProfileForm() {
  const { user, setUser } = useUserStore();

  const [lastName, setLastName] = useState<string | undefined>(
    user.last_name || ""
  );
  const [firstName, setFirstName] = useState<string | undefined>(
    user.first_name || ""
  );
  const [address, setAddress] = useState<string | undefined>(
    user.address || ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState<string | undefined>(
    user.delivery_address || ""
  );
  const [phone, setPhone] = useState<string | undefined>(
    user.phone_number || ""
  );
  const [error, setError] = useState<error>({ type: "", msg: "" });
  const [isSameAsAddress, setIsSameAsAddress] = useState<boolean>(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("123456");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // console.log(error);

  // const data = useActionData();
  // const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSameAsAddress) {
      setDeliveryAddress(address);
    }
  }, [isSameAsAddress, address]);

  // check if phone is registered
  const checkPhone = () => {
    if (phone) {
      setError({ type: "", msg: "" });
      const isValidNumber = isPhoneValid(phone);
      console.log(typeof phone);
      if ((phone && phone.length <= 2) || !isValidNumber) {
        setError({ type: "phone", msg: "Not Valid Phone Number" });
        return;
      }
      setIsValidPhone(true);
    }
  };

  useEffect(() => {
    if (phone) {
      checkPhone();
    }
  }, []);

  const saveChanges = async () => {
    setIsSubmitting(true);
    const newUser = {
      ...user,
      first_name: firstName,
      last_name: lastName,
      address,
      delivery_address: deliveryAddress,
      phone_number: phone,
    };
    setUser(newUser);
    const profileData = {
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      delivery_address: deliveryAddress,
      phone_number: phone,
      password: password !== "123456" ? password : "None",
    };

    console.log("profiledata", profileData);

    const PROFILE_URL = "/api/auth/update-profile";
    try {
      const response = await axiosPrivate.post(
        PROFILE_URL,
        JSON.stringify(profileData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);

      // navigate(from, { replace: true });
      setIsSubmitting(false);
      navigate("/");
      // return;
    } catch (err: any) {
      setError({
        type: "submit",
        msg: err.response?.data?.message || "Failed to update profile",
      });
      setIsSubmitting(false);
      console.log("error", err);
    }
  };
  // console.log(searchParams);

  // console.log("data", data);

  return (
    <>
      <div className="w-full  bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat z-80 py-12 ">
        <Card className=" w-4/12 mx-auto  text-shadowcolor flex flex-col justify-evenly">
          <Card.Header
            as={Card}
            className="grid h-24 place-items-center bg-shadowcolor shadow-none"
          >
            <Typography as="span" type="h4" className="text-primary-foreground">
              Profile
            </Typography>
          </Card.Header>
          {/* <Card.Body as="form"> */}
          <div
            className="flex flex-col w-full justify-between items-stretch p-3 gap-y-2"
            // method="post"
          >
            {/* Name */}
            <div className="flex justify-between  items-center w-full gap-3 px-1">
              {/* Email */}
              <div className="mb-4 mt-2 w-6/12 space-y-1.5 border-shadowcolor">
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
                    type="text"
                    name="email"
                    className="ring-shadowcolor ring-2"
                    value={user.email}
                    disabled
                    readOnly
                  />
                </div>
              </div>
              {/* user name */}
              <div className="mb-4 mt-2 w-6/12 space-y-1.5 border-shadowcolor">
                <Typography
                  as="label"
                  htmlFor="user_name"
                  type="small"
                  className="font-semibold"
                >
                  User Name
                </Typography>
                <div className="flex justify-start items-center gap-1">
                  <Input
                    id="user_name"
                    type="text"
                    name="user_name"
                    className="ring-shadowcolor ring-2"
                    value={user.username}
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between  items-center w-full gap-y-3 gap-x-3 px-1">
              {/* Phone Number */}
              <div className="mb-4 space-y-1.5 w-6/12">
                <Typography
                  as="label"
                  htmlFor="phone"
                  type="small"
                  className="font-semibold"
                >
                  Phone Number
                </Typography>

                <PhoneInput
                  defaultCountry="ca"
                  placeholder="Phone"
                  value={phone}
                  onChange={(phone) => {
                    // console.log(phone)
                    setPhone(phone.trim());
                  }}
                  onBlur={checkPhone}
                  className={`w-full rounded-md  border-2 ${
                    error?.type === "phone"
                      ? " border-error"
                      : " border-shadowcolor"
                  }
                  flex justify-start items-center gap-2`}
                  inputClassName="text-shadowcolor w-full  placeholder:text-shadowcolor"
                  countrySelectorStyleProps={{
                    style: { width: "20%" },
                    buttonStyle: {
                      color: "#f9f9f9",
                      border: "none",
                      width: "100%",
                      paddingLeft: "0.5rem",
                    },
                    buttonContentWrapperStyle: {
                      display: "flex",
                      gap: "0 0.5rem",
                    },
                  }}
                />
              </div>

              {/* Password */}
              <div className="mb-4 space-y-1.5 w-6/12 ">
                <Typography
                  as="label"
                  htmlFor="password"
                  type="small"
                  className="font-semibold"
                >
                  Password
                  <Dialog size="sm">
                    <Dialog.Trigger className="bg-white border-none hover:bg-white hover:shadow-none">
                      <EditPencil className="h-4 w-4 stroke-2 text-shadowcolor ml-2 " />
                    </Dialog.Trigger>
                    <Dialog.Overlay>
                      <Dialog.Content className="p-6">
                        <div className="flex items-center justify-between gap-4">
                          {/* <Typography type="h6"></Typography> */}
                          <Dialog.DismissTrigger
                            size="sm"
                            className="absolute right-2 top-2"
                          >
                            <Xmark className="h-5 w-5" />
                          </Dialog.DismissTrigger>
                        </div>
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
                                setPassword(e.target.value);
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
                        <div className="mb-6 space-y-1.5">
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
                              if (e.target.value !== password) {
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
                        <div className="my-4 flex items-center justify-end gap-2">
                          <Dialog.DismissTrigger
                            variant="ghost"
                            color="warning"
                            as={Button}
                            onClick={() => {
                              setPassword("123456");
                              setConfirmPassword("");
                              setError({ type: "", msg: "" });
                            }}
                          >
                            Cancel
                          </Dialog.DismissTrigger>

                          <Dialog.DismissTrigger
                            className="bg-shadowcolor border-none text-backgroundcolor hover:bg-hovertextcolor"
                            variant="ghost"
                            color="primary"
                            as={Button}
                            disabled={
                              error?.type === "password" ||
                              password.length < 6 ||
                              confirmPassword !== password
                            }
                          >
                            Continue
                          </Dialog.DismissTrigger>
                        </div>
                      </Dialog.Content>
                    </Dialog.Overlay>
                  </Dialog>
                </Typography>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  className="ring-shadowcolor ring-2"
                  placeholder="6 characters or more"
                  value={password}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between  items-center w-full gap-3 px-1">
              {/* first name */}
              <div className="mb-4 mt-2 w-6/12 space-y-1.5 border-shadowcolor">
                <Typography
                  as="label"
                  htmlFor="first_name"
                  type="small"
                  className="font-semibold"
                >
                  First Name
                </Typography>
                <div className="flex justify-start items-center gap-1">
                  <Input
                    id="first_name"
                    type="text"
                    name="first_name"
                    className="ring-shadowcolor ring-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              {/* last name */}
              <div className="mb-4 mt-2 w-6/12 space-y-1.5 border-shadowcolor">
                <Typography
                  as="label"
                  htmlFor="email"
                  type="small"
                  className="font-semibold"
                >
                  Last Name
                </Typography>
                <div className="flex justify-start items-center gap-1">
                  <Input
                    id="last_name"
                    type="text"
                    name="last_name"
                    className="ring-shadowcolor ring-2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-4 space-y-1.5">
              <Typography
                as="label"
                htmlFor="Address"
                type="small"
                className="font-semibold"
              >
                Address
              </Typography>

              <Input
                id="Address"
                type="text"
                name="Address"
                className="ring-shadowcolor ring-2"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <label
              htmlFor="same_as_address"
              className=" mb-4 flex items-center gap-2"
            >
              <Checkbox
                id="same_as_address"
                color="success"
                checked={isSameAsAddress}
                onChange={() => setIsSameAsAddress(!isSameAsAddress)}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Typography className="text-foreground text-xs">
                Same as Delivery Address
              </Typography>
            </label>
            {/* Delivery Address */}
            <div className="mb-4 space-y-1.5">
              <Typography
                as="label"
                htmlFor="delivery_address"
                type="small"
                className="font-semibold"
              >
                Delivery Address
              </Typography>

              <Input
                id="delivery_address"
                type="text"
                name="delivery_address"
                className="ring-shadowcolor ring-2"
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                readOnly={isSameAsAddress}
              />
            </div>

            {error && error.msg && (
              <Typography
                color="error"
                className="font-thin mt-3 block text-xs text-center"
              >
                {error.msg}
              </Typography>
            )}
          </div>
          <div className="w-full inline-flex justify-center items-center gap-x-3 p-3 mb-5">
            <Button
              isFullWidth
              disabled={error?.type !== "" || isSubmitting || !isValidPhone}
              className="inline-block mt-6 bg-shadowcolor w-6/12 border-shadowcolor font-semibold"
              onClick={saveChanges}
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
                "Save Changes"
              )}
            </Button>

            <Dialog size="xs">
              <Dialog.Trigger>
                <Button
                  variant="outline"
                  isFullWidth
                  className="inline-block mt-6 hover:bg-shadowcolor w-6/12 font-semibold border-shadowcolor text-shadowcolor"
                >
                  Cancel
                </Button>
              </Dialog.Trigger>
              <Dialog.Overlay>
                <Dialog.Content className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* <Typography type="h6"></Typography> */}
                    <Dialog.DismissTrigger
                      // as={IconButton}
                      size="sm"
                      // variant="ghost"
                      // color="secondary"
                      className="absolute right-2 top-2"
                      // isCircular
                    >
                      <Xmark className="h-5 w-5" />
                    </Dialog.DismissTrigger>
                  </div>
                  <Typography className="mb-6 mt-2 text-warning">
                    Are you sure you want to cancel? All unsaved changes will be
                    lost.
                  </Typography>
                  <div className="mb-1 flex items-center justify-end gap-2">
                    <Dialog.DismissTrigger
                      variant="ghost"
                      color="warning"
                      as={Button}
                    >
                      Cancel
                    </Dialog.DismissTrigger>
                    <Button
                      className="bg-shadowcolor border-none"
                      onClick={() => navigate("/")}
                    >
                      Continue
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog>
          </div>

          {/* </Card.Body> */}
        </Card>
      </div>
    </>
  );
}

export default ProfileForm;
