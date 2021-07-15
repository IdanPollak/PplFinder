import {React, useContext, useState } from 'react';
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import * as S from "../UserList/style";
import Context from 'store/Context';

const FavoritesList = ({users, isLoading}) => {

const [errorMsg, setErrorMsg] = useState(false);
const context = useContext(Context);

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setErrorMsg(false);    
};

  const onFavoriteUserClick = (clickedUser) => {
      const listWithoutClickedUser = context.favoritesList.filter(favoriteUser => favoriteUser !== clickedUser);
      context.setFavoritesList(listWithoutClickedUser);
      localStorage.setItem('favorites', JSON.stringify(listWithoutClickedUser));
      setErrorMsg(true);
  };
  return (
      <S.List>
      {users.map((user, index) => {
        return (
          <S.User
            key={index}
          >
            <S.UserPicture src={user?.picture.large} alt="" />
            <S.UserInfo>
              <Text size="22px" bold>
                {user?.name.title} {user?.name.first} {user?.name.last}
              </Text>
              <Text size="14px">{user?.email}</Text>
              <Text size="14px">
                {user?.location.street.number} {user?.location.street.name}
              </Text>
              <Text size="14px">
                {user?.location.city} {user?.location.country}
              </Text>
            </S.UserInfo>
            <S.IconButtonWrapper isVisible={true} onClick={() => onFavoriteUserClick(user)}>
              <IconButton>
                <FavoriteIcon color="error" />
              </IconButton>
            </S.IconButtonWrapper>
          </S.User>
        );
      })}
      {isLoading && (
        <S.SpinnerWrapper>
          <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
        </S.SpinnerWrapper>
      )}
      <Snackbar open={errorMsg} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
       User removed from favorites!
      </Alert>
      </Snackbar>
    </S.List>
  )
}

export default FavoritesList
