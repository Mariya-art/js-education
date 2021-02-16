// 1. Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие картинки по указанному в src адресу.

// Галерея 1 (вариант, когда большую картинку показываем вместо маленькой)
var mas = document.querySelectorAll(".gallery__img");
for (var item of mas) {
  item.onclick = bigPicture;
}

function bigPicture(e){
  switch(e.target) {
    case mas[0]:
      mas[0].src="img-big/product-1.jpg" 
      mas[0].setAttribute("onerror", "error()");
      break;
    case mas[1]:
      mas[1].src="img-big/product-2.jpg" 
      mas[1].setAttribute("onerror", "error()");
      break;
    case mas[2]:
      mas[2].src="img-big/product-3.jpg" 
      mas[2].setAttribute("onerror", "error()");
      break; 
  };
}

function error(){
  alert("Файл не найден");
}

// Галерея 2 (вариант, когда большую картинку показываем после всех маленьких)
var list = document.querySelector(".gallery__list2");//список, после которого будем ставить большие картинки
var mas2 = document.querySelectorAll(".gallery__img2");
for (var item of mas2) {
  item.onclick = bigPicture2;
}

function bigPicture2(e) {
  switch(e.target) {
    case mas2[0]:
      list.insertAdjacentHTML("afterEnd", '<img class="gallery__img-big" src="img-big/product-1.jpg" onerror="error2()">');//ставим большую картинку после списка маленьких картинок
      deletePrevious();//удаляем предыдущие картинки (если они есть)
      break;
    case mas2[1]:
      list.insertAdjacentHTML("afterEnd", '<img class="gallery__img-big" src="img-big/product-2.jpg" onerror="error2()">');
      deletePrevious();
      break;
    case mas2[2]:
      list.insertAdjacentHTML("afterEnd", '<img class="gallery__img-big" src="img-big/product-3.jpg" onerror="error2()">');
      deletePrevious();
      break;   
  };
}

function error2(){
  alert("Файл не найден");
  document.querySelector(".gallery__img-big").style.display="none";
}

function deletePrevious() {
  var masBig = document.querySelectorAll(".gallery__img-big");
  if (masBig.length > 1) {
    for (var i=1; i < masBig.length; i++) {
      masBig[i].style.display="none";
    }
  }
}

// 2. Реализовать модуль корзины. Создать блок товаров и блок корзины. У каждого товара есть кнопка «Купить», при нажатии на которую происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать общую сумму заказа.

var cart = document.querySelector(".cart__list");//список товаров в корзине
var total = 0;//общая стоимость товаров в корзине
var buy = document.querySelectorAll(".feature__button");//добавляем id для кнопки
for (var i = 0; i < buy.length; i++) {
  buy[i].id = products[i].id;
  buy[i].onclick = buyFunc;//функция по клику на кнопку
}
var buy = document.querySelectorAll(".feature__button-text");//добавляем id для текста кнопки, чтобы при нажатии на текст тоже срабатывало
for (var i = 0; i < buy.length; i++) {
  buy[i].id = products[i].id;
}
var buy = document.querySelectorAll(".feature__button-icon");//добавляем id для иконки корзины, чтобы при нажатии на нее тоже срабатывало
for (var i = 0; i < buy.length; i++) {
  buy[i].id = products[i].id;
}

function buyFunc(e) {
  var i = products.findIndex(function(entry){return entry.id == e.target.id;}); //находим индекс товара с нужным нам id
  cart.insertAdjacentHTML("beforeEnd", '<p class="cart__item">'+ products[i].name +'<span class="colortext text-margin text-bold">$'+ products[i].price +'</span></p>');//добавляем товар в корзину (название, цена)
  document.querySelector(".cart__text").style.display="none";//убираем текст "Ваша корзина пуста"
  total += products[i].price;//пересчитываем общую стоимость товаров
  var totalPrice = cart.insertAdjacentHTML("afterEnd", '<div class="total"><p class="total__text">grand total<span class="colortext text-margin text-bold">$'+ total +'</span></p></div>');//добавляем общую стоимость товаров
  deletePreviousTotal();//удаляем предыдущие расчеты стоимости (если они есть)
}

function deletePreviousTotal() {
  var masTotal = document.querySelectorAll(".total");
  if (masTotal.length > 1) {
    for (var i=1; i < masTotal.length; i++) {
      masTotal[i].style.display="none";
    }
  }
}

// 3. *Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки должны быть стрелки «вперед» и «назад», по нажатию на которые происходит замена изображения на следующее или предыдущее.

document.querySelector(".product__link-next").onclick = nextFunc;//функция по клику на кнопку;
document.querySelector(".product__link-prev").onclick = prevFunc;//функция по клику на кнопку;

function nextFunc(){
  var source = document.querySelector(".product__img-big").id;//определяем id текущей картинки
  if (+source !== sources.length){
    var i = sources.findIndex(function(entry){return entry.id == source;});//находим индекс картинки с нужным нам id
    i += 1;//индекс следующей картинки в массиве
    document.querySelector(".product__img-big").src = sources[i].src;//переопределяем картинку
    document.querySelector(".product__img-big").id = +source + 1;//переназначаем ей id
  }
}

function prevFunc(){
  var source = document.querySelector(".product__img-big").id;//определяем id текущей картинки
  if (+source !== 1){
    var i = sources.findIndex(function(entry){return entry.id == source;});//находим индекс картинки с нужным нам id
    i -= 1;//индекс предыдущей картинки в массиве
    document.querySelector(".product__img-big").src = sources[i].src;//переопределяем картинку
    document.querySelector(".product__img-big").id = +source - 1;//переназначаем ей id
  }
}