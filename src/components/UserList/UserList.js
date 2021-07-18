import React, { useContext, useState } from "react";
import Context from "store/Context";
import { TextField } from "@material-ui/core";
import CheckBox from "components/CheckBox";
import List from "components/List";
import Message from "components/Message";
import * as S from "../List/style";

const UserList = ({ users, isLoading, page, setPage }) => {
  const [countryFiltersList, setCountryFiltersList] = useState([]);
  const [genderFiltersList, setGenderFiltersList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [text, setText] = useState("");

  const context = useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    successMsg ? setSuccessMsg(false) : setErrorMsg(false);
  };

  const filteredList = () => {
    const countryCondition = countryFiltersList.length > 0;
    const genderCondition = genderFiltersList.length > 0;
    const textCondition = text.length > 0;

    if (countryCondition && genderCondition && textCondition) {
      return users.filter(
        (user) =>
          countryConditionCheck(user) &&
          genderConditionCheck(user) &&
          textConditionCheck(user)
      );
    } else if (countryCondition && textCondition) {
      return users.filter(
        (user) => countryConditionCheck(user) && textConditionCheck(user)
      );
    } else if (textCondition && genderCondition) {
      return users.filter(
        (user) => textConditionCheck(user) && genderConditionCheck(user)
      );
    } else if (countryCondition && genderCondition) {
      return users.filter(
        (user) => countryConditionCheck(user) && genderConditionCheck(user)
      );
    } else if (countryCondition) {
      return users.filter((user) => countryConditionCheck(user));
    } else if (textCondition) {
      return users.filter((user) => textConditionCheck(user));
    } else if (genderCondition) {
      return users.filter((user) => genderConditionCheck(user));
    } else {
      return users;
    }
  };

  const countryConditionCheck = (user) => {
    return countryFiltersList.includes(user.location.country);
  };

  const genderConditionCheck = (user) => {
    return genderFiltersList.includes(user.gender);
  };

  const textConditionCheck = (user) => {
    return (
      user.name.first.toLowerCase().startsWith(text.toLowerCase()) ||
      user.name.last.toLowerCase().startsWith(text.toLowerCase()) ||
      (user.name.first.toLowerCase() + " " + user.name.last.toLowerCase()).startsWith(
        text.toLowerCase()
      )
    );
  };

  const onCheckboxChange = (countryFilter) => {
    countryFiltersList.includes(countryFilter)
      ? setCountryFiltersList(
          countryFiltersList.filter((country) => country !== countryFilter)
        )
      : setCountryFiltersList((currentCountryFiltersList) => [
          ...currentCountryFiltersList,
          countryFilter,
        ]);
  };

  const onGenderChange = (genderFilter) => {
    genderFiltersList.includes(genderFilter)
      ? setGenderFiltersList(
          genderFiltersList.filter((gender) => gender !== genderFilter)
        )
      : setGenderFiltersList((currentGenderFiltersList) => [
          ...currentGenderFiltersList,
          genderFilter,
        ]);
  };

  const onUserClick = (clickedUser) => {
    let newFavoritesList = [];
    if (
      context.favoritesList
        .map(({ login }) => login.uuid)
        .includes(clickedUser.login.uuid)
    ) {
      newFavoritesList = context.favoritesList.filter(
        (favoriteUser) => favoriteUser.login.uuid !== clickedUser.login.uuid
      );
      setErrorMsg(true);
    } else {
      newFavoritesList = [...context.favoritesList, clickedUser];
      setSuccessMsg(true);
    }

    context.setFavoritesList(newFavoritesList);
    localStorage.setItem("favorites", JSON.stringify(newFavoritesList));
  };

  return (
    <S.Container>
      <S.Filters>
        <CheckBox label="Male" onChange={() => onGenderChange("male")} />
        <CheckBox label="Female" onChange={() => onGenderChange("female")} />
      </S.Filters>
      <TextField
        id="outlined-search"
        label="Search people"
        placeholder="Search peopole by name..."
        variant="standard"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={() => onCheckboxChange("Brazil")} />
        <CheckBox
          value="AU"
          label="Australia"
          onChange={() => onCheckboxChange("Australia")}
        />
        <CheckBox value="CA" label="Canada" onChange={() => onCheckboxChange("Canada")} />
        <CheckBox
          value="DE"
          label="Germany"
          onChange={() => onCheckboxChange("Germany")}
        />
        <CheckBox
          value="US"
          label="United States"
          onChange={() => onCheckboxChange("United States")}
        />
      </S.Filters>
      <List
        users={filteredList()}
        isInfinite={true}
        page={page}
        setPage={setPage}
        onUserClick={onUserClick}
        isLoading={isLoading}
      />
      <Message
        isOpen={successMsg}
        handleClose={handleClose}
        msg={"User added to favorites!"}
        severity={"success"}
        variant={"filled"}
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

export default UserList;
