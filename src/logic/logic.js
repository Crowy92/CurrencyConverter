const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/GBP'

function displayConversion(amount, exchangeRate, fromCurrency, toCurrency){
    let currToAmount = amount * exchangeRate
    if (isNaN(currToAmount))
        return null
    else if (currToAmount < 0.01)
        return `${amount} ${fromCurrency} is equivalent to less than 0.01 ${toCurrency}`
    else {
        currToAmount = Math.round(currToAmount * 100) / 100
        return `${amount} ${fromCurrency} is equivalent to ${currToAmount} ${toCurrency}`
    }
}

function getRates() {
    return fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const toCurrency = Object.keys(data.rates)[1]
        const currencyOptions = [...Object.keys(data.rates)]
        const fromCurrency = (data.base)
        const exchangeRate = (data.rates[toCurrency])
        return { toCurrency, 
             currencyOptions, 
             fromCurrency, 
             exchangeRate}
      }) 
}

function updateRates(fromCurrency, toCurrency) {
    if (!fromCurrency || !toCurrency) 
        return null
    return fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => data.rates[toCurrency])
}

export {displayConversion, getRates, updateRates}