import React from "react";
import classes from "./Footer.module.css";
import LOGO from "../../img/logo.png";

function Footer() {
    return(
        <div className="footer__container">
            <div className={classes.wrapper}>
                <div className={classes.logo}>
                    <img src={LOGO} className={classes.logoImage} alt="LOGO" />
                    <span>Contact us: example@gmail.com</span>
                </div>
                <div className={classes.copyright}>
                    Copyright &#169; 2023 Converter. All Rights Reserved
                </div>
            </div>
        </div>
    )
}

export default Footer;