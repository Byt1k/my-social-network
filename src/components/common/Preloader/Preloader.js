import preloader from "../../../assets/images/preloader1.svg";
import React from "react";
import s from './Preloader.module.css'

const Preloader = props => {
    return (
        <div className={s.preloader}>
            <img src={preloader} alt="preloader"/>
        </div>
    )
}

export default Preloader;