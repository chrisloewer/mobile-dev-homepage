
var currentPage = 1;
var maxPage = null;
var animLock = false;
touches = {
  "touchstart": {"x":-1, "y":-1},
  "touchmove" : {"x":-1, "y":-1},
  "touchend"  : false,
  "direction" : "undetermined"
};

window.onload = function() {
  maxPage = document.getElementsByClassName('splash-fullscreen').length;

  // Add other Event Listeners
  window.addEventListener('keyup', keyHandler, false);
  document.addEventListener('touchstart', touchHandler, false);
  document.addEventListener('touchmove', touchHandler, false);
  document.addEventListener('touchend', touchHandler, false);
};


// --------------------------------------- EVENT HANDLERS ------------------------------------ //

function keyHandler(e) {

  switch(e.keyCode) {
    case 37:  // Left Key
      prevPage();
      break;
    case 39:  // Right Key
      nextPage();
      break;
  }
}

function touchHandler(e) {
  var touch;
  if (typeof e !== 'undefined'){
    // e.preventDefault();
    if (typeof e.touches !== 'undefined') {
      touch = e.touches[0];
      switch (e.type) {
        case 'touchstart':
        case 'touchmove':
          touches[e.type].x = touch.pageX;
          touches[e.type].y = touch.pageY;
          break;
        case 'touchend':
          touches[e.type] = true;
          if (touches.touchstart.y > -1 && touches.touchmove.y > -1) {
            touches.direction = touches.touchstart.x < touches.touchmove.x ? "right" : "left";
            var swipeDist = Math.abs(touches.touchstart.x - touches.touchmove.x);

            if(touches.direction == 'left' && swipeDist > 100) {
              nextPage();
            }
            else if(touches.direction == 'right' && swipeDist > 100) {
              prevPage();
            }
          }
          break;
        default:
          break;
      }
    }
  }
}

// ---------------------------------------- UTILITIES ---------------------------------------- //

function nextPage() {
  if (animLock == true) { return false; }

  animLock = true;
  var initialPage = document.getElementById('pg_' + currentPage);
  var secondPage = null;

  if (currentPage < maxPage){
    secondPage = document.getElementById('pg_' + (currentPage+1) );
  }
  else { return false; }

  hidePage(initialPage);
  addClass(secondPage, 'current');
  addClass(secondPage, 'anim-move-from-right');

  secondPage.addEventListener('animationend', helper);
  function helper() {
    removeClass(this, 'anim-move-from-right');
    animLock = false;
    this.removeEventListener('animationend', helper);
  }

  currentPage++;
  return true;
}


function prevPage() {
  if (animLock == true) { return false; }
  animLock = true;

  var initialPage = document.getElementById('pg_' + currentPage);
  var secondPage = null;

  if (currentPage > 1){
    secondPage = document.getElementById('pg_' + (currentPage-1) );
  }
  else { return false; }

  hidePage(initialPage);
  addClass(secondPage, 'top');
  addClass(secondPage, 'current');
  addClass(secondPage, 'anim-move-from-left');

  secondPage.addEventListener('animationend', helper);
  function helper() {
    removeClass(this, 'top');
    removeClass(this, 'anim-move-from-left');
    animLock = false;
    this.removeEventListener('animationend', helper);
  }

  currentPage--;
  return true;
}

function hidePage(element) {
  addClass(element, 'anim-scale-down');
  element.addEventListener('animationend', reset);
}

function reset() {
  console.log('reset called');

  removeClass(this, 'current');
  removeClass(this, 'anim-move-from-right');
  removeClass(this, 'anim-scale-down');


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
