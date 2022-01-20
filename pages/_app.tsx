import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { Provider } from "react-redux";
import { wrapper } from "../store/index";
import withRedux from "next-redux-wrapper";

const app = ({ Component, pageProps, store }: AppProps) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
};

export default wrapper.withRedux(app);
