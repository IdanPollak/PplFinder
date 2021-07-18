import React, { useContext } from "react";
import { createTheme, ThemeProvider as Provider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Context from "../store/Context";

const ThemeProvider = ({ children }) => {
  const context = useContext(Context);

  const theme = createTheme({
    palette: {
      type: context.palletType,
      primary: {
        main: "#13DADD",
      },
      secondary: {
        main: "#E711B7",
      },
      error: {
        main: "#f06292",
      },
    },
  });

  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};

export default ThemeProvider;
