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
  // const [countryCode, setCountryCode] = useState(selectedCurrency.slice(0,2))

  useEffect(() => {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          setCountries(data)
        })
    }, [])

  return (
    <div>
        <select 
            value={selectedCurrency} 
            onChange={onChangeCurrency}
            id='country_selector'
            className="selectpicker">
            {currencyOptions.map(option => {
              // countryCode = option.slice(0, 2)
              return (<option 
                  key={option} 
                  value={option}>
                  {option}/{countries[option]}
              </option>)})
            }
        </select>
        {selectedCurrency && <img src={`https://flagcdn.com/16x12/${selectedCurrency.slice(0,2).toLowerCase()}.png`} alt={selectedCurrency.slice(0,2).toLowerCase()}></img>}
    </div>
  )
}

