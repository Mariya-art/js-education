//1. Почему код дает именно такие результаты?
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 - префиксная форма ++a сразу прибавляет единицу к значению a.
d = b++; alert(d);           // 1 - постфиксная форма b++ сначала присваивает значение b (равное 1), которое мы и выводим, и только на следующем шаге будет прибавлять единицу.
c = (2+ ++a); alert(c);      // 5 - к предыдущему значению 2 префиксная форма ++a добавляет 1, и к этому значению прибавляем еще 2, итого 2+1+2=5.
d = (2+ b++); alert(d);      // 4 - к предыдущему значению 1 постфиксная форма b++ добавляет 1, и к этому значению прибавляем еще 2, итого 2+1+1=4.
alert(a);                    // 3 - выводим результат а, равный 3.
alert(b);                    // 3 - постфиксная форма добавляет 1 и выводим значение b=2+1=3.

//2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2); // х=5

//3. Написать скрипт для a и b: если a и b положительные, вывести их разность; если а и b отрицательные, вывести их произведение; если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
var a = parseInt(prompt("Укажите любое целое число a:"));
var b = parseInt(prompt("Укажите любое целое число b:"));

if (a >= 0 && b >= 0){
  c = a - b;
  alert("Разность положительных чисел a и b равна: " + c);
}
else if (a < 0 && b < 0){
  c = a * b;
  alert("Произведение отрицательных чисел a и b равно: " + c);
}
else{
  c = a + b;
  alert("Сумма чисел a и b равна: " + c);
}

//4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

var a = +((Math.random() * 15).toFixed(0));
switch (a) {
  case a = 0:
    alert(a++);
  case a = 1:
    alert(a++);
  case a = 2:
    alert(a++);
  case a = 3:
    alert(a++);
  case a = 4:
    alert(a++);
  case a = 5:
    alert(a++);
  case a = 6:
    alert(a++);    
  case a = 7:
    alert(a++);
  case a = 8:
    alert(a++);
  case a = 9:
    alert(a++);
  case a = 10:
    alert(a++);
  case a = 11:
    alert(a++);
  case a = 12:
    alert(a++);
  case a = 13:
    alert(a++);
  case a = 14:
    alert(a++);
  case a = 15:
    alert(a++);
}

//5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
var a = parseFloat(prompt("Введите первое число:"));
var b = parseFloat(prompt("Введите второе число:"));

function sum(a,b){
  var sum = a + b;
  alert("Сумма двух чисел = " + sum);
  return sum;
}

function difference(a,b){
  var dif = a - b;
  alert("Разность двух чисел = " + dif);
  return dif;
}

function multiplication(a,b){
  var multi = a * b;
  alert("Произведение двух чисел = " + multi);
  return multi;
}

function division(a,b){
  var division = a / b;
  alert("Результат деления первого числа на второе = " + division);
  return division;
}

sum(a,b);
difference(a,b);
multiplication(a,b);
division(a,b);

//6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).

var arg1 = parseFloat(prompt("Введите первое число:"));
var arg2 = parseFloat(prompt("Введите второе число:"));
var operation = prompt("Укажите название операции (sum, difference, multiplication, division):");

function mathOperation(arg1, arg2, operation){
  switch (operation){
    case "sum":
      sum(arg1,arg2);
      break;
    case "difference":
      difference(arg1,arg2);
      break;
    case "multiplication":
      multiplication(arg1,arg2);
      break;
    case "division":
      division(arg1,arg2);
      break;
    default:
      alert("Название операции указано неверно");
  }
}

mathOperation(arg1, arg2, operation);

//7. *Сравнить null и 0. Попробуйте объяснить результат.
var a = null;
var b = 0;
if (a > b){
  alert("null больше 0"); // false, потому что null преобразуется в +0. +0 равно 0, значит +0>0 неверно.
}
else if (a < b){
  alert("null меньше 0"); // false, потому что null преобразуется в +0. +0 равно 0, значит +0<0 неверно.
}
else if (a = b){
  alert("null = 0"); // false - в соответствии с алгоритмом js, если при проверке равенства тип(a) отличается от тип(b), то сразу переходим к шагам, среди которых нет варианта сравнения null и 0, а значит по умолчанию значение false.
}
else if (a <= b){
  alert("null <= 0"); // true - в соответствии с алгоритмом js при таком сравнении идет только одна проверка: если null>0 это false (как в нашем случае), то null<=0 верно.
}
else if (a >= b){
  alert("null >= 0"); // также true (если поставить это условие перед a <= b) - в соответствии с алгоритмом js при таком сравнении идет только одна проверка: если null<0 это false (как в нашем случае), то null>=0 верно.
}
else{
  alert("что-то другое");
}

//8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.

var val = parseFloat(prompt("Введите число:"));
var pow = parseInt(prompt("Укажите, в какую степень нужно возвести " + val + " (степень может быть указана как любое целое число):"));

function power(val, pow){
  if(pow == 1){
    return val;
  }
  else if(val == 0 && pow == 0){
    result = "Результат 0^0 не определен в математике, потому что лишен смысла.";
    return result;
  }
  else if(pow == 0){
    result = 1;
    return result;
  }
  else if(pow == -1){
    result = 1 / val;
    return result;
  }
  else if(pow < -1){
    result = (1 / val) * power(val, pow + 1);
    return result;
  }
  else {
    return val * power(val, pow - 1);
  }
}

alert("Результат возведения числа " + val + " в степень " + pow + " равен: " + power(val, pow));