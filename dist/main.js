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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n    margin: 0;\n}\n\n#container {\n    width: 100%;\n    height: 100vh;\n    background: rgb(185, 179, 179);\n}\n\n/* The code below corresponds to navbar.js */\n\n.navBarNav {\n    width: 100%;\n    height: 5rem;\n    border: 1px solid rgb(182, 108, 108);\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    background: rgb(126, 46, 10);    \n}\n\n.profileDiv {\n    width: 15%;\n    border-right: 1px solid;\n    height: 5rem;\n    display: flex;\n    flex-flow: wrap;\n    justify-content: space-around;\n    align-items: center;\n    /* padding: 1rem; */\n    padding: 0 1rem 0 1rem;\n}\n\n.profileImgDiv {\n    width: 4rem;\n    height: 4rem;\n    background: rgb(165, 175, 122);\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    object-fit: cover;\n    border-radius: 2rem;\n    overflow: hidden;\n}\n\n.profileImg {\n    width: 4rem;\n    height: 4rem;\n}\n\n.userNameSpan {\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 1.2rem;\n    color: white;\n}\n\n\n.task-btn {\n    font-size: 1rem;\n    padding: 1rem 2rem 1rem 2rem;\n    margin-right: 3rem;\n}\n\n.front {\n    width: 100%;\n    display: flex;\n    flex-direction: row;    \n}\n\n.left {\n    width: 15%;\n    background: white;\n}\n\n.middle {\n    width: 85%;\n}\n\n.taskform {\n    width: 50%;\n    border: 1px solid;\n    padding: 1rem 2rem 1rem 2rem;\n    border-radius: 0.5rem;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n}\n\n/* calendar */\n\n.yearDiv, .monthDiv, .week, .dateDiv {\n    display: block;\n}\n.schedule {\n    width: 14rem;\n    display: inline;\n}\n\n.div-schedule {\n    display: none;\n}\n\n.schedulebtn:hover .div-schedule{\n    display: block;\n}\n\n.cell, .week {\n    width: 2rem;\n    height: 1.5rem;\n}", ""]);
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
/* harmony export */   "default": () => (/* binding */ navBar)
/* harmony export */ });
const profile = (profileImg, userName) => {
    let imgPath = new Image();
    imgPath.src = profileImg;
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profileDiv');
    profileDiv.setAttribute('id', 'profileDiv');
    let profileImgDiv = `<div class="profileImgDiv"><img src=${imgPath.src} class="profileImg"></div>`;
    let userNameSpan = `<span class="userNameSpan">${userName}</span>`;
    profileDiv.innerHTML = profileImgDiv + userNameSpan;
    return profileDiv; 
}

const navBar = (profileImg, userName) => {
    let taskButton = document.createElement('button');
    taskButton.classList.add('task-btn');
    taskButton.setAttribute('id', 'task-btn');
    taskButton.innerText = 'Add Task';

    let navBarNav = document.createElement('nav');
    navBarNav.classList.add('navBarNav');
    navBarNav.setAttribute('id', 'navBarNav');
    
    let profileDiv =  profile(profileImg, userName);
    navBarNav.appendChild(profileDiv);
    navBarNav.appendChild(taskButton);

    return navBarNav;
}



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "45a5f06b5694cb26cda995a26fbfc894.jpeg");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ leftDiv)
/* harmony export */ });
const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const radioInput = (id, name, value) => `<input type="radio" id=${id} name=${name} value=${value}>`;
const radioLabel = (name, text) => `<label for=${name}>${text}</label><br></br>`;
const radioItem = (id, name, value, text) => radioInput(id, name, value) + radioLabel(name, text) ; 

const leftDiv = createElem('div', 'left');
const radioFrom = createElem('form', 'radioform');


const projectList = (projects) => {    
    
    let radioItems;
    for (let i=0; i<projects.length; i+=1) {
        radioItems += radioItem(`radio${i+1}`, 'projects', `${projects[i]}`, `${projects[i]}`);
    }
    return radioItems;
}

const defaultProjects = ['Today', 'Tomorrow', 'This Week', 'Home', 'Personal', 'Work', 'Fitness'];
radioFrom.innerHTML = projectList(defaultProjects);
leftDiv.appendChild(radioFrom);




/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ middleDiv)
/* harmony export */ });
/* harmony import */ var _taskform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);


const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const middleDiv = (projectsArr, prioritiesArr) => {
    const midDiv = createElem('div', 'middle');
    midDiv.appendChild((0,_taskform_js__WEBPACK_IMPORTED_MODULE_0__.default)(projectsArr, prioritiesArr));
    return midDiv;
}



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ taskformDiv)
/* harmony export */ });
/* harmony import */ var _calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


const createElem = (tag, name) => {
    let elem = document.createElement(tag);
    elem.classList.add(name);
    elem.setAttribute('id', name);
    return elem;
}

const icon1 = '<span class="iconify" data-icon="bx:bxs-category" data-inline="false"></span>';
const icon2 = '<span class="iconify" data-icon="ic:outline-low-priority" data-inline="false"></span>';
// const icon3 = '<span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span>';

const projects = (i=1, projectsArr) => {
    if (i == projectsArr.length) return `<option value="project${projectsArr.length}">Project ${projectsArr.length}</option>`;
    return `<option value="project${i}">Project ${i}</option>` + projects(i+1, projectsArr);    
}

const priorities = (i=1, priorityArr) => {
    if (i == priorityArr.length) return `<option value="priority${priorityArr.length}">Priority ${priorityArr.length}</option>`;
    return `<option value="priority${i}">Priority ${i}</option>` + priorities(i+1, priorityArr);    
}

const title = '<input type="text" id="title" name="title" ><br>';

const selectDiv = (oTag, iTag, name, innerT, innerIcon='') => {
    const select = createElem(`${oTag}`, `${oTag}-${name}`);
    select.innerHTML = innerT;
    const selectbtn = createElem(`${iTag}`, `${iTag}-${name}`);
    selectbtn.innerHTML = innerIcon; 
    const selectDiv = createElem('div', `${name}`);
    selectDiv.appendChild(selectbtn);
    selectDiv.appendChild(select);
    return selectDiv;
}

const projectSelect = (projectsArr) => selectDiv('select', 'button', 'project', projects(1, projectsArr), icon1);
const prioritySelect = (prioritiesArr) => selectDiv('select', 'button', 'priority', priorities(1, prioritiesArr), icon2);
const schedule = (innerT) => selectDiv('div', 'button', 'schedule', innerT, 'Schedule');

const noteDiv = () => {
    const notebtn = '<button id="project" class="note"> <span class="iconify" data-icon="bx:bx-notepad" data-inline="false"></span></button>';
    const note = '<textfield id="note" class="note" placeholder="Write todo description"></textfield>'
    const notediv = createElem('div', 'notediv');
    notediv.innerHTML = notebtn + note;
    return notediv;
}

const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task'; 

const taskformDiv = (projectsArr, prioritiesArr) => {
    const taskformDiv = createElem('div', 'taskform'); 
    taskformDiv.appendChild(projectSelect(projectsArr));
    taskformDiv.appendChild(prioritySelect(prioritiesArr));
    taskformDiv.appendChild(schedule((0,_calendar__WEBPACK_IMPORTED_MODULE_0__.default)().innerHTML));
    taskformDiv.appendChild(noteDiv());
    taskformDiv.appendChild(addTask);
    return taskformDiv;
}




/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarDiv)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);



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

const years = [2020, 2021, 2022, 2023, 2024, 2025];
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
/* 11 */
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



// const calendar = new Calendar(2020, "February");
// console.log(calendar.year);
// console.log(calendar.month);
// console.log(calendar.dayone());
// console.log(calendar.monthObj());
// console.log(calendar.monthInfo());
// console.log(calendar.start());
// console.log(calendar.monthDays());



/***/ }),
/* 12 */
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
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarEvent)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);




const calendarEvent = () => {
    const selectMonth = document.getElementById("selectMonth");
    const selectYear = document.getElementById("selectYear");

    selectMonth.addEventListener('change', (event) => {
        const result = document.querySelector('.result');
        const month = event.target.value;
        const year = (0,_getoption__WEBPACK_IMPORTED_MODULE_1__.default)(selectYear).value;
        const calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_0__.default(year, month);
        const fillcells = (0,_fillCells__WEBPACK_IMPORTED_MODULE_2__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
    });

    selectYear.addEventListener('change', (event) => {
        const result = document.querySelector('.result');
        const year = event.target.value;
        const month = (0,_getoption__WEBPACK_IMPORTED_MODULE_1__.default)(selectMonth).value;
        const calendar = new _classes_calendar__WEBPACK_IMPORTED_MODULE_0__.default(year, month);
        const fillcells = (0,_fillCells__WEBPACK_IMPORTED_MODULE_2__.default)(calendar.start(), calendar.monthDays(), 'dateDiv');
    });
}




/***/ }),
/* 14 */
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _views_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _assets_images_photo_jpeg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _views_left_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _views_middle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _views_calendarevent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _views_getoption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);









const container = document.getElementById("container");

const nav = (0,_views_navbar__WEBPACK_IMPORTED_MODULE_1__.default) (_assets_images_photo_jpeg__WEBPACK_IMPORTED_MODULE_2__.default, 'henatan');
container.appendChild(nav);

const front  = document.createElement('div');
front.classList.add('front');
front.setAttribute('id', 'front');

let projectsArr = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
let prioritiesArr = ['Priority1', 'Priority2', 'Priority3', 'Priority4', 'Priority5'];

front.appendChild(_views_left_js__WEBPACK_IMPORTED_MODULE_3__.default);
front.appendChild((0,_views_middle_js__WEBPACK_IMPORTED_MODULE_4__.default)(projectsArr, prioritiesArr));

container.appendChild(front);
(0,_views_calendarevent_js__WEBPACK_IMPORTED_MODULE_6__.default)();


})();

/******/ })()
;