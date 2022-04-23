const firstAmount = document.querySelector('.currency-block__amount--first')
const secondAmount = document.querySelector('.currency-block__amount--second')
const firstSelect = document.querySelector('.currency-block__select--first')
const secondSelect = document.querySelector('.currency-block__select--second')
const switchBtn = document.querySelector('.currency-block__switch-ico')
const rateInfo = document.querySelector('.rate-info')
const currentExchangeRateList = []

const addCurrencyToList = (nodeList) => {
  CodeData.forEach(item => {
    const newOption = document.createElement('option');
    newOption.value = item;
    newOption.innerText = item;
    nodeList.appendChild(newOption);
  })
}

addCurrencyToList(firstSelect)
addCurrencyToList(secondSelect)

const requestToApi = async () => {
  try {
      const selectedFirstCurrency = firstSelect.value;
      const selectedSecondCurrency = secondSelect.value;
      
      if(selectedFirstCurrency === 'choose a currency' || selectedSecondCurrency === 'choose a currency') return
      const res = await fetch(`https://api.exchangerate.host/latest?base=${selectedFirstCurrency}&symbols=${selectedSecondCurrency}`);
      const data = await res.json();
      const rate = Object.entries(data.rates)[0][1];
    
      secondAmount.value = (firstAmount.value * rate).toFixed(2)
      rateInfo.textContent = `1 ${selectedFirstCurrency} = ${rate.toFixed(4)} ${selectedSecondCurrency}`

    } catch (error) {
      console.log(`Error: ${error}`);
  }
}

firstAmount.addEventListener('input', requestToApi)
firstSelect.addEventListener('change', requestToApi)
secondSelect.addEventListener('change', requestToApi)