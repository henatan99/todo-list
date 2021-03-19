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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0;    \n}\n\n#container {\n    position: relative;\n    width: 100%;\n    height: 100vh;\n    background: rgb(185, 179, 179);\n    /* overflow-y: scroll; */\n    display: flex;\n    flex-direction: column;\n    /* justify-content: center; */\n    align-items: center;\n    padding-top: 1rem;\n}\n\n.taskform {\n    position: fixed;\n    background: rgb(129, 161, 126);    \n    padding: 1rem;\n}\n.formwrapper {\n    /* display: none; */\n    display: flex;\n    flex-direction: column;\n}\n\n.navbar {\n    width: 60%;\n    height: 4rem;\n    background: black;\n    position: relative;\n}\n\n.plusbutton {\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.front {\n    width: 60%;\n    display: flex;\n    flex-direction: row;\n}\n\n.left {\n    list-style: none;\n    width: 25%;\n    background: rgb(231, 100, 100);\n    margin-right: 3%;\n}\n\n#projects {\n    width: 72%;\n    margin-block-start: 0em;\n    margin-block-end: 0em;\n   \n    padding-inline-start: 0;\n}\n\n.project {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n}\n\n.project-btn {\n    height: 2rem;\n    width: 2rem;\n}\n\n.projecttext {\n    font-size: 1.5rem;\n    font-family: Arial, Helvetica, sans-serif;\n    width: 80%;\n    background: rgb(218, 154, 154);\n}\n\n.middle {\n    width: 100%;\n    background: rgb(136, 123, 123);\n}\n\n#todos {\n    width: 100%;\n    background: rgb(136, 123, 123);\n}\n\n.todo {\n    border-bottom: 1px solid;\n}\n\n.iconify {\n    z-index: -10;\n}\n\n.todo-item {\n    color: white;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 1.2rem;\n    padding: 1rem;\n}\n\n#calendar {\n    width: 130px;\n}\n\n.Mo, .Tu, .We, .Th, .Fr, .Sa, .Su {\n    width: 18px;\n    font-size: 8px;\n}\n\n.cell {\n    width: 18px;\n    height: 18px;\n    font-size: 8px;\n}", ""]);
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
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);



const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const projects = (i=1, projectsArr) => {
    if (i == projectsArr.length) {
        return `<option value="${projectsArr[projectsArr.length-1]}">${projectsArr[projectsArr.length-1]}</option>`;
    } 
    return `<option value="${projectsArr[i]}">${projectsArr[i]}</option>` + projects(i+1, projectsArr);    
}

const projectSelect = createElem('select', 'project-select');

const priorities = (i=1, priorityArr) => {
    if (i == priorityArr.length) return `<option value="${priorityArr[priorityArr.length-1]}">${priorityArr[priorityArr.length-1]}</option>`;
    return `<option value="${priorityArr[i]}">${priorityArr[i]}</option>` + priorities(i+1, priorityArr);    
}

const prioritySelect = createElem('select', 'priority-select');

const titleElem = document.createElement('div');
titleElem.classList.add('titleElem');
titleElem.setAttribute('id', 'titleElem');

titleElem.innerHTML = '<input type="text" id="title" name="title" placeholder="Title"><br>';



const newProject = document.createElement('input');
newProject.classList.add('newproject');
newProject.setAttribute('id', 'newproject');
newProject.setAttribute('type', 'text');
newProject.placeholder = 'New Project';

const note = '<textarea id="note" class="note" placeholder="Write todo description"></textarea>'
const notediv = createElem('div', 'notediv');
notediv.innerHTML = note;    


const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task'; 

const taskformDiv = (projectsArr, prioritiesArr) => {
    projectSelect.innerHTML = projects(1, projectsArr);
    prioritySelect.innerHTML = priorities(1, prioritiesArr);

    const taskformDiv = createElem('div', 'taskform');
    const formWrapper = createElem('div', 'formwrapper');
    taskformDiv.appendChild(formWrapper);
    
    formWrapper.appendChild(titleElem);
    formWrapper.appendChild(projectSelect);
    formWrapper.appendChild(newProject);
    formWrapper.appendChild(prioritySelect);
    formWrapper.appendChild((0,_calendar__WEBPACK_IMPORTED_MODULE_0__.default)());
    formWrapper.appendChild(notediv);

    
    taskformDiv.appendChild(addTask);
    
    
    return taskformDiv;
}




/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarDiv)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _classes_timenow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);





const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const elems = (i=0, optElem, tag) => {
    if (i == optElem.length - 1) return `<${tag} value="${optElem[optElem.length - 1]}" id="${optElem[optElem.length - 1]}" class="${optElem[optElem.length - 1]}">${optElem[optElem.length - 1]}</${tag}>`;
    return `<${tag} value="${optElem[i]}" id="${optElem[i]}" class="${optElem[i]}">${optElem[i]}</${tag}>` + elems(i+1, optElem, tag);
}

const years = [2021, 2022, 2023, 2024, 2025];
const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const yearOptions = elems(0, years, 'option');
const monthOptions = elems(0, months, 'option');
const weekBtns = elems (0, weeks, 'button');


const selectYear = createElem('select', 'selectYear');
selectYear.innerHTML = yearOptions;
const selectMonth = createElem('select', 'selectMonth');
selectMonth.innerHTML = monthOptions;

const yearDiv = createElem('div', 'yearDiv');
yearDiv.appendChild(selectYear);
const monthDiv = createElem('div', 'monthDiv');
monthDiv.appendChild(selectMonth);
const weekDiv = createElem('div', 'weekDiv');
weekDiv.innerHTML = weekBtns;

const dateCells = () => {    
    let dateStr = '';
    for(let i=1; i <= 38; i+=1) {
        dateStr += `<button id="cell${i}" class="cell"></button>`;
    }
    const dateDiv = createElem('div', 'dateDiv');
    dateDiv.setAttribute('value', '');
    dateDiv.innerHTML = dateStr;
    return dateDiv;
}

const calendarDiv = () => {
    const calendarDiv = createElem('div', 'calendar');
    calendarDiv.appendChild(yearDiv);
    calendarDiv.appendChild(monthDiv);
    calendarDiv.appendChild(weekDiv);
    calendarDiv.appendChild(dateCells());
    
    return calendarDiv;
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Calendar)
/* harmony export */ });
function Calendar(year, month) {
  this.year = year;
  this.month = month;
  this.dayone = () => {    
    const centuryone = 2;    
    const year0Index = year -1901;
    const leapshift = (year0Index - (year0Index % 4)) / 4;
    // 1753 -  Chesterfield's Act (1752)
    const shift = centuryone + year0Index;
    return (shift + leapshift) % 7;
  };
  this.monthObj = () => {
    let dayone = this.dayone();
    return {
      'January': [31, dayone],
      'February': [year % 4 == 0 ? 29 : 28, (dayone + 3) % 7],
      'March': [31, year % 4 == 0 ? (dayone + 4) % 7 : (dayone + 3) % 7],
      'April': [30, year % 4 == 0 ? dayone : (dayone + 6) % 7],
      'May': [31, year % 4 == 0 ? (dayone + 2) % 7 : (dayone + 1) % 7],
      'June': [30, year % 4 == 0 ? (dayone + 5) % 7 : (dayone + 4) % 7],
      'July': [31, year % 4 == 0 ? dayone : (dayone + 6) % 7],
      'August': [31, year % 4 == 0 ? (dayone + 3) % 7 : (dayone + 2) % 7],
      'September': [30, year % 4 == 0 ? (dayone + 6) % 7 : (dayone + 5) % 7],
      'October': [31, year % 4 == 0 ? (dayone + 1) % 7 : dayone],
      'November': [30, year % 4 == 0 ? (dayone + 4) % 7 : (dayone + 3) % 7],
      'December': [31, year % 4 == 0 ? (dayone + 6) % 7 : (dayone + 5) % 7],
    };
  };

  this.monthInfo = () => {
    return this.monthObj()[month];
  };

  this.start = () => {
    return this.monthInfo()[1];
  };

  this.monthDays = () => {
    return this.monthInfo()[0];
  };
}






/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSelectedOption)
/* harmony export */ });
function getSelectedOption(sel) {
    var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
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
/* harmony export */   "default": () => (/* binding */ fillCells)
/* harmony export */ });
const fillCells = (start, len, dateDivId) => {
    let dateDiv = document.getElementById(dateDivId);
    let dateCells = dateDiv.childNodes;
    for(let i=1; i <= 38; i+=1) {
        let fill = (i > start && i <= (start + len)) ? i - start : '';
        dateCells[i-1].innerText = fill;
    }
}



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDay)
/* harmony export */ });
// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

const toDay = () => {
    var newDate = new Date();
    var datetime = newDate.today();
    return datetime;
}

 



/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ taskFormEvent)
/* harmony export */ });
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _classes_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _listTodos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);





const taskFormEvent = () => {
    const taskForm = document.getElementById("taskform");
    const formWraper = document.getElementById("formwrapper");
    let title = document.querySelector('#title');
    let selectProject = document.querySelector('#project-select');
    let newProject = document.querySelector('#newproject');
    let selectPriority = document.querySelector('#priority-select');
    let dateDiv = document.getElementById("dateDiv"); 
    let noteText = document.getElementById("note");
   
    const taskObj = new _classes_todo__WEBPACK_IMPORTED_MODULE_1__.default();


    selectMonth.addEventListener('change', (event) => {        
        const proj = event.target.value;
        const projSel = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(proj).value;
        
        if (projSel.textContent == 'New') {
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'text');
        }
    });

    taskForm.addEventListener('click', (event) => {
        const elem = event.target;
        if(elem.classList.contains('tsk-btn')) {
            // alert('Task button clicked');          

            let titl = title.value;
            let date = dateDiv.value;
            let desc = noteText.value;
            let project = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectProject).value;
            // let newProjectVal = newProject.textContent;
            let priority = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectPriority).value;
            taskObj.title = titl;
            taskObj.description = desc;
            taskObj.project = newProject.value == '' ? project : newProject.value;
            alert(`input: ${newProject.textContent} and ${taskObj.project}`);            
            taskObj.priority = priority;
            taskObj.date = date;
            let todos = _classes_store__WEBPACK_IMPORTED_MODULE_2__.default.getTodos();
            let id = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
            taskObj.id = id;            
            _classes_store__WEBPACK_IMPORTED_MODULE_2__.default.addTodo(taskObj);

            let tods = document.getElementById("todos");
            tods.innerHTML = '';
        
            (0,_listTodos__WEBPACK_IMPORTED_MODULE_3__.default)(_classes_store__WEBPACK_IMPORTED_MODULE_2__.default.getTodos());
            taskForm.remove();
        }
    });
}



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);

class Todo {
    constructor(id, title, description, date, priority, project) {
        this.title = title;
        this.description = description;        
        this.priority = priority;
        this.project = project;
        this.date = date;
        this.id = id;        
    }
}



/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Store)
/* harmony export */ });
class Store {
    static getTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
          todos = [];
        } else {
          todos = JSON.parse(localStorage.getItem('todos'));
        }   
        return todos;
    }

    static addTodo(todo) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodo(id) {
        const todos = Store.getTodos();
        todos.forEach((todo, index) => {
          if (todo.id == id) {
            todos.splice(index, 1);
          }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static editTodo(title, description, date, priority, project) {
        const todos = Store.getBooks();
        books.forEach((todo) => {
          if (todo.priority === priority) {
            todo.title = title;
            todo.description = description;
            todo.date = date;         
            todo.priority = priority;
            todo.project = project; 
          }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    static clearTodo() {
      let todos = Store.getTodos();
    }

}



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listTodos)
/* harmony export */ });
/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


// const todosDiv = document.createElement('div');
// todosDiv.setAttribute('id', 'todos');

function listTodos(todos) {
    todos.forEach((todoObj) => (0,_todos__WEBPACK_IMPORTED_MODULE_0__.default)(todoObj, '#todos'));    
}



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ appendTodo)
/* harmony export */ });
function appendTodo(todoObj, todosId) {
    const todos = document.querySelector(todosId);    

    // creating nodes
    const todo = document.createElement('tr');
    todo.classList.add('todo');
    todo.setAttribute('id', 'todo');
    todo.setAttribute('value', todoObj.id);
  
    // rendering node 'tr'
    todos.appendChild(todo);
  
    // creating nodes 'td'

    const title = document.createElement('td');
    title.classList.add('todo-item');
    title.textContent = todoObj.title;
  
    const description = document.createElement('td');
    description.classList.add('todo-item');
    description.textContent = todoObj.description;
  
    const priority = document.createElement('td');
    priority.classList.add('todo-item');
    priority.textContent = todoObj.priority;
  
    const project = document.createElement('td');
    project.classList.add('todo-item');
    project.textContent = todoObj.project;
  
    const date = document.createElement('td');
    date.classList.add('todo-item');
    date.textContent = todoObj.date;
    
  
    // create the delete button in each book row
    const buttontd = document.createElement('td');
    buttontd.classList.add('del-todo');
  
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.setAttribute('type', 'click');
    button.innerText = 'T';
    buttontd.classList.add('btn');

  
    buttontd.appendChild(button);
    // rendering nodes 'td'
  
    todo.appendChild(title);
    todo.appendChild(description);
    todo.appendChild(priority);
    todo.appendChild(project);
    todo.appendChild(date);
    todo.appendChild(buttontd);
}



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeTodo)
/* harmony export */ });
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);

function removeTodo() {
    document.querySelector('#todos').addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.parentElement.classList.contains('del-todo')) {
            const todo = btn.parentElement.parentElement;            
            let todoId = todo.getAttribute('value');

            todo.remove();
            _classes_store__WEBPACK_IMPORTED_MODULE_0__.default.removeTodo(parseInt(todoId));           
        }
    });
}




/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarEvent)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




const calendarEvent = () => {
    const selectMonth = document.getElementById("selectMonth");
    const selectYear = document.getElementById("selectYear");
    
    selectMonth.addEventListener('change', (event) => {        
        const month = event.target.value;
        const year = (0,_getoption__WEBPACK_IMPORTED_MODULE_1__.default)(selectYear).value;
        const calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_0__.default(year, month);
        const fillcells = (0,_fillCells__WEBPACK_IMPORTED_MODULE_2__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
    });

    selectYear.addEventListener('change', (event) => {        
        const year = event.target.value;
        const month = (0,_getoption__WEBPACK_IMPORTED_MODULE_1__.default)(selectMonth).value;
        const calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_0__.default(year, month);
        const fillcells = (0,_fillCells__WEBPACK_IMPORTED_MODULE_2__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
    });
}




/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listProjects)
/* harmony export */ });
function appendProject(projectObj, projectsId) {
    const projects = document.querySelector(projectsId); 
    
    const project = document.createElement('li');
    project.classList.add('project');
    project.setAttribute('id', 'project');
    
    const projectText = document.createElement('h1');
    projectText.getAttribute('id', 'projecttext');
    projectText.classList.add('projecttext');
    projectText.setAttribute('type', 'click');


    projectText.textContent = `${projectObj}`;
    
    const projectbtn = document.createElement('button');
    projectbtn.classList.add('project-btn');
    projectbtn.setAttribute('type', 'click');
    projectbtn.textContent='X';

    project.appendChild(projectText);
    project.appendChild(projectbtn);

    projects.appendChild(project);  
}



function listProjects(projects) {
    projects.forEach((project) => appendProject(project, '#projects'));
    
}



/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ date)
/* harmony export */ });
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);



const date = () => {
    const selectMonth = document.getElementById("selectMonth");
    const selectYear = document.getElementById("selectYear");
    const dateBtn = document.getElementById("dateDiv");
    dateBtn.getAttribute('name', 'datediv');

    const dateVal = {'year': '', 'month': '', 'day': ''};
    dateBtn.addEventListener('click', (event) => {       
        const elem = event.target;
        if (elem.classList.contains('cell') && elem.innerText != '') {
            const month = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectMonth).value;
            const year = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectYear).value;
            dateVal['day'] = elem.innerText;
            dateVal['month'] = month;
            dateVal['year'] = year;
            dateBtn.value = `${dateVal['day']}-${dateVal['month']}-${dateVal['year']}`;
            alert(dateBtn.value);                                  
        }        
    });    
}



/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeProject)
/* harmony export */ });
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);



function removeProject() {
    document.querySelector('#projects').addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.classList.contains('project-btn')) {
            const project = btn.parentElement;            
            // let todoId = todo.getAttribute('value');
            const projectName = project.childNodes[0].textContent;
            let projectTodos = _classes_filter__WEBPACK_IMPORTED_MODULE_1__.default.byProject(projectName);
            alert(projectTodos);
            alert(project.childNodes[0]);
            alert(projectName);
            // alert(todoId);            
            for (let i=0; i<projectTodos.length; i+=1) {                
                _classes_store__WEBPACK_IMPORTED_MODULE_0__.default.removeTodo(projectTodos[i].id);             
            }
            project.remove();              
        }
    });
}




/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Filter)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


class Filter {  
    static allProjects() {
        let todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
        let allProjects = todos.map(todo => todo.project);
        allProjects.push('Home');
        allProjects.push('Work');
        allProjects.push('Exercise');
        let uniqueProjects = allProjects.filter((item, i, allProjects) => allProjects.indexOf(item) === i);
        return uniqueProjects;
    }

    static byProject(project) {
        let todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
        let todosOfProject = todos.filter(todo => todo.project == project);
        return todosOfProject;
    }    

    static byToday(project) {
        let todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
        let toDate = toDay().split('/');
        let todayStr = `${toDate[2]-toDate[1]-toDate[0]}`;
        let todosOfToday = todos.filter(todo => todo.date == todayStr);
        return todosOfToday;
    }   

    static byPriority (priority) {
        let todos = _store__WEBPACK_IMPORTED_MODULE_0__.default.getTodos();
        let todosOfPriority = todos.map(todo => todo.priority == priority);
        return todosOfPriority;
    }
}








/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showProject)
/* harmony export */ });
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _listTodos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _removeTodos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);




function showProject() {
    document.querySelector('#projects').addEventListener('click', (e) => {
        let btn = e.target;
        if (btn.classList.contains('projecttext')) {
            let project = btn.parentElement;        
            alert(_classes_filter__WEBPACK_IMPORTED_MODULE_0__.default.byProject(btn.textContent));
            let tods = document.getElementById("todos");
            tods.innerHTML = '';
            // removeTodos();
            (0,_listTodos__WEBPACK_IMPORTED_MODULE_1__.default)(_classes_filter__WEBPACK_IMPORTED_MODULE_0__.default.byProject(btn.textContent));
        }
    });
}



/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeTodos)
/* harmony export */ });
let todosElem = document.querySelector('#todos');
function removeTodos(todos = todosElem) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ newProjectEvent)
/* harmony export */ });
function newProjectEvent() {
    let projectSel = document.querySelector('#project-select');
    let projectwrapper = document.querySelector('#projectwrapper');
    projectSel.addEventListener('change', (event) => {        
        const proj = event.target.value;
        if (proj == 'Add') {
            let newProject = document.createElement('input');
            newProject.classList.add('newproject');
            newProject.setAttribute('id', 'newproject');
            newProject.setAttribute('type', 'text');
            newProject.placeholder = 'New Project';       
            projectwrapper.appendChild(newProject);
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
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/* harmony import */ var _views1_taskformevent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _views1_listTodos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _views1_removeTodoEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var _views1_calevent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _views1_left__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18);
/* harmony import */ var _views1_dateClickEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19);
/* harmony import */ var _views1_removeProject__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(20);
/* harmony import */ var _classes_filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);
/* harmony import */ var _views1_fillCells__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9);
/* harmony import */ var _classes_timenow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(10);
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7);
/* harmony import */ var _views1_projectEvent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(22);
/* harmony import */ var _views1_projectSelectEvent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(24);


















const container = document.getElementById("container");
const navBar = document.createElement('navbar');
navBar.classList.add('navbar');
container.appendChild(navBar);

const plusButton = document.createElement('button');
plusButton.type = 'click';
plusButton.classList.add('plusbutton');
plusButton.setAttribute('id', 'plusbutton');
plusButton.textContent = '+';



navBar.appendChild(plusButton);

let projectsArr = _classes_filter__WEBPACK_IMPORTED_MODULE_10__.default.allProjects();

let prioritiesArr = ['High', 'Medium', 'Low'];



container.addEventListener('click', (e) => {
    let elem = e.target;
    let form = document.querySelector('#taskform');
    if(elem.classList.contains('plusbutton')) {
        if (form != null) {
            form.remove();
            elem.textContent = '+';
        }
        else {
            container.appendChild((0,_views1_taskform__WEBPACK_IMPORTED_MODULE_1__.default)(projectsArr, prioritiesArr));
        
            (0,_views1_taskformevent__WEBPACK_IMPORTED_MODULE_2__.default)();
            (0,_views1_calevent__WEBPACK_IMPORTED_MODULE_6__.default)();
            (0,_views1_dateClickEvent__WEBPACK_IMPORTED_MODULE_8__.default)();        
            let calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_13__.default(2021, 'January');
            (0,_views1_fillCells__WEBPACK_IMPORTED_MODULE_11__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
            elem.textContent = '-';    
        }           
    }
})

const front = document.createElement('div');
front.classList.add('front');
front.getAttribute('id', 'front');

container.appendChild(front);

const leftDiv = document.createElement('ul');
leftDiv.classList.add('left');
leftDiv.setAttribute('id', "projects");
front.appendChild(leftDiv);
console.log(_classes_store__WEBPACK_IMPORTED_MODULE_4__.default.getTodos());

(0,_views1_left__WEBPACK_IMPORTED_MODULE_7__.default)(projectsArr);


(0,_views1_removeProject__WEBPACK_IMPORTED_MODULE_9__.default)();

const middle = document.createElement('div');
middle.classList.add('middle');

const todoDiv = document.createElement('div')
todoDiv.setAttribute('id', "todos");
middle.appendChild(todoDiv);
front.appendChild(middle);

(0,_views1_listTodos__WEBPACK_IMPORTED_MODULE_3__.default)(_classes_store__WEBPACK_IMPORTED_MODULE_4__.default.getTodos());
(0,_views1_removeTodoEvent__WEBPACK_IMPORTED_MODULE_5__.default)();
(0,_views1_projectEvent__WEBPACK_IMPORTED_MODULE_14__.default)();

console.log(_classes_store__WEBPACK_IMPORTED_MODULE_4__.default.getTodos());
})();

/******/ })()
;