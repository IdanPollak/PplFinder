import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {

  const [hoveredUserId, setHoveredUserId] = useState();
  const [countryFiltersList, setCountryFiltersList] = useState([]);

  const filteredList = () => {
    return (countryFiltersList.length > 0)? users.filter(user => countryFiltersList.includes(user.location.country)) : users;
  };

  const onCheckboxChange = (countryFilter) => {
    (countryFiltersList.includes(countryFilter))?
     setCountryFiltersList(countryFiltersList.filter(country => country !== countryFilter)):
      setCountryFiltersList(currentCountryFiltersList => [...currentCountryFiltersList, countryFilter]);
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
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
      </S.List>
    </S.UserList>
  );
};

export default UserList;
