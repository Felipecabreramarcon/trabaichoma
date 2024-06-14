import { useEffect, useState } from "react";

export const useGetStorageData = () => {
  const [storageData, setStorageData] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [favoriteItems, setFavoriteItems] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);
  const [allStorageData, setAllStorageData] = useState<any>([]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      setLoading(true);
      setInterval(() => {
        setLoading(false);
      }, 1500);
      console.log("entrei");
      setAllStorageData({
        orders: JSON.parse(localStorage.getItem("Orders") as string),
        users: JSON.parse(localStorage.getItem("User") as string),
        stockItems: JSON.parse(localStorage.getItem("stockItems") as string),
      });
      const storageData = JSON.parse(localStorage.getItem("User") as string);
      if (storageData) {
        const actualUser = JSON.parse(
          localStorage.getItem("actualUser") as string
        );
        const userData = storageData.find(
          (el: any) => el.email === actualUser.email
        );
        setStorageData(userData);
        setFavoriteItems(userData.favorites);
        setCartItems(userData.cart);
      }
    }
  }, [refresh]);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("User") as string);

    if (usersData && cartItems) {
      const newData = usersData.map((data: any) => {
        if (data.email === storageData.email) {
          return { ...data, cart: [...cartItems] };
        } else {
          return data;
        }
      });
      localStorage.setItem("User", JSON.stringify(newData));
      setRefresh(true);
    }
  }, [cartItems]);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("User") as string);

    if (usersData && favoriteItems) {
      const newData = usersData.map((data: any) => {
        if (data.email === storageData.email) {
          return { ...data, favorites: [...favoriteItems] };
        } else {
          return data;
        }
      });
      localStorage.setItem("User", JSON.stringify(newData));
      setRefresh(true);
    }
  }, [favoriteItems]);

  return {
    setAllStorageData,
    allStorageData,
    loading,
    storageData,
    setRefresh,
    favoriteItems,
    setFavoriteItems,
    cartItems,
    setCartItems,
  };
};
