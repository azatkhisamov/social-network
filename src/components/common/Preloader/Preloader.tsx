import React from "react";
import loadingGIF from '../../../assets/images/Loading.gif';

type PropsType = {}
const Preloader: React.FC<PropsType> = () => {
    return <div><img src={loadingGIF}/></div>
}

export default Preloader;