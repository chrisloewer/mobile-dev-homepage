

// ------------------------------------ PASSWORD FUNCTIONALITY -------------------------------- //

var inp_pw = '';
var PASSWORD = '4569';

function keyPress(num) {
  inp_pw += num;
  document.getElementById('pw_field').value += '*';

  if(inp_pw == PASSWORD) {
    logIn();
  }
  else {
    return false;
  }
}

function clearPW() {
  inp_pw = '';
  document.getElementById('pw_field').value = '';
}

function logIn() {
  showPage('pg_logged-in');
  clearPW();
}

// ------------------------------------ PAGE SCROLL UTILITIES --------------------------------- //

function showPage(pageId) {
  var page = document.getElementById(pageId);

  addClass(page, 'current');
  addClass(page, 'anim-in');
  page.addEventListener('animationend', animHelper);

  function animHelper() {
    removeClass(this, 'anim-in');
    this.removeEventListener('animationend',animHelper);
  }
}

function hidePage(pageId) {
  var page = document.getElementById(pageId);
  addClass(page, 'anim-out');
  page.addEventListener('animationend', resetPage);
}

function resetPage() {
  removeClass(this, 'current');
  removeClass(this, 'anim-in');
  removeClass(this, 'anim-out');
  this.removeEventListener('animationend', resetPage);
}

function showPopup(pageId) {
  var page = document.getElementById(pageId);

  addClass(page, 'current');
  addClass(page, 'anim-in-popup');
  page.addEventListener('animationend', animHelper);

  function animHelper() {
    removeClass(this, 'anim-in-popup');
    this.removeEventListener('animationend',animHelper);
  }
}

function hidePopup(pageId) {
  var page = document.getElementById(pageId);
  addClass(page, 'anim-out-popup');
  page.addEventListener('animationend', resetPopup);
}

function resetPopup() {
  removeClass(this, 'current');
  removeClass(this, 'anim-in-popup');
  removeClass(this, 'anim-out-popup');
  this.removeEventListener('animationend', resetPopup);
}
