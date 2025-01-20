import { toast } from "react-toastify";

const CartReducer = (state, action) => {
  if (action.type === "SET_CART") {
    return { ...state, cart: action.payload };
  }

  if (action.type === "ADD_TO_CART") {
    let { productData } = action.payload;

    const existingProduct = state?.cart?.find(
      (item) => item?.id === productData?.id
    );

    if (existingProduct) {
      toast.error("Product is already added to cart");
    } else {
      return { ...state, cart: [...state.cart, productData] };
    }
  }

  if (action.type === "REMOVE_FROM_CART") {
    const updatedCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: updatedCart };
  }

  return state;
};

export default CartReducer;
