import React, { useState, useEffect } from 'react';
import classes from "./Converter.module.css";
import fetchPrice from '../fetch.js';

function Converter() {

    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPrice();
            setCurrencies(data);
        };
        fetchData();
    }, []);

    const switchCurrency = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        calculateExchange(fromCurrency, toCurrency, fromValue);
    }

    useEffect(() => {
        calculateExchange(fromCurrency, toCurrency, fromValue);
      }, [fromCurrency, toCurrency]);

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    const handleFromValueChange = (event) => {
        const input = event.target.value.replace(/[^0-9.]/g, "");
        setFromValue(input);
        calculateExchange(fromCurrency, toCurrency, input);
    };

    const calculateExchange = (from, to, value) => {
        if (from && to && value) {
            const exchangeValue = (value * fromCurrency) / toCurrency;
            setToValue(exchangeValue.toFixed(2));
        }
    };

    return (
        <div className={classes.wrapper}>
            <h1>CONVERTER</h1>
            <div className={classes.selectArea}>
                <select className={classes.select} value={fromCurrency} onChange={handleFromCurrencyChange}>
                    <option value="">Оберіть валюту</option>
                    <option value="1.0000">Українська гривня (UAH)</option>
                    {currencies.map((currency, index) => (
                        <option key={index} value={currency.rate}>{currency.txt + " (" + currency.cc + ")"}</option>
                    ))}
                </select>
                <input type="text" className={classes.input} value={fromValue} onChange={handleFromValueChange} maxLength="9" placeholder="Value..." />
            </div>
            <button className={classes.button} onClick={switchCurrency}>&#8645;</button>
            <div className={classes.selectArea}>
                <select className={classes.select} value={toCurrency} onChange={handleToCurrencyChange}>
                    <option value="">Оберіть валюту</option>
                    <option value="1.0000">Українська гривня (UAH)</option>
                    {currencies.map((currency, index) => (
                        <option key={index} value={currency.rate}>{currency.txt + " (" + currency.cc + ")"}</option>
                    ))}
                </select>
                <input type="text" className={classes.input} value={toValue} readOnly placeholder="Rate is..." />
            </div>
        </div>
    )
}

export default Converter;
