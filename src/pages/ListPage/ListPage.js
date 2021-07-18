import { React, useContext } from "react";
import Text from "components/Text";
import * as S from "./style";
import Switch from "@material-ui/core/Switch";
import Context from "store/Context";

const ListPage = ({ title, children }) => {
  const context = useContext(Context);
  const handleThemeChange = () => {
    sessionStorage.setItem("theme", JSON.stringify(!context.darkState));
    context.setDarkState(!context.darkState);
  };
  return (
    <S.Home>
      <S.Content>
        <Switch checked={context.darkState} onClick={handleThemeChange} />
        <S.Header>
          <Text size="64px" bold>
            {title}
          </Text>
        </S.Header>
        {children}
      </S.Content>
    </S.Home>
  );
};

export default ListPage;
