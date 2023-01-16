import CurrencyRow from './components/CurrencyRow'
import CountDown from './components/CountDown';
import './App.css'
import { useEffect, useState } from 'react';

const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/GBP'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [toAmount, setToAmount] = useState(1)
  const [displayCurrency, setDisplayCurrency] = useState()

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[1]
        setCurrencyOptions([...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
  }

  function displayConversion(e){
    e.preventDefault()
    setToAmount(amount * exchangeRate)
    setDisplayCurrency(`${toAmount} ${toCurrency} is equivalent to ${amount} ${fromCurrency}`)
  }
  return (
    <div className='App'>
      <label>Amount<br/><input 
            type="number" 
            className='input' 
            value={amount} 
            onChange={handleFromAmountChange}
        /></label>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={fromCurrency} 
        onChangeCurrency={e => setFromCurrency(e.target.value)} 
      />
      <div></div>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency={toCurrency} 
        onChangeCurrency={e => setToCurrency(e.target.value)} 
      />
      {displayCurrency ? <><p>{displayCurrency}</p> <CountDown seconds={10} setDisplayCurrency={setDisplayCurrency}/></> : <br/>}
      <button onClick={displayConversion}>Convert</button>
    </div>
  );
}

export default App;
