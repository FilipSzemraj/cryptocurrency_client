import React from "react";
import styles from "../styles/Main.module.scss";
import WebSocketFilter from "./websocket/WebSocketFilter.tsx";


const Main = () => {


    return(
      <div className={styles.wrapper}>
          <WebSocketFilter />
      </div>
    );
}

export default Main;