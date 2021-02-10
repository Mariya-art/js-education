//1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

var masNum = [0, 0, 0]; // трехзначное число в виде массива
var object = {}; // пустой объект
getNumber(); //получаем число и преобразуем в массив

function getNumber(){
  var num = prompt("Введите число от 0 до 999");
  if(parseInt(num) < 0 || isNaN(parseInt(num))){
    alert("Вы указали отрицательное число или вообще не ввели число");
  } else if(parseInt(num) > 999){
      console.log("Ваше число превышает 999, поэтому создан пустой объект");
      return object;
  } else{
    if(parseInt(num) >= 0 && parseInt(num) < 10){
      masNum[2] = parseInt(num);
    } else if(parseInt(num) >= 10 && parseInt(num) < 100){
      var mas = num.split("");
      masNum[1] = mas[0];
      masNum[2] = mas[1];
    } else{
      var mas = num.split("");
      masNum[0] = mas[0];
      masNum[1] = mas[1];
      masNum[2] = mas[2];
    }
    getObject();
  }
}

function getObject(){ // из массива получаем объект со свойствами
  object.nums = masNum[2];
  object.tens = masNum[1];
  object.hundreds = masNum[0];
  console.log("Единицы: " + masNum[2] + ", Десятки: " + masNum[1] + ", Сотни: " + masNum[0]);
  return object;
}

//1. Компактное решение:

var obj = {}; // пустой объект
var num = parseInt(prompt("Введите число от 0 до 999"));
getNum(num);

function getNum(n){
  if(n < 0 || isNaN(n)){
    alert("Вы указали отрицательное число или вообще не ввели число");
  } else if(n > 999){
      console.log("Ваше число превышает 999, поэтому создан пустой объект");
      return obj;
  } else{
      this.nums = n % 10; // единицы
      this.tens = Math.floor(n/10) % 10; // десятки
      this.hundreds = Math.floor(n/100) % 10; // сотни
      console.log("Единицы: " + this.nums + ", Десятки: " + this.tens + ", Сотни: " + this.hundreds);
      return obj;
  }
}

//2. Для игры, реализованной на уроке, добавить возможность вывода хода номер n (номер задается пользователем).
var event, ok, mas = [0];

function isGame(a, b, c, d){//проверка введенного ответа на выход из игры (и на корректность)
  do { 
    ok = false;
    event = +prompt(a + b + c + '-1 - Выход из игры');
    if (event == -1){
      break;
    } else {
      ok = isAnswer(d, event, a, b, c);
    }
  } while(!ok);
}

function isAnswer(ansCount, answer, ques, ans1, ans2){//проверка введенного ответа на корректность
  if (isNaN(answer) || !isFinite(answer)){//введено не число или бесконечность
    alert('Вы ввели недопустимый символ');
    return false;
  } 
  if (answer < 1 || answer > ansCount){//число не входит в диапазон возможных ответов
    alert('Ваше число выходит из допустимого диапазона');
    return false;
  }
  mas[0] += 1; //если ответ корректный, то добавляем счетчик вопросов-ответов в массив
  mas.push(ques); // добавляем вопрос в массив
    if (answer == 1){ // добавляем ответ в массив
      mas.push(ans1); 
    } else {
      mas.push(ans2);
    }
  return true;
}

isGame(works.a00, works.a1, works.a2, works.a0);//Выводим первый вопрос
switch(event){
  case 1://Первое действие - если в первом окне ввели 1, то открываем серию окон - окно 2 
    isGame(works.b00, works.b1, works.b2, works.b0);
    switch(event){
      case 1://Второе действие - если во 2ом окне ввели 1, то переходим к 4му окну 
        isGame(works.d00, works.d1, works.d2, works.d0);
        break;
      case 2://Второе действие - если во 2ом окне ввели 2, то переходим к 3му окну 
        isGame(works.c00, works.c1, works.c2, works.c0);
        switch(event){
          case 1://Третье действие - если в 3м окне ввели 1, то переходим к 4му окну 
            isGame(works.d00, works.d1, works.d2, works.d0);
            break;
          case 2://Третье действие - если в 3м окне ввели 2, то также переходим к 4му окну 
            isGame(works.d00, works.d1, works.d2, works.d0);
            break;
        }
        break;
    }
    break;
  case 2://Первое действие - если в первом окне ввели 2, то открываем сразу окно 3 
    isGame(works.c00, works.c1, works.c2, works.c0);
    switch(event){
      case 1://Второе действие - если в 3м окне ввели 1, то переходим к 4му окну 
        isGame(works.d00, works.d1, works.d2, works.d0);
        break;
      case 2://Второе действие - если в 3м окне ввели 2, то также переходим к 4му окну 
        isGame(works.d00, works.d1, works.d2, works.d0);
        break;
    }
    break;
};
console.log(mas); // получили массив, 
//где mas[0] - счетчик вопросов-ответов
// mas[1] - 1й вопрос, mas[2] - ответ игрока на 1й вопрос,
// mas[3] - 2й вопрос, mas[4] - ответ игрока на 2й вопрос и т.д.

if(mas[0] > 0){ // если игрок ответил на один или более вопросов
  i = parseInt(prompt('Вы ответили на '+ mas[0] +' вопроса.\n' +
  'Какой вопрос вывести на экран? Укажите номер вопроса (число от 1 до '+ mas[0] +'):'));
  if (i > 0 && i <= mas[0]){
    alert('Текст вопроса:\n' + mas[2 * i - 1] + '\nВаш ответ:\n' + mas[2 * i]);
  }
  else {
    alert('Вы не ввели число из диапазона, поэтому не сможете увидеть ваш вопрос и ответ.');
  }
};

alert('Спасибо за игру!');

//3. *На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»
var step, ok, masMoney = [0, 0];

for (i = 0; i < steps.length; i++){
  game(steps[i].q, steps[i].answer1, steps[i].answer2, steps[i].answer3, steps[i].count);
  if (step == -1){
    break;
  };
  correctAnswer(step, steps[i].correct);
  if (step !== steps[i].correct){
    break;
  };
};
alert('Спасибо за игру!');

function game(a, b, c, d, count){//проверка введенного ответа на выход из игры (и на корректность)
  do { 
    ok = false;
    step = +prompt(a + b + c + d + '-1 - Выход из игры');
    if (step == -1){
      break;
    } else {
      ok = answer(count, step);
    }
  } while(!ok);
}

function answer(ansCount, answer){//проверка введенного ответа на корректность
  if (isNaN(answer) || !isFinite(answer)){//введено не число или бесконечность
    alert('Вы ввели недопустимый символ');
    return false;
  } 
  if (answer < 1 || answer > ansCount){//число не входит в диапазон возможных ответов
    alert('Ваше число выходит из допустимого диапазона');
    return false;
  }
  return true;
}

function correctAnswer(answer, correct){//проверка ответа на правильность
  if (answer == correct){ //если ответ правильный,
    masMoney[0] += 1; //то увеличиваем счетчик правильных ответов
    masMoney[1] += 1000 * masMoney[0]; //увеличиваем счетчик выигрыша (каждый ответ дороже предыдущего на 1000 у.е.)
    alert('Поздравляю! Вы ответили правильно и заработали '+ 1000 * masMoney[0] +'рублей.\nОбщая сумма выигрыша: '+ masMoney[1] +'рублей.');
  } else {
    alert('Вы проиграли :(\nПравильный ответ: '+ correct);
  }
}