
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
    element.classList.add(className);
  }
}

function removeChildNodes(element) {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
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
