import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_amount: "",
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("UserData"));
    return user?.id || null;
  };

  const reloadCart = () => {
    const userId = getUserId();
    if (userId) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      dispatch({ type: "SET_CART", payload: userCart });
    }
  };

  useEffect(() => {
    reloadCart();
  }, []);

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      dispatch({ type: "SET_CART", payload: userCart });
    }
  }, []);

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const addToCart = (productData) => {
    dispatch({ type: "ADD_TO_CART", payload: { productData } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, reloadCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
