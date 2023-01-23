import CurrencyRow from './components/CurrencyRow'
import CountDown from './components/CountDown';
import './App.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { displayConversion, getRates, updateRates } from './logic/logic';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [displayCurrency, setDisplayCurrency] = useState()

  useEffect(() => {
    const fetchData = async () => {
        const rates = await getRates()
        console.log(rates);
        setToCurrency(rates.toCurrency)
        setCurrencyOptions(rates.currencyOptions)
        setFromCurrency(rates.fromCurrency)
        setExchangeRate(rates.exchangeRate)
    }
    fetchData()
      .catch(console.error)
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      const updateData = async () => {
        const updatedRates = await updateRates(fromCurrency, toCurrency)
        console.log(updatedRates)
        setExchangeRate(updatedRates)
      }
      updateData()
        .catch(console.error)
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
  }

  function handleDisplayConversion(e){
    e.preventDefault()
    setDisplayCurrency(displayConversion(amount, exchangeRate, fromCurrency, toCurrency))
  }

  function switchCurrs(){
    let fc = fromCurrency
    let tc = toCurrency
    setFromCurrency(tc);
    setToCurrency(fc)
  }

  return (
    <div className='App'>
      <div className='amount-switch'>
        <label for='amount-input'>Amount</label>
        <br/><input 
              type="number" 
              className='input'
              id='amount-input' 
              value={amount} 
              onChange={handleFromAmountChange}
              />
        <FontAwesomeIcon className='repeat-icon' icon={faRepeat} onClick={switchCurrs}/>
      </div>
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
      {displayCurrency ? <><p className='conversion-txt'>{displayCurrency}</p> <CountDown seconds={10} setDisplayCurrency={setDisplayCurrency}/></> : <br/>}
      <button className="btn-convert" disabled={displayCurrency} onClick={handleDisplayConversion}>Convert</button>
    </div>
  );
}

export default App;
