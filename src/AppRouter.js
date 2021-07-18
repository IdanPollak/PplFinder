import React, { useContext } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import ListPage from "pages/ListPage/ListPage";
import UserList from "./components/UserList";
import { usePeopleFetch } from "hooks";
import FavoritesList from "components/FavoritesList/FavoritesList";
import Context from "store/Context";

const AppRouter = () => {
  const { users, isLoading, page, setPage } = usePeopleFetch();
  const context = useContext(Context);

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <ListPage title={"PplFinder"}>
              <UserList
                users={users}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
              />
            </ListPage>
          </Route>
          <Route path="/Favorites">
            <ListPage title={"Favorites"}>
              <FavoritesList users={context.favoritesList} isLoading={isLoading} />
            </ListPage>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
