// В игре змейка: Выводить счёт в режиме реального времени. Генерировать временные препятствия на поле. *Убрать границы поля. Т.е. при пересечении границы поля змейка появляется с противоположной стороны.

var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка (массив с ячейками змейки)
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат

function init() {
  prepareGameField(); // Генерация поля
  var wrap = document.getElementsByClassName('wrap')[0];
  // Подгоняем размер контейнера под игровое поле, если необходимо
  /*if (16 * (FIELD_SIZE_X + 1) < 380) {
    wrap.style.width = '380px';
  }
  else {
    wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
  }*/
  wrap.style.width = '400px';
  // События кнопок Старт и Новая игра
  document.getElementById('snake-start').addEventListener('click', startGame);
  document.getElementById('snake-new').addEventListener('click', refreshGame);
  // Отслеживание клавиш клавиатуры
  addEventListener('keydown', changeDirection);
}

// Функция генерации игрового поля
function prepareGameField() {
  var game_table = document.createElement('table');// Создаём таблицу
  game_table.setAttribute('class', 'game-table');

  for (var i = 0; i < FIELD_SIZE_X; i++) {// Генерация ячеек игровой таблицы
    var row = document.createElement('tr');// Создание строки
    row.className = 'game-table-row row-' + i;

    for (var j = 0; j < FIELD_SIZE_Y; j++) {
      var cell = document.createElement('td');// Создание ячейки
      cell.className = 'game-table-cell cell-' + i + '-' + j;
      row.appendChild(cell); // Добавление ячейки
    }
    game_table.appendChild(row); // Добавление строки
  }
  document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

// Старт игры
function startGame() {
  gameIsRunning = true;
  respawn();//создали змейку
  snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
  setTimeout(createFood, 5000);
  setTimeout(createBomb, 5000);
}

// Функция создания змейки на игровом поле
function respawn() {// Змейка - массив td. Стартовая длина змейки = 2
  // Respawn змейки из центра
  var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
  var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
  // Голова змейки
  var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
  snake_head.classList.add('snake-unit');
  // Хвост змейки
  var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y + 1) + '-' + start_coord_x)[0];
  snake_tail.classList.add('snake-unit');

  snake.push(snake_tail);
  snake.push(snake_head); // голову добавляем именно последней в массив snake (это важно дальше)
}

// Движение змейки
function move() {
  // Сборка классов (берем голову змейки, получаем все классы, преобразуем в массив)
  var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

  // Сдвиг головы (получаем координаты головы)
  var new_unit;
  var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
  var coord_y = parseInt(snake_coords[1]);
  var coord_x = parseInt(snake_coords[2]);

  // Определяем новую точку
  if (direction == 'x-') {
    new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
  }
  else if (direction == 'x+') {
    new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
  }
  else if (direction == 'y+') {
    new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
  }
  else if (direction == 'y-') {
    new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
  }

  // Если змейка ушла за границу поля, то показываем ее с другой стороны
  if (new_unit == undefined) {
    if (direction == 'x-') {
      new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X - 1))[0];
    }
    else if (direction == 'x+') {
      new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + 0)[0];
    }
    else if (direction == 'y+') {
      new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
      new_unit = document.getElementsByClassName('cell-' + 0 + '-' + (coord_x))[0];
    }
  }

  // Проверки: 1) new_unit не часть змейки; 2) Змейка не взорвалась на бомбе
  if (!isSnakeUnit(new_unit) && !isBombUnit(new_unit)) {
    // Добавление новой части змейки
    new_unit.classList.add('snake-unit');
    snake.push(new_unit);
    // Проверяем, надо ли убрать хвост
    if (!haveFood(new_unit)) {// 
      var removed = snake.splice(0, 1)[0];//удалили из массива змейки первый элемент (это хвост)
      removed.classList.remove('snake-unit');//у удаленного хвоста убираем классы: змейка и
      removed.classList.remove('food-unit');//еда (когда еда оказалась в хвосте)
    }
  }
  else {
    finishTheGame();
  }
}

// Проверка на змейку
function isSnakeUnit(unit) {
  var check = false;
  if (snake.includes(unit)) {
    check = true;
  }
  return check;
}

// Проверка на бомбу
function isBombUnit(unit) {
  var check = false;
  var unit_classes = unit.getAttribute('class').split(' ');
  if (unit_classes.includes('bomb-unit')) {// Если бомба
    check = true;  
  }
  return check;
}

// Проверка на еду
function haveFood(unit) {
  var check = false;
  var unit_classes = unit.getAttribute('class').split(' ');
  if (unit_classes.includes('food-unit')) {// Если еда
    check = true;
    createFood();
    createBomb();
    score++;
    document.querySelector('.score').innerText = score;   
  }
  return check;
}

// Создание еды
function createFood() {
  var foodCreated = false;

  while (!foodCreated) { //пока еду не создали
    // рандом
    var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
    var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

    var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];//находим ячейку по рандомным координатам
    var food_cell_classes = food_cell.getAttribute('class').split(' ');//переводим в массив все её классы

    // проверка на змейку (чтобы еда не попала на змейку)
    if (!food_cell_classes.includes('snake-unit')) {
      food_cell.classList.add('food-unit');
      foodCreated = true;
    }
  }
}

// Создание бомбочки
function createBomb() {
  var bombCreated = false;

  while (!bombCreated) { //пока бомбу не создали
    // рандом
    var bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
    var bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);

    var bomb_cell = document.getElementsByClassName('cell-' + bomb_y + '-' + bomb_x)[0];//находим ячейку по рандомным координатам
    var bomb_cell_classes = bomb_cell.getAttribute('class').split(' ');//переводим в массив все её классы

    // проверка на змейку и на еду (чтобы бомба не попала на змейку и на еду)
    if (!bomb_cell_classes.includes('snake-unit') && !bomb_cell_classes.includes('food-unit')) {
      bomb_cell.classList.add('bomb-unit');
      bombCreated = true;
    }
  }
}

// Изменение направления движения змейки
function changeDirection(e) {
  console.log(e);
	switch (e.keyCode) {
    case 37: // Клавиша влево
      if (direction != 'x+') {
        direction = 'x-';
      }
      break;
    case 38: // Клавиша вверх
      if (direction != 'y-') {
        direction = 'y+';
      }
      break;
    case 39: // Клавиша вправо
      if (direction != 'x-') {
        direction = 'x+';
      }
      break;
    case 40: // Клавиша вниз
      if (direction != 'y+') {
        direction = 'y-';
      }
      break;
  }
}

// Функция завершения игры
function finishTheGame() {
  gameIsRunning = false;
  clearInterval(snake_timer);
  alert('Вы проиграли! Ваш результат: ' + score.toString());
}

// Новая игра
function refreshGame() {
  location.reload();
}

// Инициализация
window.onload = init;