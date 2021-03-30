/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  margin: 0;\n}\n\n#container {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n  background: rgb(185, 179, 179);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 1rem;\n}\n\n.taskform {\n  position: fixed;\n  background: rgb(129, 161, 126);\n  padding: 1rem;\n}\n\n.formwrapper {\n  display: flex;\n  flex-direction: column;\n}\n\n.navbar {\n  width: 80%;\n  height: 4rem;\n  background: black;\n  position: relative;\n}\n\n.plusbutton {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n\n.front {\n  width: 80%;\n  display: flex;\n  flex-direction: row;\n}\n\n.left {\n  list-style: none;\n  width: 25%;\n  background: rgb(231, 100, 100);\n  margin-right: 3%;\n}\n\n#projects {\n  width: 30%;\n  margin-block-start: 0;\n  margin-block-end: 0;\n  padding-inline-start: 0;\n}\n\n.project {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.project-btn {\n  height: 2rem;\n  width: 2rem;\n}\n\n.projecttext {\n  font-size: 1.1rem;\n  font-family: Arial, Helvetica, sans-serif;\n  width: 80%;\n  background: rgb(218, 154, 154);\n  padding: 0.5rem;\n  margin-left: 1rem;\n  margin-right: 1rem;\n}\n\n.middle {\n  width: 100%;\n  background: rgb(136, 123, 123);\n}\n\n#todos {\n  width: 100%;\n  background: rgb(136, 123, 123);\n}\n\n.todo {\n  border-bottom: 1px solid;\n}\n\n.iconify {\n  z-index: -10;\n}\n\n.todo-item {\n  height: inherit;\n  color: white;\n  font-family: Arial, Helvetica, sans-serif;\n  padding: 0.6rem;\n}\n\n.title {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n\n.project,\n.priority {\n  font-size: 0.8rem;\n}\n\n.description,\n.date {\n  font-size: 0.8rem;\n}\n\ntable,\nth,\ntd {\n  border-bottom: 1px solid black;\n}\n\n#calendar {\n  width: 170px;\n}\n\n.Mo,\n.Tu,\n.We,\n.Th,\n.Fr,\n.Sa,\n.Su {\n  width: 24px;\n  font-size: 8px;\n}\n\n.cell {\n  width: 24px;\n  height: 16px;\n  font-size: 8px;\n}\n\n.cell:focus {\n  background: rgb(76, 76, 201);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ taskformDiv)
/* harmony export */ });
/* harmony import */ var _calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


var createElem = function createElem(tag, name) {
  var elem = document.createElement(tag);
  elem.classList.add(name);
  elem.setAttribute('id', name);
  return elem;
};

var projects = function projects() {
  var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var projectsArr = arguments.length > 1 ? arguments[1] : undefined;

  if (i === projectsArr.length - 1) {
    return "<option value=\"".concat(projectsArr[projectsArr.length - 1], "\">").concat(projectsArr[projectsArr.length - 1], "</option>");
  }

  return "<option value=\"".concat(projectsArr[i], "\">").concat(projectsArr[i], "</option>").concat(projects(i + 1, projectsArr));
};

var projectSelect = createElem('select', 'project-select');

var priorities = function priorities() {
  var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var priorityArr = arguments.length > 1 ? arguments[1] : undefined;
  if (i === priorityArr.length - 1) return "<option value=\"".concat(priorityArr[priorityArr.length - 1], "\">").concat(priorityArr[priorityArr.length - 1], "</option>");
  return "<option value=\"".concat(priorityArr[i], "\">").concat(priorityArr[i], "</option>").concat(priorities(i + 1, priorityArr));
};

var prioritySelect = createElem('select', 'priority-select');
var titleElem = document.createElement('div');
titleElem.classList.add('titleElem');
titleElem.setAttribute('id', 'titleElem');
titleElem.innerHTML = '<input type="text" id="title" name="title" placeholder="Title"><br>';
var newProject = document.createElement('input');
newProject.classList.add('newproject');
newProject.setAttribute('id', 'newproject');
newProject.setAttribute('type', 'text');
newProject.placeholder = 'New Project';
var note = '<textarea id="note" class="note" placeholder="Write todo description"></textarea>';
var notediv = createElem('div', 'notediv');
notediv.innerHTML = note;
var addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task';

var taskformDiv = function taskformDiv(projectsArr, prioritiesArr) {
  projectSelect.innerHTML = projects(0, projectsArr);
  prioritySelect.innerHTML = priorities(0, prioritiesArr);
  var taskformDiv = createElem('div', 'taskform');
  var formWrapper = createElem('div', 'formwrapper');
  taskformDiv.appendChild(formWrapper);
  formWrapper.appendChild(titleElem);
  formWrapper.appendChild(projectSelect);
  formWrapper.appendChild(newProject);
  formWrapper.appendChild(prioritySelect);
  formWrapper.appendChild((0,_calendar__WEBPACK_IMPORTED_MODULE_0__.default)());
  formWrapper.appendChild(notediv);
  taskformDiv.appendChild(addTask);
  return taskformDiv;
};



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarDiv)
/* harmony export */ });
var createElem = function createElem(tag, name) {
  var elem = document.createElement(tag);
  elem.classList.add(name);
  elem.setAttribute('id', name);
  return elem;
};

var elems = function elems() {
  var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var optElem = arguments.length > 1 ? arguments[1] : undefined;
  var tag = arguments.length > 2 ? arguments[2] : undefined;
  if (i === optElem.length - 1) return "<".concat(tag, " value=\"").concat(optElem[optElem.length - 1], "\" id=\"").concat(optElem[optElem.length - 1], "\" class=\"").concat(optElem[optElem.length - 1], "\">").concat(optElem[optElem.length - 1], "</").concat(tag, ">");
  return "<".concat(tag, " value=\"").concat(optElem[i], "\" id=\"").concat(optElem[i], "\" class=\"").concat(optElem[i], "\">").concat(optElem[i], "</").concat(tag, ">").concat(elems(i + 1, optElem, tag));
};

var years = [2021, 2022, 2023, 2024, 2025];
var weeks = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var yearOptions = elems(0, years, 'option');
var monthOptions = elems(0, months, 'option');
var weekBtns = elems(0, weeks, 'button');
var selectYear = createElem('select', 'selectYear');
selectYear.innerHTML = yearOptions;
var selectMonth = createElem('select', 'selectMonth');
selectMonth.innerHTML = monthOptions;
var yearDiv = createElem('div', 'yearDiv');
yearDiv.appendChild(selectYear);
var monthDiv = createElem('div', 'monthDiv');
monthDiv.appendChild(selectMonth);
var weekDiv = createElem('div', 'weekDiv');
weekDiv.innerHTML = weekBtns;

var dateCells = function dateCells() {
  var dateStr = '';

  for (var i = 1; i <= 38; i += 1) {
    dateStr += "<button id=\"cell".concat(i, "\" class=\"cell\"></button>");
  }

  var dateDiv = createElem('div', 'dateDiv');
  dateDiv.setAttribute('value', '');
  dateDiv.innerHTML = dateStr;
  return dateDiv;
};

var calendarDiv = function calendarDiv() {
  var calendarDiv = createElem('div', 'calendar');
  calendarDiv.appendChild(yearDiv);
  calendarDiv.appendChild(monthDiv);
  calendarDiv.appendChild(weekDiv);
  calendarDiv.appendChild(dateCells());
  return calendarDiv;
};



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ taskFormEvent)
/* harmony export */ });
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _classes_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _listTodos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);





var taskFormEvent = function taskFormEvent() {
  var taskForm = document.getElementById('taskform');
  var title = document.querySelector('#title');
  var selectProject = document.querySelector('#project-select');
  var newProject = document.querySelector('#newproject');
  var selectPriority = document.querySelector('#priority-select');
  var dateDiv = document.getElementById('dateDiv');
  var noteText = document.getElementById('note');
  var taskObj = new _classes_todo__WEBPACK_IMPORTED_MODULE_1__.default();
  taskForm.addEventListener('click', function (event) {
    var elem = event.target;

    if (elem.classList.contains('tsk-btn')) {
      var titl = title.value;
      var date = dateDiv.value;
      var desc = noteText.value;
      var project = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectProject).value;
      var priority = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectPriority).value;
      taskObj.title = titl;
      taskObj.description = desc;
      taskObj.project = newProject.value === '' ? project : newProject.value;
      taskObj.priority = priority;
      taskObj.date = date;
      var todos = _classes_store__WEBPACK_IMPORTED_MODULE_2__.default.getTodos();
      var id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
      taskObj.id = id;
      _classes_store__WEBPACK_IMPORTED_MODULE_2__.default.addTodo(taskObj);
      var tods = document.getElementById('todos');
      tods.innerHTML = '';
      (0,_listTodos__WEBPACK_IMPORTED_MODULE_3__.default)(_classes_store__WEBPACK_IMPORTED_MODULE_2__.default.getTodos());
      taskForm.remove();
      document.querySelector('#plusbutton').textContent = '+';
    }
  });
};



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSelectedOption)
/* harmony export */ });
function getSelectedOption(sel) {
  var opt;

  for (var i = 0, len = sel.options.length; i < len; i += 1) {
    opt = sel.options[i];

    if (opt.selected === true) {
      break;
    }
  }

  return opt;
}



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function Todo(id, title, description, date, priority, project) {
  _classCallCheck(this, Todo);

  this.title = title;
  this.description = description;
  this.priority = priority;
  this.project = project;
  this.date = date;
  this.id = id;
};



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Store)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);
  }

  _createClass(Store, null, [{
    key: "getTodos",
    value: function getTodos() {
      var todos;

      if (localStorage.getItem('todos') === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem('todos'));
      }

      return todos;
    }
  }, {
    key: "addTodo",
    value: function addTodo(todo) {
      var todos = Store.getTodos();
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, {
    key: "removeTodo",
    value: function removeTodo(id) {
      var todos = Store.getTodos();
      todos.forEach(function (todo, index) {
        if (todo.id === id) {
          todos.splice(index, 1);
        }
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, {
    key: "editTodo",
    value: function editTodo(title, description, date, priority, project) {
      var todos = Store.getBooks();
      todos.forEach(function (todo) {
        if (todo.priority === priority) {
          todo.title = title;
          todo.description = description;
          todo.date = date;
          todo.priority = priority;
          todo.project = project;
        }
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }]);

  return Store;
}();



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listTodos)
/* harmony export */ });
/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


function listTodos(todos) {
  todos.forEach(function (todoObj) {
    return (0,_todos__WEBPACK_IMPORTED_MODULE_0__.default)(todoObj, '#todos');
  });
}



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ appendTodo)
/* harmony export */ });
function appendTodo(todoObj, todosId) {
  var todos = document.querySelector(todosId);
  var todo = document.createElement('tr');
  todo.classList.add('todo');
  todo.setAttribute('id', 'todo');
  todo.setAttribute('value', todoObj.id);
  todos.appendChild(todo);
  var title = document.createElement('td');
  title.classList.add('todo-item');
  title.classList.add('title');
  title.textContent = todoObj.title;
  var description = document.createElement('td');
  description.classList.add('todo-item');
  description.classList.add('description');
  description.textContent = todoObj.description;
  var priority = document.createElement('td');
  priority.classList.add('todo-item');
  priority.classList.add('priority');
  priority.textContent = todoObj.priority;

  if (priority.textContent === 'High') {
    priority.style.background = 'red';
  } else if (priority.textContent === 'Medium') {
    priority.style.background = 'green';
  } else {
    priority.style.background = 'brown';
  }

  var project = document.createElement('td');
  project.classList.add('todo-item');
  project.classList.add('project');
  project.textContent = todoObj.project;
  var date = document.createElement('td');
  date.classList.add('todo-item');
  date.classList.add('date');
  date.textContent = todoObj.date;
  var buttontd = document.createElement('td');
  buttontd.classList.add('del-todo');
  var button = document.createElement('button');
  button.textContent = 'Remove';
  button.setAttribute('type', 'click');
  button.innerText = 'delete';
  buttontd.classList.add('btn');
  buttontd.appendChild(button);
  todo.appendChild(title);
  todo.appendChild(description);
  todo.appendChild(priority);
  todo.appendChild(project);
  todo.appendChild(date);
  todo.appendChild(buttontd);
}



/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeTodo)
/* harmony export */ });
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


function removeTodo() {
  document.querySelector('#todos').addEventListener('click', function (e) {
    var btn = e.target;

    if (btn.parentElement.classList.contains('del-todo')) {
      var todo = btn.parentElement.parentElement;
      var todoId = todo.getAttribute('value');
      todo.remove();
      _classes_store__WEBPACK_IMPORTED_MODULE_0__.default.removeTodo(parseInt(todoId, 10));
    }
  });
}



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarEvent)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);




var calendarEvent = function calendarEvent() {
  var selectMonth = document.getElementById('selectMonth');
  var selectYear = document.getElementById('selectYear');
  selectMonth.addEventListener('change', function (event) {
    var month = event.target.value;
    var year = (0,_getoption__WEBPACK_IMPORTED_MODULE_1__.default)(selectYear).value;
    var calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_0__.default(year, month);
    (0,_fillCells__WEBPACK_IMPORTED_MODULE_2__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
  });
  selectYear.addEventListener('change', function (event) {
    var year = event.target.value;
    var month = (0,_getoption__WEBPACK_IMPORTED_MODULE_1__.default)(selectMonth).value;
    var calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_0__.default(year, month);
    (0,_fillCells__WEBPACK_IMPORTED_MODULE_2__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
  });
};



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Calendar)
/* harmony export */ });
function Calendar(year, month) {
  var _this = this;

  this.year = year;
  this.month = month;

  this.dayone = function () {
    var centuryone = 2;
    var year0Index = year - 1901;
    var leapshift = (year0Index - year0Index % 4) / 4;
    var shift = centuryone + year0Index;
    return (shift + leapshift) % 7;
  };

  this.monthObj = function () {
    var dayone = _this.dayone();

    return {
      January: [31, dayone],
      February: [year % 4 === 0 ? 29 : 28, (dayone + 3) % 7],
      March: [31, year % 4 === 0 ? (dayone + 4) % 7 : (dayone + 3) % 7],
      April: [30, year % 4 === 0 ? dayone : (dayone + 6) % 7],
      May: [31, year % 4 === 0 ? (dayone + 2) % 7 : (dayone + 1) % 7],
      June: [30, year % 4 === 0 ? (dayone + 5) % 7 : (dayone + 4) % 7],
      July: [31, year % 4 === 0 ? dayone : (dayone + 6) % 7],
      August: [31, year % 4 === 0 ? (dayone + 3) % 7 : (dayone + 2) % 7],
      September: [30, year % 4 === 0 ? (dayone + 6) % 7 : (dayone + 5) % 7],
      October: [31, year % 4 === 0 ? (dayone + 1) % 7 : dayone],
      November: [30, year % 4 === 0 ? (dayone + 4) % 7 : (dayone + 3) % 7],
      December: [31, year % 4 === 0 ? (dayone + 6) % 7 : (dayone + 5) % 7]
    };
  };

  this.monthInfo = function () {
    return _this.monthObj()[month];
  };

  this.start = function () {
    return _this.monthInfo()[1];
  };

  this.monthDays = function () {
    return _this.monthInfo()[0];
  };
}



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fillCells)
/* harmony export */ });
var fillCells = function fillCells(start, len, dateDivId) {
  var dateDiv = document.getElementById(dateDivId);
  var dateCells = dateDiv.childNodes;

  for (var i = 1; i <= 38; i += 1) {
    var fill = i > start && i <= start + len ? i - start : '';
    dateCells[i - 1].innerText = fill;
  }
};



/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listProjects)
/* harmony export */ });
function appendProject(projectObj, projectsId) {
  var projects = document.querySelector(projectsId);
  var project = document.createElement('li');
  project.classList.add('project');
  project.setAttribute('id', 'project');
  var projectText = document.createElement('h1');
  projectText.getAttribute('id', 'projecttext');
  projectText.classList.add('projecttext');
  projectText.setAttribute('type', 'click');
  projectText.textContent = "".concat(projectObj);
  var projectbtn = document.createElement('button');
  projectbtn.classList.add('project-btn');
  projectbtn.setAttribute('type', 'click');
  projectbtn.textContent = 'X';
  project.appendChild(projectText);
  project.appendChild(projectbtn);
  projects.appendChild(project);
}

function listProjects(projects) {
  projects.forEach(function (project) {
    return appendProject(project, '#projects');
  });
}



/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ date)
/* harmony export */ });
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


var date = function date() {
  var selectMonth = document.getElementById('selectMonth');
  var selectYear = document.getElementById('selectYear');
  var dateBtn = document.getElementById('dateDiv');
  dateBtn.getAttribute('name', 'datediv');
  var dateVal = {
    year: '',
    month: '',
    day: ''
  };
  dateBtn.addEventListener('click', function (event) {
    var elem = event.target;

    if (elem.classList.contains('cell') && elem.innerText !== '') {
      var month = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectMonth).value;
      var year = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectYear).value;
      dateVal.day = elem.innerText;
      dateVal.month = month;
      dateVal.year = year;
      dateBtn.value = "".concat(dateVal.day, "-").concat(dateVal.month, "-").concat(dateVal.year);
    }
  });
};



/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeProject)
/* harmony export */ });
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);



function removeProject() {
  document.querySelector('#projects').addEventListener('click', function (e) {
    var btn = e.target;

    if (btn.classList.contains('project-btn')) {
      var project = btn.parentElement;
      var projectName = project.childNodes[0].textContent;
      var projectTodos = _classes_filter__WEBPACK_IMPORTED_MODULE_1__.default.byProject(projectName);

      for (var i = 0; i < projectTodos.length; i += 1) {
        _classes_store__WEBPACK_IMPORTED_MODULE_0__.default.removeTodo(projectTodos[i].id);
      }

      project.remove();
    }
  });
}



/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Filter)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _timenow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Filter = /*#__PURE__*/function () {
  function Filter() {
    _classCallCheck(this, Filter);
  }

  _createClass(Filter, null, [{
    key: "allProjects",
    value: function allProjects() {
      var todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
      var allProjects = todos.map(function (todo) {
        return todo.project;
      });
      allProjects.push('Home');
      allProjects.push('Work');
      allProjects.push('Exercise');
      var unqPrjcts = allProjects.filter(function (item, i, allProjects) {
        return allProjects.indexOf(item) === i;
      });
      return unqPrjcts;
    }
  }, {
    key: "byProject",
    value: function byProject(project) {
      var todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
      var todosOfProject = todos.filter(function (todo) {
        return todo.project === project;
      });
      return todosOfProject;
    }
  }, {
    key: "byToday",
    value: function byToday() {
      var todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
      var toDate = (0,_timenow__WEBPACK_IMPORTED_MODULE_1__.default)().split('/');
      var todayStr = "".concat(toDate[2] - toDate[1] - toDate[0]);
      var todosOfToday = todos.filter(function (todo) {
        return todo.date === todayStr;
      });
      return todosOfToday;
    }
  }, {
    key: "byPriority",
    value: function byPriority(priority) {
      var todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
      var todosOfPriority = todos.map(function (todo) {
        return todo.priority === priority;
      });
      return todosOfPriority;
    }
  }]);

  return Filter;
}();



/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDay)
/* harmony export */ });
var toDay = function toDay() {
  var newDate = new Date();
  return "".concat((newDate.getDate() < 10 ? '0' : '') + newDate.getDate(), "/").concat(newDate.getMonth() + 1 < 10 ? '0' : '').concat(newDate.getMonth() + 1, "/").concat(newDate.getFullYear());
};



/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showProject)
/* harmony export */ });
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _listTodos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);



function showProject() {
  document.querySelector('#projects').addEventListener('click', function (e) {
    var btn = e.target;

    if (btn.classList.contains('projecttext')) {
      var tods = document.getElementById('todos');
      tods.innerHTML = '';
      (0,_listTodos__WEBPACK_IMPORTED_MODULE_1__.default)(_classes_filter__WEBPACK_IMPORTED_MODULE_0__.default.byProject(btn.textContent));
    }
  });
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _views1_taskform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _views1_taskformevent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _views1_listTodos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _views1_removeTodoEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _views1_calevent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _views1_left__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var _views1_dateClickEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _views1_removeProject__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(20);
/* harmony import */ var _views1_fillCells__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16);
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(15);
/* harmony import */ var _views1_projectEvent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22);














var container = document.getElementById('container');
var navBar = document.createElement('navbar');
navBar.classList.add('navbar');
container.appendChild(navBar);
var plusButton = document.createElement('button');
plusButton.type = 'click';
plusButton.classList.add('plusbutton');
plusButton.setAttribute('id', 'plusbutton');
plusButton.textContent = '+';
navBar.appendChild(plusButton);
var projectsArr = _classes_filter__WEBPACK_IMPORTED_MODULE_10__.default.allProjects();
var prioritiesArr = ['High', 'Medium', 'Low'];
container.addEventListener('click', function (e) {
  var elem = e.target;
  var form = document.querySelector('#taskform');

  if (elem.classList.contains('plusbutton')) {
    if (form != null) {
      form.remove();
      elem.textContent = '+';
    } else {
      container.appendChild((0,_views1_taskform__WEBPACK_IMPORTED_MODULE_1__.default)(projectsArr, prioritiesArr));
      (0,_views1_taskformevent__WEBPACK_IMPORTED_MODULE_2__.default)();
      (0,_views1_calevent__WEBPACK_IMPORTED_MODULE_6__.default)();
      (0,_views1_dateClickEvent__WEBPACK_IMPORTED_MODULE_8__.default)();
      var calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_12__.default(2021, 'January');
      (0,_views1_fillCells__WEBPACK_IMPORTED_MODULE_11__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
      elem.textContent = '-';
    }
  }
});
var front = document.createElement('div');
front.classList.add('front');
front.getAttribute('id', 'front');
container.appendChild(front);
var leftDiv = document.createElement('ul');
leftDiv.classList.add('left');
leftDiv.setAttribute('id', 'projects');
front.appendChild(leftDiv);
(0,_views1_left__WEBPACK_IMPORTED_MODULE_7__.default)(projectsArr);
(0,_views1_removeProject__WEBPACK_IMPORTED_MODULE_9__.default)();
var middle = document.createElement('div');
middle.classList.add('middle');
var todoDiv = document.createElement('div');
todoDiv.setAttribute('id', 'todos');
middle.appendChild(todoDiv);
front.appendChild(middle);
(0,_views1_listTodos__WEBPACK_IMPORTED_MODULE_3__.default)(_classes_store__WEBPACK_IMPORTED_MODULE_4__.default.getTodos());
(0,_views1_removeTodoEvent__WEBPACK_IMPORTED_MODULE_5__.default)();
(0,_views1_projectEvent__WEBPACK_IMPORTED_MODULE_13__.default)();
})();

/******/ })()
;