import { abbrev_curr } from "./currencyObject.js";

const select_field = document.querySelectorAll('select');
const selectFrom = document.querySelector('#from');
const selectTo = document.querySelector('#to');
const forAmount = document.querySelector('.amount')
const toForm = document.querySelector('form')
const toOutput = document.querySelector('.output')
const toSwap = document.querySelector('.swap_btn')

//create options with values and text from abbrev_curr object placed within currenxyObject.js 
for(let i=0;i<select_field.length;i++){
  for (var key in abbrev_curr){
  let option = document.createElement('option')
  option.value = key;
  option.innerHTML = `${key} : ${abbrev_curr[key]}`;
  select_field[i].appendChild(option)
     
    }
}

//swap currency function
toSwap.addEventListener('click', function swap(e){
    let temp = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = temp;
})


toForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  data_currency(forAmount.value, selectFrom.value, selectTo.value) 
  });


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '10477d3885msh140b38d52cc5048p1a3590jsn0cb19d3ca8fe',
		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
	}
};


let obj;

async function data_currency(amount, from, to){
  const res = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${to}&from=${from}&q=1.0`, options)
  .then(res => res.json())
  .then(final => obj=(final*amount).toFixed(2))
  .catch(error => console.log('error', error));
  output(obj,to)
}

function output(object, to){
  toOutput.innerHTML = '';
  let text = document.createElement('h2')
  text.innerHTML = `${object} ${to}`
  toOutput.appendChild(text)
}


