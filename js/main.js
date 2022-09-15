const userSurname = document.querySelector('input[name="surname"]');  //получите элемент input с фамилией(*)
const userName = document.querySelector('input[name="name"]'); //получите элемент input с именем(*)

const goodsElements = document.querySelectorAll('[name="goods"]'); //получите элементы checkbox с товарами goods(*)
const countElements =  document.querySelectorAll('[type="number"]');//получите элементы input с кол-вом(*)

const btn = document.querySelector('.btn'); 
const resultElem = document.querySelector('.sum');//получите элемент span для итоговой суммы

//создайте переменную для хранения итоговой суммы (*)
let total = 0;
let selectetEl = []; 

//этот объект нужен для хранения количества каждого товара
//либо, вы можете создать переменные/массив для хранения значений 
const countGoods = { 
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
}

//этот объект нужен для хранения цены каждого товара
//т.е. если товар выбран, записываем его цену, если не выбран - записываем 0
//либо, вы можете создать переменные/массив для хранения значений
const choicePriceGoods = { 
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
}

const user = { 
    name: "",
    surname: "",
}

//создайте функцию, которая будет считать итоговую сумму, подумайте над формулой.
function totalSum(){
    var res=0;
    for (key in countGoods){
        res += countGoods[key]*choicePriceGoods[key];
        // console.log(res)
    }
    resultElem.textContent = res;
}


//для каждого элемента input с кол-вом нужно повесить событие на изменение change, 
//по которому в объекте должны меняться значения на значение в input
countElements.forEach(elem => {
    elem.addEventListener("change", function(){ 
        countGoods[elem.id] = elem.value;
        totalSum();
    })
    
})

//для каждого элемента checkbox нужно повесить событие на изменение change, 
//по которому в объекте должны меняться значение на цену, если чекбокс выбран
//или обратно на 0, если чекбокс не выбран
goodsElements.forEach(product => {
    product.addEventListener("change", function(){ 

        if(product.checked){                        //если checkbox-кнопка выбрана
            choicePriceGoods[product.getAttribute('data-goods')] = product.value;    //добавляем значение в массив выбранных
            [...countElements].map(el=> {if(el.id === product.getAttribute('data-goods')){
                el.value =1;
                countGoods[el.id] =1;

            } })    //добавляем значение в массив выбранных  //добавляем значение в массив выбранных
        } else {                                         //иначе удаляем из массива выбранных
            choicePriceGoods[product.getAttribute('data-goods')] = 0; 
            [...countElements].map(el=> {if(el.id === product.getAttribute('data-goods')){
                el.value = 0;
                countGoods[el.id] =0;

            } }) 
        }
        totalSum();
        // console.log(choicePriceGoods);
        // console.log(countElements);
        // console.log(countGoods);
        // if(product.checked){                        //если checkbox-кнопка выбрана
        //     selectetEl.push(product.value);   //добавляем значение в массив выбранных
        // } else {                                         //иначе удаляем из массива выбранных
        //     selectetEl.splice(selectetEl.indexOf(product.value),1)
        // }

        // if (selectetEl.length != 0) { //если массив не пустой (т.е. длина массива  не равна 0)
        //     let res=0;
        //     let arr =selectetEl.map(el => res+= +el);
        //     resultElem.textContent= `${res} руб` //записываем значения в resultElement
        // } else {
        //     resultElem.textContent = "ничего не выбрано." //иначе записываем в resultElement, что ничего не выбрано
        // }
    });
});


//по клику на кнопку должен появиться alert с текстом
//(*)для выбравших способ 1 или 2 именно внутри данного события будет происходить подсчет итоговой суммы,
//вам нужно перебрать все элементы checkbox и input в цикле


btn.addEventListener('click', function(){
    user.surname = userSurname.value;
    user.name = userName.value;
    alert(`Заказчик: ${user.surname} ${user.name} 
    Итого: ${resultElem.textContent} руб.`)
})