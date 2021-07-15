import React, { useContext, useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Context from 'store/Context';
import * as S from "./style";

const UserList = ({ users, isLoading }) => {

  const [hoveredUserId, setHoveredUserId] = useState();
  const [countryFiltersList, setCountryFiltersList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const context = useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    (successMsg) ? setSuccessMsg(false) : setErrorMsg(false);    
  };

  const filteredList = () => {
    return (countryFiltersList.length > 0)? users.filter(user => countryFiltersList.includes(user.location.country)) : users;
  };

  const onCheckboxChange = (countryFilter) => {
    (countryFiltersList.includes(countryFilter))?
     setCountryFiltersList(countryFiltersList.filter(country => country !== countryFilter)):
      setCountryFiltersList(currentCountryFiltersList => [...currentCountryFiltersList, countryFilter]);
  };

  const onUserClick = (clickedUser) => {
    let newFavoritesList = [];
    if(context.favoritesList.includes(clickedUser)) {
      newFavoritesList = context.favoritesList.filter(favoriteUser => favoriteUser !== clickedUser);
      setErrorMsg(true);
    }
    else {
      newFavoritesList = [...context.favoritesList, clickedUser];
      setSuccessMsg(true);
    }

    context.setFavoritesList(newFavoritesList);
    localStorage.setItem('favorites', JSON.stringify(newFavoritesList));
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);  
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={() => onCheckboxChange('Brazil')}/>
        <CheckBox value="AU" label="Australia" onChange={() => onCheckboxChange('Australia')}/>
        <CheckBox value="CA" label="Canada" onChange={() => onCheckboxChange('Canada')}/>
        <CheckBox value="DE" label="Germany" onChange={() => onCheckboxChange('Germany')}/>
        <CheckBox value="US" label="United States" onChange={() => onCheckboxChange('United States')}/>
      </S.Filters>
      <S.List>
        {filteredList().map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
              <S.IconButtonWrapper isVisible={context.favoritesList.includes(user) || index === hoveredUserId}>
                <IconButton onClick={() => onUserClick(user)}>
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
      </S.List>
      <Snackbar open={successMsg} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled">
        User added to favorites!
      </Alert> 
      </Snackbar>
      <Snackbar open={errorMsg} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled">
       User removed from favorites!
      </Alert>
      </Snackbar>
    </S.UserList>
  );
};

export default UserList;
