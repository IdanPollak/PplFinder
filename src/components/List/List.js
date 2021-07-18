import React, { useState, useContext } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InfiniteScroll from "react-infinite-scroll-component";
import Context from "store/Context";
import Message from "components/Message";
import UserModal from "components/UserModal";
import ContactUserModal from "components/ContactUserModal";
import * as S from "./style";

const List = ({ users, isInfinite, page, setPage, onUserClick, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const context = useContext(Context);

  const handleClose = (event, reason) => {
    setOpen(false);
    if (reason === "backdropClick") {
      return;
    }
    context.setModalUser([]);
    setSuccessMsg(true);
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const OnNameClick = (user) => {
    context.setModalUser(user);
  };

  const renderList = () => {
    return (
      <>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo onClick={() => OnNameClick(user)}>
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
              <S.IconButtonWrapper
                isVisible={
                  context.favoritesList
                    .map(({ login }) => login.uuid)
                    .includes(user.login.uuid) || index === hoveredUserId
                }
              >
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
        <UserModal
          isOpen={context.modalUser?.length !== 0}
          img={context.modalUser?.picture?.large}
          fullName={
            context.modalUser?.name?.title +
            " " +
            context.modalUser?.name?.first +
            " " +
            context.modalUser?.name?.last
          }
          age={context.modalUser?.dob?.age}
          gender={context.modalUser?.gender}
          city={context.modalUser?.location?.city}
          country={context.modalUser?.location?.country}
          phone={context.modalUser?.phone}
          email={context.modalUser?.email}
          setOpen={setOpen}
        />
        <ContactUserModal
          isOpen={open}
          handleClose={handleClose}
          fullName={
            " " +
            context.modalUser?.name?.title +
            " " +
            context.modalUser?.name?.first +
            " " +
            context.modalUser?.name?.last +
            " "
          }
          setOpen={setOpen}
        />
        <Message
          id="btnCloseMsg"
          isOpen={successMsg}
          handleClose={() => setSuccessMsg(false)}
          msg={"Your message have been sent!"}
          severity={"success"}
          variant={"filled"}
        />
      </>
    );
  };

  return (
    <S.List>
      {isInfinite ? (
        <InfiniteScroll
          dataLength={users.length}
          next={() => setPage(page + 1)}
          hasMore={page < 200}
          style={{ overflow: "hidden" }}
        >
          {renderList()}
        </InfiniteScroll>
      ) : (
        <>{renderList()}</>
      )}
    </S.List>
  );
};

export default List;
