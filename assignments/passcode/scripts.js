



// ------------------------------------ PAGE SCROLL UTILITIES --------------------------------- //

function showPage(pageId) {
  var page = document.getElementById(pageId);

  addClass(page, 'current');
  addClass(page, 'anim-in');
  page.addEventListener('animationend', animHelper);

  function animHelper() {
    removeClass(this, 'anim-out');
    this.removeEventListener('animationend',animHelper);
  }
}

function hidePage(pageId) {
  var page = document.getElementById(pageId);
  addClass(page, 'anim-out');
  page.addEventListener('animationend', reset);
}

function reset() {
  removeClass(this, 'current');
  removeClass(this, 'anim-in');
  removeClass(this, 'anim-out');
  this.removeEventListener('animationend', reset);
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

// Adds leading zeros if necessary
function padInt(int, len){
  var str = int + '';
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}

