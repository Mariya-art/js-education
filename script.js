//1-3. Создать функцию, генерирующую шахматную доску. Доска должна чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H. Заполнить доску фигурами, причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.

var table = document.createElement('table');
table.style.borderCollapse = 'collapse';
table.style.width = '500px';
table.style.height = '470px';
table.style.textAlign = 'center';
var tr, td, i;
for (i = 0; i < 10; i++){
  tr = document.createElement('tr');
  table.append(tr);
  for (j = 0; j < 10; j++){
    td = document.createElement('td');
    td.style.width = '50px';
    td.style.height = '47px';
    tr.append(td);
  }
}
document.getElementsByClassName('chess')[0].append(table);

var str = document.getElementsByTagName('tr');
for (i = 0; i < str.length; i++){
  str[0].children[i].innerHTML = str0[i]; // первая и последняя строки с буквами
  str[0].children[i].style.transform = 'rotate(180deg)';
  str[0].children[i].style.background = '#F5DEB3';
  str[9].children[i].innerHTML = str0[i];
  str[9].children[i].style.background = '#F5DEB3';
  str[1].children[i].innerHTML = str1[i]; // 1 и 7 строка с фигурами
  str[7].children[i].innerHTML = str7[i];
  str[2].children[i].innerHTML = str2[i]; // 2 и 8 строка с фигурами
  str[8].children[i].innerHTML = str8[i];
  if (i % 2 == 0){ // шахматный порядок для нечетных строк
    for (j = 1; j < 9; j++){
      if (j % 2 !== 0){
        str[j].children[i].style.background = '#8B4513';
      } else {
        str[j].children[i].style.background = '#F5DEB3';
      }
    }
  }
  if (i % 2 !== 0){ // шахматный порядок для четных строк
    for (j = 1; j < 9; j++){
      if (j % 2 !== 0){
        str[j].children[i].style.background = '#F5DEB3';
      } else {
        str[j].children[i].style.background = '#8B4513';
      }
    }
  }
  if (i == 0){
    str[3].children[i].innerHTML = '6'; // добавляем цифры в первую колонку
    str[4].children[i].innerHTML = '5';
    str[5].children[i].innerHTML = '4';
    str[6].children[i].innerHTML = '3';
    for (j = 1; j < 9; j++){ // для первой колонки (с цифрами) закрашиваем темные квадраты в светлый цвет
      if (j % 2 !== 0){
        str[j].children[i].style.background = '#F5DEB3';
      }
    }
  }
  if (i == 9){
    str[3].children[i].innerHTML = '6'; // добавляем цифры в последнюю колонку
    str[4].children[i].innerHTML = '5';
    str[5].children[i].innerHTML = '4';
    str[6].children[i].innerHTML = '3';
    for (j = 1; j < 9; j++){
      str[j].children[i].style.transform = 'rotate(180deg)'; // в последней колонке (с цифрами) переворачиваем цифры
      str[j].children[i].style.position = 'relative';
      str[j].children[i].style.left = '1px';
      if (j % 2 == 0){ // закрашиваем темные квадраты в светлый цвет
        str[j].children[i].style.background = '#F5DEB3';
      }
    }
  }
  if (i > 0 && i < 9){ // рамка для ячеек шахматного поля
    for (j = 1; j < 9; j++){
      str[j].children[i].style.border = '1px solid #8B4513';
    }
  }
}