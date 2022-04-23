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