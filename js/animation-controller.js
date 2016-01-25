
var currentPage = 1;
var maxPage = 2;

document.onclick = function () {
  // document.getElementById('pg_1').className += ' anim-scale-down'
  var pgOne = document.getElementById('pg_1');
  //addClass(pgOne, 'anim-scale-down');
  //toggleClass(pgOne, 'anim-scale-down');
  //hidePage(pgOne);

  nextPage();
};

// ---------------------------------------- UTILITIES ---------------------------------------- //

function nextPage() {
  var firstPage = document.getElementById('pg_' + currentPage);
  var secondPage = null;

  if (currentPage < maxPage){
    secondPage = document.getElementById('pg_' + (currentPage+1) );
  }
  else { return false; }

  hidePage(firstPage);
  addClass(secondPage, 'current');
}

function hidePage(element) {
  element.addEventListener('animationend', reset);

  addClass(element, 'anim-scale-down');
}

function reset() {
  console.log('reset called');

  removeClass(this, 'current');
  this.removeEventListener('animationend', reset);
}


// ------------------------------------ GENERAL UTILITIES ------------------------------------ //

function addClass(element, className) {
  if(element.classList.contains(className)) {
    console.log(className + ' already in classList');
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
    console.log(className + ' not in classList');
  }
}

function toggleClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    element.classList.add(className);
  }
}
