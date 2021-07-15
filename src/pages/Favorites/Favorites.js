import {React, useContext} from "react";
import Text from "components/Text";
import { usePeopleFetch } from "hooks";
import Context from "../../store/Context";
import * as S from "../Home/style";
import FavoritesList from "components/FavoritesList/FavoritesList";

const Favorites = () => {
    const context = useContext(Context);
    const { users, isLoading } = usePeopleFetch();

    return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <FavoritesList users={context.favoritesList} isLoading={isLoading}/>
      </S.Content>
    </S.Home>
    )
}

export default Favorites;

