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

  // Mock Products
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        rating: 4,
        reviews: 1250,
      },
      {
        id: 2,
        title: "Smart Watch Series 5",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        rating: 5,
        reviews: 892,
      },
      {
        id: 3,
        title: "Laptop Backpack",
        price: 45.99,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
        rating: 4,
        reviews: 567,
      },
      {
        id: 4,
        title: "Wireless Mouse",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
        rating: 4,
        reviews: 2341,
      },
      {
        id: 5,
        title: "Mechanical Keyboard",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300",
        rating: 5,
        reviews: 678,
      },
      {
        id: 6,
        title: "USB-C Hub Adapter",
        price: 39.99,
        image:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300",
        rating: 4,
        reviews: 1567,
      },
    ];
    dispatch({ type: "SET_PRODUCTS", payload: mockProducts });
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
