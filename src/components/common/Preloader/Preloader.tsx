import React from "react";
import loadingGIF from '../../../assets/images/Loading.gif';
import s from "./Preloader.module.css";

type PropsType = {}
const Preloader: React.FC<PropsType> = () => {
    return <div className={s.preloader}><img src={loadingGIF}/></div>
}

export default Preloader;