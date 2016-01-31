var currentPage = 1;

window.onload = function() {
  var buttonOne = document.getElementById('button_1');
  var buttonTwo = document.getElementById('button_2');

  buttonOne.addEventListener('click', clickListener);
  buttonOne.page = 1;
  buttonTwo.addEventListener('click', clickListener);
  buttonTwo.page = 2;

  goToPage(2);
  addTable();
};




// ------------------------------------ TABLE HANDLERS ------------------------------------ //

function removeTable() {
  var container = document.getElementById('table_container');
  removeChildNodes(container);
}

function addTable() {

  var container = document.getElementById('table_container');

  // Slider values
  var numOne = parseInt(document.getElementById('num_1').value);
  var numTwo = parseInt(document.getElementById('num_2').value);


  removeChildNodes(container);


  //Create Table
  var table = document.createElement('table');
  var i, j;

  for(i=1;i<=numTwo;i++) {

    var row = document.createElement('tr');

    for(j=1;j<=numOne;j++) {
      var cell = document.createElement('td');
      var cellData = document.createTextNode(i*j + '');
      cell.appendChild(cellData);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }


  container.appendChild(table);
}


// ------------------------------------ EVENT HANDLERS ------------------------------------ //

function clickListener(e) {
  goToPage(e.target.page);
}


function goToPage(n) {
  if(currentPage == n) { return false; }

  var initPage = document.getElementById('pg_' + currentPage);
  var destPage = document.getElementById('pg_' + n);

  removeClass(initPage, 'current');
  addClass(destPage, 'current');

  var initButton = document.getElementById('button_' + currentPage);
  var destButton = document.getElementById('button_' + n);

  removeClass(initButton, 'current');
  addClass(destButton, 'current');

  currentPage = n;
}


// ------------------------------------ GENERAL UTILITIES ------------------------------------ //

function addClass(element, className) {
  if(element.classList.contains(className)) {
    // console.log(className + ' already in classList');
  }
  else {
    element.classList.add(className);
  }
}

function removeClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    // console.log(className + ' not in classList');
  }
}

function toggleClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    // element.classList.add(className);
  }
}

function removeChildNodes(element) {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
