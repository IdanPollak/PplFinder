import { React, useContext, useState } from "react";
import Context from "store/Context";
import List from "components/List";
import Message from "components/Message";
import * as S from "../List/style";

const FavoritesList = ({ users, isLoading }) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const context = useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg(false);
  };

  const onFavoriteUserClick = (clickedUser) => {
    const listWithoutClickedUser = users.filter(
      (favoriteUser) => favoriteUser.login.uuid !== clickedUser.login.uuid
    );
    context.setFavoritesList(listWithoutClickedUser);
    localStorage.setItem("favorites", JSON.stringify(listWithoutClickedUser));
    setErrorMsg(true);
  };

  return (
    <S.Container>
      <List
        users={users}
        isInfinite={false}
        onUserClick={onFavoriteUserClick}
        isLoading={isLoading}
      />
      <Message
        isOpen={errorMsg}
        handleClose={handleClose}
        msg={"User removed from favorites!"}
        severity={"error"}
        variant={"filled"}
      />
    </S.Container>
  );
};

export default FavoritesList;
