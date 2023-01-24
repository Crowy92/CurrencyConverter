import React, {useEffect, useState} from 'react'

const URL = 'https://openexchangerates.org/api/currencies.json'
// const BASE_COUNTRY_URL = 'https://countryflagsapi.com/svg/'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency
  } = props
  const [countries, setCountries] = useState()
  const [hidden, setHidden] = useState(true)
  // const [countryCode, setCountryCode] = useState(selectedCurrency.slice(0,2))

  useEffect(() => {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setCountries(data)
        })
    }, [])

    function hideToggle () {
      setHidden(prev => !prev)
    }

  return (
    <div>
      {selectedCurrency && <img src={`https://flagcdn.com/60x45/${selectedCurrency.slice(0,2).toLowerCase()}.png`} width="16"
height="12" alt={selectedCurrency.slice(0,2).toLowerCase()}></img>}
        {/* <select 
            value={selectedCurrency} 
            onChange={onChangeCurrency}
            id='country_selector'
            className="selectpicker">
            {currencyOptions.map(option => {
              return (<option 
                  key={option} 
                  value={option}>
                  {option}/{countries[option]}
              </option>)})
            }
        </select> */}
        {selectedCurrency && 
        <div className="selector">
          <div value={selectedCurrency} 
            onChange={onChangeCurrency}
            id='selectField' onClick={hideToggle}>
            <img src={`https://flagcdn.com/60x45/${selectedCurrency.slice(0,2).toLowerCase()}.png`} alt={selectedCurrency}></img>
            <p>{selectedCurrency}/{countries[selectedCurrency]}</p>
            <ul id="list" hidden={hidden}>
              {currencyOptions.map(curr => {
                // countryCode = option.slice(0, 2)
                return (<li 
                    key={curr} 
                    value={curr}>
                    <img src={`https://flagcdn.com/60x45/${curr.slice(0,2).toLowerCase()}.png`} alt={curr}></img>
                    <p>{curr}/{countries[curr]}</p>
                </li>)})
              }
            </ul>
          </div> 
        </div>
        }
    </div>
  )
}

