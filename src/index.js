import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "AppRouter";
import ContextProvider from "store/ContextProvider";

ReactDOM.render(
<ContextProvider>
<AppRouter />
</ContextProvider>
, document.querySelector("#root"));
