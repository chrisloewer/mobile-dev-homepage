
// ------------------------------------- OBSERVER STRUCTURE ---------------------------------------- //

// SUBJECT BASE CLASS
// Controller will expand on this base
function Subject () {
  this._observerList = [];
}

Subject.prototype.attachObserver = function(observer) {
  // console.log(observer + ' is now an observer of Subject');
  this._observerList.push(observer);
};

Subject.prototype.detachObserver = function(observer) {
  var len = this._observerList.length;
  for (var i= 0; i<len; i++) {
    if (this._observerList[i] === observer) {
      this._observerList.splice(i,1);
      // console.log(observer + ' is no longer an observer of Subject');
      return true;
    }
  }
  // else observer not in list
  return false;
};

Subject.prototype.updateObservers = function(args) {
  if(args === void 0) {
    args = {};
  }

  var len = this._observerList.length;
  for (var i= 0; i<len; i++) {
    this._observerList[i].update(args);
  }
};


// OBSERVER BASE CLASS
// Each component will expand on this base
function Observer() {}

Observer.prototype.toString = function() {
  return 'Basic Observer';
};

Observer.prototype.update = function(args) {
  if(args === void 0) {
    args = {};
  }

  console.log('Generic Observer update called');
  // console.log(JSON.stringify(args));
};


// -------------------------------------  OBSERVER IMPLEMENTATION ------------------------------------- //

// Controller will serve as the central point of contact, updating components
function Controller() {
  var subject = new Subject();

  this.attachObserver = function attachObserver(observer) {
    subject.attachObserver(observer);
  };

  this.detachObserver = function detachObserver(observer) {
    subject.detachObserver(observer);
  };

  this.updateObservers = function update(args) {
    if(args === void 0) {
      args = {};
    }
    subject.updateObservers(args);
  };
}


// ------------------------------------- INITIALIZE PAGE -------------------------------------------- //

var controller = new Controller();
var storageComponent = new Observer();
var listComponent = new Observer();
var profileComponent = new Observer();

window.onload = function() {

  if(localStorage.loggedIn != 'true') {
    window.location.href = 'index.html';
  }
  document.getElementById('log_out_button').addEventListener('click', function() {
    localStorage.loggedIn = 'false';
    window.location.href = 'index.html';
  });

  controller.attachObserver(storageComponent);
  controller.attachObserver(listComponent);
  controller.attachObserver(profileComponent);

  // get stored data, if any exists, otherwise load as normal
  if( !storageComponent.updateController() ) {
    controller.updateObservers();
  }
};

// ------------------------------------- LIST COMPONENT --------------------------------------------- //

(function() {

  // Initialize
  var list = [];

  // Elements
  var textField;
  var editField;
  var listContainer;

  function init() {
    textField = document.getElementById('text_field');
    editField = document.getElementById('edit_field');
    listContainer = document.getElementById('list_container');

    document.getElementById('add_button').addEventListener('click', addItem);
    document.getElementById('edit_button').addEventListener('click', editItem);
    document.getElementById('delete_button').addEventListener('click', deleteItem);
  }

  function addItem() {
    if(textField.value == '') { return false; }

    list.push(textField.value);
    textField.value = '';

    controller.updateObservers({
      'list': list
    });
  }

  function editItem() {
    if(editField.value == '' || editField.dataset.num == null) { return false; }

    list[editField.dataset.num] = editField.value;
    editField.value = '';
    hidePopup('pg_edit');

    controller.updateObservers({
      'list': list
    });
  }

  function deleteItem() {
    if(editField.dataset.num == null) { return false; }

    list.splice(editField.dataset.num, 1);
    editField.value = '';
    hidePopup('pg_edit');

    controller.updateObservers({
      'list': list
    });
  }

  function redraw() {
    removeChildNodes(listContainer);

    // List is already updated to new list at this point
    // Create item for each entry in list
    for(var i=0; i<list.length; i++) {
      var itemDiv = document.createElement('div');
      addClass(itemDiv, 'item');
      itemDiv.dataset.num = i;

      var contentDiv = document.createElement('div');
      addClass(contentDiv, 'content');
      contentDiv.appendChild( document.createTextNode(list[i]) );

      itemDiv.appendChild(contentDiv);
      listContainer.insertBefore(itemDiv, listContainer.childNodes[0]);

      itemDiv.onclick = function () {
        var index = this.dataset.num;
        editField.dataset.num = index;
        editField.value = list[index];
        showPopup('pg_edit');
      };
    }
  }

  // OBSERVER functions
  listComponent.toString = function () {
    return 'listComponent Observer';
  };

  listComponent.update = function (args) {
    if (args === void 0) {
      args = {};
    }

    init();
    if (args.list != null) {
      list = args.list;
      redraw();
    }
    else {
      list = [];
      console.log('List not updated.');
    }

    return true;
  };

  listComponent.updateController = function () {
    var args = {
      'list': list
    };
    controller.updateObservers(args);
  };

})();


// ------------------------------------- STORAGE COMPONENT ------------------------------------------ //

(function() {

  // OBSERVER functions
  storageComponent.toString = function() {
    return 'storageComponent Observer';
  };

  storageComponent.update = function(args) {
    if (args === void 0) {
      args = {};
    }

    if(args.list) {
      localStorage.setItem('list', JSON.stringify(args.list));
    }
    if(args.user) {
      localStorage.setItem('user', args.user);
    }
    if(args.password) {
      localStorage.setItem('password', args.password);
    }
  };

  // Used to let controller know stored values
  storageComponent.updateController = function() {
    try {
      var data = {
        'list': JSON.parse(localStorage.getItem('list')),
        'user': localStorage.getItem('user'),
        'password': localStorage.getItem('password')
       };
      if (data) {
        controller.updateObservers(data);
        return true;
      }
    }
    catch (e) {
      console.log('Could not get local storage: ' + e)
    }

    return false;
  }

})();


// ------------------------------------- PROFILE COMPONENT ------------------------------------------ //

(function() {

  var user;
  var password;

  function init() {
    document.getElementById('update_profile_button').addEventListener('click', updateProfile);
  }

  function updateProfile() {
    hidePage('pg_profile');
    profileComponent.updateController();
  }

  profileComponent.toString = function() {
    return 'profileComponent Observer';
  };

  profileComponent.update = function(args) {
    if (args === void 0) {
      args = {};
    }

    init();

    user = args.user != null ? args.user : 'Default';
    password = args.password != null ? args.password : '4569';

    document.getElementById('usr_name').value = user;
    document.getElementById('usr_password').value = password;
  };

  profileComponent.updateController = function () {
    var data = {
      'user': document.getElementById('usr_name').value,
      'password': document.getElementById('usr_password').value
    };
    controller.updateObservers(data);
  };

})();
