const firstAmount = document.querySelector(".currency-block__amount--first");
const secondAmount = document.querySelector(".currency-block__amount--second");
const firstSelect = document.querySelector(".currency-block__select--first");
const secondSelect = document.querySelector(".currency-block__select--second");
const swapBtn = document.querySelector(".currency-block__switch-ico");
const rateInfo = document.querySelector(".rate-info");
const btnAdd = document.querySelector(".btn__add-exchange-window");

const addCurrencyToList = (nodeList) => {
  CodeData.forEach((item) => {
    const newOption = document.createElement("option");
    newOption.value = item;
    newOption.innerText = item;
    nodeList.appendChild(newOption);
  });
};

const requestToApi = async (firstC, secondC, firstA, secondA, rateT) => {
  try {
    const selectedFirstCurrency = firstC.value;
    const selectedSecondCurrency = secondC.value;

    if (
      selectedFirstCurrency === "choose a currency" ||
      selectedSecondCurrency === "choose a currency"
    )
      return;
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=${selectedFirstCurrency}&symbols=${selectedSecondCurrency}`
    );
    const data = await res.json();
    const rate = Object.entries(data.rates)[0][1];

    secondA.value = (firstA.value * rate).toFixed(2);
    rateT.textContent = `1 ${selectedFirstCurrency} = ${rate.toFixed(4)} ${selectedSecondCurrency}`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const swapCurrencies = (firstC, secondC, firstA, secondA, rateT) => {
  [firstC.value, secondC.value] = [secondC.value, firstC.value];
  requestToApi(firstC, secondC, firstA, secondA, rateT);
};

const createBlock = () => {
  const blockElement = document.createElement("div");
  blockElement.className = "currency-block";
  return blockElement;
};

const createInput = (cssClassName, isDisabled = false) => {
  const inputElement = document.createElement("input");
  inputElement.type = "number";
  inputElement.className = `currency-block__amount ${cssClassName}`;
  inputElement.value = firstAmount.value;
  inputElement.min = 0;
  inputElement.disabled = isDisabled;
  return inputElement;
};

const createSelect = (cssClassName) => {
  const selectElement = document.createElement("select");
  selectElement.className = `currency-block__select ${cssClassName}`;
  addCurrencyToList(selectElement);
  return selectElement;
};

const addNewExchangeWindow = () => {
  const newarticle = document.createElement("article");
  newarticle.className = "wrapper wrapper__added";

  const newMain = document.createElement("main");
  newMain.className = "exchange-window__main";

  const newBlockFirst = createBlock();
  const newBlockSecond = createBlock();

  const newInputFirst = createInput("currency-block__amount--first");
  const newInputSecond = createInput("currency-block__amount--second", true);

  const newSelectFirst = createSelect("currency-block__select--first");
  newSelectFirst.value = firstSelect.value
  const newSelectSecond = createSelect("currency-block__select--second");
  newSelectSecond.value = secondSelect.value

  const newSwapBtn = document.createElement("button");
  newSwapBtn.className = "currency-block__switch-ico";
  newSwapBtn.innerHTML = '<i class="fa-solid fa-rotate"></i>'

  const newRateInfo = document.createElement('p');
  newRateInfo.className = 'rate-info';

  newInputFirst.addEventListener("input", () => requestToApi(newSelectFirst, newSelectSecond, newInputFirst, newInputSecond, newRateInfo));
  newSelectFirst.addEventListener("change", () => requestToApi(newSelectFirst, newSelectSecond, newInputFirst, newInputSecond, newRateInfo));
  newSelectSecond.addEventListener("change", () => requestToApi(newSelectFirst, newSelectSecond, newInputFirst, newInputSecond, newRateInfo));
  newSwapBtn.addEventListener("click", () => swapCurrencies(newSelectFirst, newSelectSecond, newInputFirst, newInputSecond, newRateInfo));


  newBlockFirst.appendChild(newInputFirst);
  newBlockFirst.appendChild(newSelectFirst);

  newBlockSecond.appendChild(newInputSecond);
  newBlockSecond.appendChild(newSelectSecond);

  newMain.appendChild(newBlockFirst);
  newMain.appendChild(newSwapBtn)
  newMain.appendChild(newBlockSecond);
  newMain.appendChild(newRateInfo);
  newarticle.appendChild(newMain);

  document.body.appendChild(newarticle);
  requestToApi(newSelectFirst, newSelectSecond, newInputFirst, newInputSecond, newRateInfo)
};

addCurrencyToList(firstSelect);
addCurrencyToList(secondSelect);

firstAmount.addEventListener("input", () => requestToApi(firstSelect, secondSelect, firstAmount, secondAmount, rateInfo));
firstSelect.addEventListener("change", () => requestToApi(firstSelect, secondSelect, firstAmount, secondAmount, rateInfo));
secondSelect.addEventListener("change", () => requestToApi(firstSelect, secondSelect, firstAmount, secondAmount, rateInfo));
swapBtn.addEventListener("click", () => swapCurrencies(firstSelect, secondSelect, firstAmount, secondAmount, rateInfo));

btnAdd.addEventListener('click', addNewExchangeWindow)