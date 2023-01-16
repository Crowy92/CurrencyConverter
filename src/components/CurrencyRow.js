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
            id='country_selector'>
            {currencyOptions.map(option => 
                <option 
                    key={option} 
                    value={option}>{option}/{countries[option]}
                </option>)}
        </select>
    </div>
  )
}

