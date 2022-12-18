import React, { FC, useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/vendors/globals.scss";
import { wrapper } from "../store/store";
import Navmenu from "@/components/navmenu/navmenu";
import Footer from "@/components/footer/footer";
import RegisterLogin from "@/components/register/registerlogin";

let regModal: any;
// This default export is required in a new `pages/_app.js` file.
const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  console.log(store.getState(), "store in app");
  console.log(props, "props in app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      regModal = document.querySelector(".registerLoginModal");
    }
  }, []);

  let regRef: React.RefObject<HTMLDivElement>;
  let filterRef: React.RefObject<HTMLDivElement>;
  regRef = React.createRef();
  filterRef = React.createRef();

  return (
    <>
      <Provider store={store}>
        <div ref={regRef} className="registerLoginModal">
          <RegisterLogin cmpref={{ regRef, filterRef }} />
        </div>
        <div ref={filterRef} className="backgroundFilter"></div>
        <Navmenu />
        <Component {...props.pageProps} />
        <Footer />
      </Provider>
    </>
  );
};

export default MyApp;
