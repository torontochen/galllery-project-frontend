import { useEffect, useState } from "react";
import { Xmark, EditPencil, Trash } from "iconoir-react";
import { PhoneNumberUtil } from "google-libphonenumber";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Button, Dialog, Input, Typography } from "@material-tailwind/react";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

import { deleteItemFromCart } from "../utils/art";
import { axiosPrivate } from "../api/axios";
import { useUserStore, useArtStore } from "../store/store";
import { currencyFormatter, formatPhoneNumber } from "../utils/auth";
import { Outlet } from "react-router-dom";

export default function CheckOutPage() {
  const { user, setUser, isProcessingOrder, setIsProcessingOrder } =
    useUserStore();
  const { arts, filteredArts, setFilteredArts } = useArtStore();
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [phone, setPhone] = useState(user.phone_number || "");
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [delivery_address, setDeliveryAddress] = useState(
    user.delivery_address || ""
  );
  const [password, setPassword] = useState<string>("123456");

  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user.shopping_cart) {
      const cartTotal = user.shopping_cart.arts.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
      setTotal(cartTotal);
    }
  }, [user]);

  // check if phone is registered
  const checkPhone = () => {
    if (phone) {
      setError("");
      const isValidNumber = isPhoneValid(phone);
      console.log(typeof phone);
      if ((phone && phone.length <= 2) || !isValidNumber) {
        setError("Not Valid Phone Number");
        return;
      }
      setIsValidPhone(true);
    }
  };

  const saveChanges = async () => {
    setIsSubmitting(true);
    const newUser = {
      ...user,
      first_name: firstName,
      last_name: lastName,
      delivery_address: delivery_address,
      address: user.address,
      phone_number: phone,
    };
    setUser(newUser);
    const profileData = {
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      address: user.address,
      delivery_address: delivery_address,
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
      setIsEditing(false);
      // navigate("/");
      // return;
    } catch (err: any) {
      // setError({
      //   type: "submit",
      //   msg: err.response?.data?.message || "Failed to update profile",
      // });
      setIsSubmitting(false);
      console.log("error", err);
    }
  };

  const deleteCartItem = async (artID: string) => {
    const updatedArts = user.shopping_cart
      ? user.shopping_cart.arts.filter((item) => item.art_id !== artID)
      : [];

    setUser({
      ...user,
      shopping_cart: {
        user_id: user.uid,
        added_date: user.shopping_cart ? user.shopping_cart.added_date : "",
        arts: updatedArts,
        uid: user.shopping_cart ? user.shopping_cart.uid : "",
      },
    });
    const index = arts.findIndex((art) => art.uid === artID);
    if (index !== -1) {
      const backonArts = arts[index];
      const updatedArtsList = [...filteredArts, backonArts];

      setFilteredArts(updatedArtsList);
    }
    await deleteItemFromCart({
      axiosPrivate,
      artID,
      userID: user.uid,
    });
  };

  const handlePlaceOrder = async () => {
    setIsProcessingOrder(true);
    const CHECKOUT_URL =
      "/api/shopping_cart/checkout/" + user.shopping_cart?.uid;
    try {
      const response = await axiosPrivate.post(CHECKOUT_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("Checkout response:", response);
      const checkout_url = response.data.checkout_url;
      window.location.href = checkout_url;
      setIsProcessingOrder(false);
      // window.open(checkout_url, "_blank");
      // Handle successful checkout (e.g., show confirmation, redirect, etc.)
    } catch (err) {
      console.log("Checkout error:", err);
      setIsProcessingOrder(false);

      // Handle checkout error (e.g., show error message)
    }
  };

  return (
    <>
      <div className="w-full min-h-[70vh] bg-[url('/bg-img.jpg')]  bg-cover bg-center bg-no-repeat z-80 pb-6">
        <div className="w-8/12 flex justify-center items-start  mt-10 bg-transparent gap-x-8 rounded-lg p-6 m-auto">
          <div className="w-7/12 flex flex-col bg-transparent justify-start items-center gap-y-6">
            <div className="bg-backgroundcolor w-full rounded-sm p-6 flex flex-col justify-start items-center gap-y-1">
              <span className="text-lg font-bold inline-block w-full text-shadowcolor">{`Delivering to ${
                user.first_name
                  ? user.first_name + " " + user.last_name
                  : user.username
              }`}</span>
              {user.delivery_address && (
                <Typography
                  className="text-sm font-light  w-full text-shadowcolor flex items-center gap-x-2 hover:cursor-pointer"
                  as="label"
                  type="small"
                >
                  {user.delivery_address}
                  {!isEditing && (
                    <EditPencil
                      className="h-4 w-4 stroke-2 text-shadowcolor hover:text-hovertextcolor "
                      onClick={() => setIsEditing(true)}
                    />
                  )}
                </Typography>
              )}
              {user.phone_number && (
                <Typography
                  className="text-sm font-light  w-full text-shadowcolor flex items-center gap-x-2 hover:cursor-pointer"
                  as="label"
                  type="small"
                >
                  {`phone: ${formatPhoneNumber(user.phone_number)}`}
                </Typography>
              )}
              {(!user.delivery_address || isEditing) && (
                <div className="w-full  bg-hovertextcolor opacity-50 rounded-sm px-4">
                  <div className="flex justify-between  items-center w-full gap-3 ">
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
                  <div className="flex justify-between  items-center w-full gap-3 ">
                    {/* Delivery Address */}
                    <div className="mb-4 space-y-1.5 w-6/12">
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
                        value={delivery_address}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                      />
                    </div>
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
                          error ? " border-error" : " border-shadowcolor"
                        }
                  flex justify-start items-center gap-[1px]`}
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
                  </div>
                  <div className="w-full inline-flex  opacity-100 justify-center items-center gap-x-3 p-3 mb-5">
                    <Button
                      isFullWidth
                      disabled={error !== "" || isSubmitting || !isValidPhone}
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

                    <Dialog size="sm">
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
                            Are you sure you want to cancel? All unsaved changes
                            will be lost.
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
                              onClick={() => {
                                setIsEditing(false);
                                setError("");
                                setPhone(user.phone_number || "");
                                setDeliveryAddress(user.delivery_address || "");
                                setFirstName(user.first_name || "");
                                setLastName(user.last_name || "");
                              }}
                            >
                              Continue
                            </Button>
                          </div>
                        </Dialog.Content>
                      </Dialog.Overlay>
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-backgroundcolor w-full rounded-sm p-6">
              <ul>
                {user.shopping_cart &&
                  user.shopping_cart.arts.map((item) => (
                    <li
                      key={item.art_id}
                      className="flex items-center mb-4 border-b border-b-hovertextcolor pb-4"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded mr-4"
                      />
                      <div className="flex flex-col flex-1 gap-1">
                        <h3 className="text-lg text-shadowcolor font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-shadowcolor font-light">{` ${item.medium}  By  ${item.artist}`}</p>
                        <p className="text-shadowcolor font-semibold">
                          {currencyFormatter(item.price)}
                        </p>
                      </div>
                      <Trash
                        className="self-start text-shadowcolor hover:cursor-pointer hover:text-hovertextcolor"
                        onClick={() => deleteCartItem(item.art_id)}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="w-5/12 bg-backgroundcolor top-[100px] sticky rounded-sm flex flex-col justify-start items-center p-6 gap-y-10">
            <Button
              className="border-none bg-shadowcolor opacity-60 rounded-full w-full text-lg font-semibold"
              onClick={handlePlaceOrder}
              disabled={
                user.shopping_cart?.arts.length === 0 || isProcessingOrder
              }
            >
              {isProcessingOrder ? (
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
                "Place Order"
              )}
            </Button>
            <div className="w-full flex flex-col  pt-4 justify-start items-center gap-y-4 border-t-[1px] border-t-hovertextcolor">
              <span className="flex justify-between items-center w-full">
                <Typography
                  className="text-sm font-semibold   text-shadowcolor "
                  as="label"
                  type="small"
                >
                  Subtotal:
                </Typography>
                <Typography
                  className="text-sm font-semibold  text-shadowcolor "
                  as="label"
                  type="small"
                >
                  {currencyFormatter(total)}
                </Typography>
              </span>
              <span className="flex justify-between items-center w-full">
                <Typography
                  className="text-sm font-semibold   text-shadowcolor "
                  as="label"
                  type="small"
                >
                  Shipping & Handling:
                </Typography>
                <Typography
                  className="text-sm font-semibold  text-shadowcolor "
                  as="label"
                  type="small"
                >
                  {currencyFormatter(
                    user.shopping_cart ? user.shopping_cart.arts.length * 30 : 0
                  )}
                </Typography>
              </span>

              <span className="flex justify-between items-center w-full">
                <Typography
                  className="text-sm font-semibold   text-shadowcolor "
                  as="label"
                  type="small"
                >
                  Estimated GST/HST:
                </Typography>
                <Typography
                  className="text-sm font-semibold  text-shadowcolor "
                  as="label"
                  type="small"
                >
                  {currencyFormatter(
                    (total + user.shopping_cart.arts.length * 30) * 0.13
                  )}
                </Typography>
              </span>
              <span className="flex justify-between items-center w-full">
                <Typography
                  className="text-lg font-bold   text-shadowcolor "
                  as="label"
                  type="small"
                >
                  Total:
                </Typography>
                <Typography
                  className="text-lg font-bold   text-shadowcolor "
                  as="label"
                  type="small"
                >
                  {currencyFormatter(
                    (total + user.shopping_cart.arts.length * 30) * 1.13
                  )}
                </Typography>
              </span>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
