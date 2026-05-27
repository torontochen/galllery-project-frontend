import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { CartPlus } from "iconoir-react";

import { useUserStore } from "../store/store";
import { currencyFormatter } from "../utils/auth";
import { axiosPrivate } from "../api/axios";
import { addItemToCart } from "../utils/art";
import { ButtonSpinner } from "../components/Spinner";
import { type ShoppingCartItem } from "../types";

export default function SpecificArtPage() {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const location = useLocation();
  // console.log("Location state in SpecificArtPage:", location.state);
  if (!location.state)
    return (
      <div className="w-full text-shadowcolor mx-auto text-lg text-center font-semibold min-h-[50vh]">
        No art data available.
      </div>
    );
  const {
    title,
    description,
    price,
    image_url,
    genres,
    medium,
    ratio,
    artist,
    creation_date,
  } = location.state;
  const { accessToken, user, setUser, browserWidth, browserHeight } =
    useUserStore();

  const imageHeight =
    browserWidth >= browserHeight ? `${90 / ratio}vh` : `${90 / ratio}vw`;
  const imageWidth = browserWidth >= browserHeight ? `90vh` : `90vw`;
  const navigate = useNavigate();
  // console.log("URL params in SpecificArtPage:", params);
  // console.log("Image URl:", image_url);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    if (!accessToken) {
      navigate("/auth?mode=login");
      return;
    }

    const item = {
      art_id: location.state.uid,
      artist: artist.first_name + " " + artist.last_name,
      quantity: 1,
      title,
      description,
      added_at: Date.now(),
      price,
      image_url,
      medium,
    };

    const updatedShoppingCart = await addItemToCart({
      axiosPrivate,
      item,
      userID: user.uid,
    });

    // let arts: ShoppingCartItem[] = user.shopping_cart      ? [...user.shopping_cart.arts]
    //   : [];
    // const newShoppingCartItem: ShoppingCartItem = {
    //   ...item,
    //   added_at: item.added_at.toString(),
    // };
    // arts.push(newShoppingCartItem);

    // const shoppingCart = {
    //   user_id: user.uid,
    //   arts: arts,
    //   added_date: Date.now().toString(),
    // };

    const newUser = user;
    newUser.shopping_cart = updatedShoppingCart;
    setUser(newUser);

    setIsAddingToCart(false);
    navigate("/shopping-cart", { replace: true });
  };

  return (
    <>
      <div className="w-full  bg-[url('/bg-img.jpg')] flex flex-col justify-start items-center bg-cover bg-center bg-no-repeat z-80 pb-6">
        <Button
          className="bg-transparent font-medium shadow-none border-none   hover:bg-transparent hover:shadow-none p-3 text-lg  text-shadowcolor"
          onClick={() => navigate(-1)}
        >
          {`< Back`}
        </Button>
        <div
          style={{
            "--bg-image": `url(${image_url})`,
            "--dynamic-image-height": `${imageHeight}`,
            "--dynamic-image-width": `${imageWidth}`,
          }}
          className=" w-[var(--dynamic-image-width)] h-[var(--dynamic-image-height)] bg-[image:var(--bg-image)] rounded-t-md shadow-lg bg-cover bg-center bg-no-repeat mx-auto z-80"
        ></div>
        <div
          style={{
            "--dynamic-image-width": `${imageWidth}`,
          }}
          className="w-[var(--dynamic-image-width)] bg-white rounded-b-md shadow-lg p-8"
        >
          <Typography variant="h4" className="mb-2 text-xl font-bold">
            {title}
          </Typography>
          <Typography variant="h6" className="mb-4 font-thin">
            By {`${artist.first_name} ${artist.last_name}`} | Created on{" "}
            {new Date(creation_date).toLocaleDateString()} | {genres} | {medium}
          </Typography>
          <Typography variant="body1" className="mb-4 font-thin">
            {description}
          </Typography>
          <Typography variant="h5" className="mb-4 font-bold">
            {currencyFormatter(price)}
          </Typography>
          <Button
            variant="gradient"
            color="blue"
            size="lg"
            className="flex items-center gap-2"
            onClick={handleAddToCart}
          >
            {isAddingToCart ? <ButtonSpinner /> : <CartPlus />}
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
