import React, { useState, useEffect } from 'react';
import fetchPrice from '../fetch.js';
import LOGO from "../../img/logo.png";
import USD from "../../img/USD.png";
import EUR from "../../img/EUR.png";
import classes from './Header.module.css'

function Header() {

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPrice();
            setCurrencies(data);
            console.log(currencies);
            };
        fetchData();
    }, [fetchPrice]);

    const usdCurrency = currencies.find(currency => currency.cc === "USD");
    const eurCurrency = currencies.find(currency => currency.cc === "EUR");
    
    return (
        <header>
            <div className="header__container">
                <div className={classes.wrapper}>
                    <div className={classes.logo}>
                        <img src={LOGO} className={classes.logoImage} alt="LOGO" />
                        <span>Converter</span>
                        </div>
                        <div className={classes.values}>
                        {usdCurrency && eurCurrency && (
                            <><div className={classes.value}>
                                <img src={USD} className={classes.valueLogo} alt="USD" />
                                <span>{usdCurrency.rate}</span>
                            </div>
                            <div className={classes.value}>
                                <img src={EUR} className={classes.valueLogo} alt="EUR" />
                                <span>{eurCurrency.rate}</span>
                            </div></>
                            )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;