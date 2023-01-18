function displayConversion(amount, exchangeRate, fromCurrency, toCurrency){
    let currToAmount = amount * exchangeRate
    if (isNaN(currToAmount))
        return null
    return `${amount} ${fromCurrency} is equivalent to ${currToAmount} ${toCurrency}`
}

module.exports = {displayConversion}