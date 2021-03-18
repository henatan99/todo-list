/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ taskformDiv)
/* harmony export */ });
/* harmony import */ var _calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



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

const titleElem = document.createElement('div');
titleElem.classList.add('titleElem');
titleElem.setAttribute('id', 'titleElem');

titleElem.innerHTML = '<input type="text" id="title" name="title" placeholder="Title"><br>';

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
    const note = '<textarea id="note" class="note" placeholder="Write todo description"></textarea>'
    const notediv = createElem('div', 'notediv');
    notediv.innerHTML = notebtn + note;    
    return notediv;
}

const addTask = createElem('button', 'tsk-btn');
addTask.innerText = 'Add Task'; 

const taskformDiv = (projectsArr, prioritiesArr) => {
    const taskformDiv = createElem('div', 'taskform');

    taskformDiv.appendChild(titleElem);
    taskformDiv.appendChild(projectSelect(projectsArr));
    taskformDiv.appendChild(prioritySelect(prioritiesArr));
    taskformDiv.appendChild(schedule((0,_calendar__WEBPACK_IMPORTED_MODULE_0__.default)().innerHTML));
    taskformDiv.appendChild(noteDiv());
    taskformDiv.appendChild(addTask);    
    return taskformDiv;
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarDiv)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _classes_timenow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





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
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ taskFormEvent)
/* harmony export */ });
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _classes_todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




const taskFormEvent = () => {
    const taskForm = document.getElementById("taskform");
    let title = document.querySelector('#title');
    let selectProject = document.querySelector('#select-project');
    // const selectProject = taskForm.childNodes[0].childNodes[1];
    let selectPriority = document.querySelector('#select-priority');
    // const selectPriority = taskForm.childNodes[1].childNodes[1];
    let dateDiv = document.getElementById("dateDiv"); 
    let noteText = document.getElementById("note");
    let addTaskBtn = document.getElementById("tsk-btn");

    const taskObj = new _classes_todo__WEBPACK_IMPORTED_MODULE_1__.default();
    taskForm.addEventListener('click', (event) => {
        const elem = event.target;
        if(elem.classList.contains('tsk-btn')) {
            // alert('Task button clicked');
            let titl = title.value;
            let date = dateDiv.value;
            let desc = noteText.value;
            let project = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectProject).value;
            let priority = (0,_getoption__WEBPACK_IMPORTED_MODULE_0__.default)(selectPriority).value;
            taskObj.title = titl;
            taskObj.description = desc;
            taskObj.project = project;
            taskObj.priority = priority;
            taskObj.date = date;
            let todos = _classes_store__WEBPACK_IMPORTED_MODULE_2__.default.getTodos();
            let id = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
            taskObj.id = id;
            // alert(`project: ${taskObj.project}, priority: ${taskObj.priority}, date: ${taskObj.date}`);
            // alert('nononono...');
            _classes_store__WEBPACK_IMPORTED_MODULE_2__.default.addTodo(taskObj);
        }
    });
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

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
/* 9 */
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
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listTodos)
/* harmony export */ });
/* harmony import */ var _todos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


// const todosDiv = document.createElement('div');
// todosDiv.setAttribute('id', 'todos');

function listTodos(todos) {
    todos.forEach((todoObj) => (0,_todos__WEBPACK_IMPORTED_MODULE_0__.default)(todoObj, '#todos'));
    
}



/***/ }),
/* 11 */
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
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeTodo)
/* harmony export */ });
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

function removeTodo() {
    document.querySelector('#todos').addEventListener('click', (e) => {
        const btn = e.target;
        if (btn.parentElement.classList.contains('del-todo')) {
            const todo = btn.parentElement.parentElement;            
            let todoId = todo.getAttribute('value');

            alert(todoId);
            todo.remove();
            _classes_store__WEBPACK_IMPORTED_MODULE_0__.default.removeTodo(parseInt(todoId));           
        }
    });
}




/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calendarEvent)
/* harmony export */ });
/* harmony import */ var _classes_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _getoption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _fillCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




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
/******/ 			// no module.id needed
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
/* harmony import */ var _views_taskform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _views_taskformevent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _views1_listTodos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _classes_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _views1_removeTodoEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _views_calevent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
// import './assets/style.css';
// import navBar from './views/navbar';
// import profileImg from './assets/images/photo.jpeg';
// import leftDiv from './views/left.js';
// import middleDiv from './views/middle.js';
// import Calendar from './classes/calendar';
// import calendarEvent from './views/calendarevent.js';
// import getSelectedOption from './views/getoption';
// import date from './views/dateClickEvent';
// import taskFormEvent from './views/taskformevent';
// import Store from './classes/store';
// import addTaskEvent from './views/addTaskEvent';
// import deleteTodo from './views/deleteTodo';

// const container = document.getElementById("container");

// const nav = navBar (profileImg, 'henatan');
// container.appendChild(nav);

// const front  = document.createElement('div');
// front.classList.add('front');
// front.setAttribute('id', 'front');

// let projectsArr = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
// let prioritiesArr = ['Priority1', 'Priority2', 'Priority3', 'Priority4', 'Priority5'];

// front.appendChild(leftDiv());
// front.appendChild(middleDiv(projectsArr, prioritiesArr));

// container.appendChild(front);


// calendarEvent();
// date();
// taskFormEvent();
// deleteTodo();
// addTaskEvent();
// console.log(Store.getTodos());







const container = document.getElementById("container");

let projectsArr = ['Project1', 'Project2', 'Project3', 'Project4', 'Project5'];
let prioritiesArr = ['Priority1', 'Priority2', 'Priority3', 'Priority4', 'Priority5'];

container.appendChild((0,_views_taskform__WEBPACK_IMPORTED_MODULE_0__.default)(projectsArr, prioritiesArr));
(0,_views_taskformevent__WEBPACK_IMPORTED_MODULE_1__.default)();
(0,_views_calevent__WEBPACK_IMPORTED_MODULE_5__.default)();

const todoDiv = document.createElement('div')
todoDiv.setAttribute('id', "todos");
container.appendChild(todoDiv);

(0,_views1_listTodos__WEBPACK_IMPORTED_MODULE_2__.default)(_classes_store__WEBPACK_IMPORTED_MODULE_3__.default.getTodos());
(0,_views1_removeTodoEvent__WEBPACK_IMPORTED_MODULE_4__.default)();

console.log(_classes_store__WEBPACK_IMPORTED_MODULE_3__.default.getTodos());
})();

/******/ })()
;