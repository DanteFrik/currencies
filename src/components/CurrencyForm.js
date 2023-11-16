import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Получение списка поддерживаемых валют от API центрального банка РФ
    axios.get('https://www.cbr.ru/scripts/XML_valFull.asp')
      .then(response => {
        // Обработка ответа и извлечение валют
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const currencyNodes = xmlDoc.getElementsByTagName('Item');
        const currencyList = Array.from(currencyNodes).map(node => node.getAttribute('ID'));
        setCurrencies(currencyList);
      })
      .catch(error => {
        console.error('Ошибка при загрузке валют:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, sourceCurrency, targetCurrency });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Сумма:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Исходная валюта:
        <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </label>
      <label>
        Целевая валюта:
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </label>
      <button type="submit">Конвертировать</button>
    </form>
  );
};

export default CurrencyForm;
