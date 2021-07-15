import React, { useState } from "react";
import Context from "./Context";

const initialFavoritesList = localStorage.getItem('favorites');

const ContextProvider = (props) => {
   const [favoritesList, setFavoritesList] = useState(initialFavoritesList === null? [] : JSON.parse(initialFavoritesList));

   return (
      <Context.Provider
         value={{ favoritesList, setFavoritesList }}
      >
         {props.children}
      </Context.Provider>
   );
};

export default ContextProvider;
