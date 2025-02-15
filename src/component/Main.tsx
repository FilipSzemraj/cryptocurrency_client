import React from "react";
import styles from "../styles/Main.module.scss";
import WebSocketFilter from "./websocket/WebSocketFilter.tsx";
import {ToastContainer} from "react-toastify";


const Main = () => {


    return(
      <div className={styles.wrapper}>
          <WebSocketFilter />
          <ToastContainer />
      </div>
    );
}

export default Main;