//1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
var i = 2, masPrime = [i];
while(i < 100){
  i++;
  var k = 2;
  var prime = 1;
  while(k < i){
    if (i % k == 0){
      prime = 0;
      break;
    }
    else {
      k++;
    } 
  }
  if(prime == 1) {
    masPrime.push(i);
  }
}

document.write(masPrime);

//2. Реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
var goods = [
  {
    title: "Товар 1",
    price: 100,
    count: 2
  },
  {
    title: "Товар 1",
    price: 200,
    count: 1
  },
  {
    title: "Товар 1",
    price: 300,
    count: 3
  }
];

var s = 0;
for (var good of goods){
  s += good.price * good.count;
}
document.write("<br>Стоимость всех товаров в корзине = " + s);

//3. Товары в корзине хранятся в массиве. Задачи: a) Организовать такой массив для хранения товаров в корзине; b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
function countBasketPrice(mas){
  var sum = 0;
  for(var item of mas){
    sum += item.price * item.count;
  }
  document.write("<br>Стоимость всех товаров в корзине (расчет с помощью функции) = " + sum);
  return sum;
}

countBasketPrice(goods);

//4. *Вывести в консоль с помощью цикла for числа от 0 до 9, не используя тело цикла.
for(i = 0; i <= 9; console.log(i++)){};

//5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5.
var mas = [], x = "x";
for(i = 1; i <= 20; i++){
  mas.push(x);
  var string = mas.join("");
  console.log(string);
};
