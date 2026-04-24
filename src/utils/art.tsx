interface ShoppingCartItem {
  art_id: string;
  artist: string;
  quantity: number;
  title: string;
  description: string;
  added_at: number;
  price: number;
  image_url: string;
}

interface AddToCartProps {
  axiosPrivate: any;
  item: ShoppingCartItem;
  userID: string;
}

export const addItemToCart = async ({
  axiosPrivate,
  item,
  userID,
}: AddToCartProps) => {
  try {
    const SHOPPING_CART_URL = "/api/shopping_cart/" + userID;
    const response = await axiosPrivate.post(
      SHOPPING_CART_URL,
      JSON.stringify(item),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response);

    // navigate(from, { replace: true });

    // navigate("/");

    // return;
  } catch (err: any) {
    console.log("error", err);
  }
};
