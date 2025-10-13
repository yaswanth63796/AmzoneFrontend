import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create Context
const AppContext = createContext();

// ✅ Safe parse helper (prevents errors if localStorage is corrupted)
function safeParse(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data && typeof data === "object" ? data : fallback;
  } catch {
    return fallback;
  }
}

// ✅ Initial state (using safe parse)
const initialState = {
  user: safeParse("user", null),
  cart: safeParse("cart", null) || { items: [], total: 0, itemCount: 0 },
  products: [],
};

// ✅ Reducer
function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    case "ADD_TO_CART": {
      const cart = state.cart || {};
      const items = Array.isArray(cart.items) ? cart.items : [];

      const existingItem = items.find((item) => item.id === action.payload.id);

      let newItems;
      if (existingItem) {
        newItems = items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        newItems = [...items, { ...action.payload, quantity: 1 }];
      }

      const newTotal = newItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
      const newItemCount = newItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      return {
        ...state,
        cart: {
          items: newItems,
          total: newTotal,
          itemCount: newItemCount,
        },
      };
    }

    case "REMOVE_FROM_CART": {
      const cart = state.cart || {};
      const items = Array.isArray(cart.items) ? cart.items : [];

      const filteredItems = items.filter((item) => item.id !== action.payload);

      const newTotal = filteredItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
      const newItemCount = filteredItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      return {
        ...state,
        cart: {
          items: filteredItems,
          total: newTotal,
          itemCount: newItemCount,
        },
      };
    }

    case "UPDATE_QUANTITY": {
      const cart = state.cart || {};
      const items = Array.isArray(cart.items) ? cart.items : [];

      const updatedItems = items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity || 0 }
          : item
      );

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
      const newItemCount = updatedItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      return {
        ...state,
        cart: {
          items: updatedItems,
          total: newTotal,
          itemCount: newItemCount,
        },
      };
    }

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    default:
      return state;
  }
}

// ✅ App Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.user, state.cart]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://amazonebackend-b1ma.onrender.com/api/products"
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (err) {
        console.error("Products fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
