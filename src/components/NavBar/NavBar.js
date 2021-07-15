import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = useState(sessionStorage.getItem('tabValue') === null? 0 : JSON.parse(sessionStorage.getItem('tabValue')));

  const handleChange = (_e, newValue) => {
    sessionStorage.setItem('tabValue', newValue);
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" to="/" component={Link} />
        <Tab label="Favorites" to="/Favorites" component={Link} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
