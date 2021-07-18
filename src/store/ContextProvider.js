import { React, useState } from "react";
import Context from "./Context";

const initialFavoritesList = localStorage.getItem("favorites");

const ContextProvider = (props) => {
  const [favoritesList, setFavoritesList] = useState(
    initialFavoritesList === null ? [] : JSON.parse(initialFavoritesList)
  );
  const [modalUser, setModalUser] = useState([]);

  const [darkState, setDarkState] = useState(
    sessionStorage.getItem("theme") === null
      ? false
      : JSON.parse(sessionStorage.getItem("theme"))
  );
  const palletType = darkState ? "dark" : "light";

  return (
    <Context.Provider
      value={{
        favoritesList,
        setFavoritesList,
        modalUser,
        setModalUser,
        darkState,
        setDarkState,
        palletType,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
