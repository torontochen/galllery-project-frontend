import { Trash } from "iconoir-react";
import { useState, useEffect } from "react";
import { LogOut } from "iconoir-react";
import { useNavigate } from "react-router-dom";

import { useUserStore, useArtStore } from "../store/store";
import { currencyFormatter } from "../utils/auth";
import { deleteItemFromCart } from "../utils/art";
import { axiosPrivate } from "../api/axios";
import { Button } from "@material-tailwind/react";

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { arts, filteredArts, setFilteredArts } = useArtStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user.shopping_cart) {
      const cartTotal = user.shopping_cart.arts.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
      setTotal(cartTotal);
    }
  }, [user]);

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

  return (
    <>
      <div className="w-full min-h-[70vh] bg-[url('/bg-img.jpg')] flex flex-col justify-start items-center bg-cover bg-center bg-no-repeat z-80 pb-6">
        {user.shopping_cart && user.shopping_cart.arts.length > 0 && (
          <div className="w-8/12 max-md:w-full max-w-5xl mt-10 bg-backgroundcolor  rounded-lg p-6">
            <div className="w-full my-2 flex justify-between items-center">
              <span className="block text-2xl max-md:text-xl font-bold mb-4  text-shadowcolor">
                Shopping Cart
              </span>

              <Button
                variant="gradient"
                color="blue"
                size="sm"
                onClick={() => navigate("/checkout")}
                className="flex items-center gap-2 group shadow-none hover:bg-transparent hover:shadow-md text-shadowcolor hover:text-hovertextcolor font-light border-shadowcolor  hover:border-hovertextcolor"
              >
                <LogOut className="group-hover:text-hovertextcolor text-shadowcolor" />
                Check Out
              </Button>
            </div>

            <ul>
              {user.shopping_cart.arts.map((item) => (
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
            <span className="w-full text-right block text-shadowcolor text-lg font-semibold">
              {`Total:        ${currencyFormatter(total)}`}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
