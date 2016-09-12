/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _list = __webpack_require__(0);

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*****************************************************************************
 *
 * Default ToBuyList
 *
 ****************************************************************************/
// let fakeToBuyList = {    
//   key : '0',
//   label: 'Lista da semana',    
//   todolist: {
//     data: [
//       {name: 'ovo', quantity: 2, unityPrice: 1.50},
//       {name: 'pão', quantity: 6, unityPrice: 2.78},
//       {name: 'chocolate', quantity: 60, unityPrice: 50}
//     ]
//   }
// };

alert('aadasdsad');

/*****************************************************************************
 *
 * App initial defautl values
 *
 ****************************************************************************/
//import ListService
var app = {
  isLoading: true,
  visibleCards: {},
  SelectedToBuyLists: [],
  spinner: document.querySelector('.loader'),
  cardTemplate: document.querySelector('.cardTemplate'),
  container: document.querySelector('.main'),
  addDialog: document.querySelector('.dialog-container')
};

_list2.default.getToBuyLists(app);

// document.getElementById('butAdd').addEventListener('click', function() {
//   // Open/show the add new city dialog
//   app.toggleAddDialog(true);
// });

document.getElementById('butAddList').addEventListener('click', function () {
  // Add the newly created to buy list
  var newList = document.getElementById('NewListName');
  var label = newList.value;
  var countListItems = app.getToBuyLists().length;
  var key = countListItems + 1;
  app.SelectedToBuyLists.push({ key: key, label: label });
  app.updateToBuyListCards({ key: key, label: label });
  app.saveSelectedToBuyList();
  app.toggleAddDialog(false);
});

// document.getElementById('butAddCancel').addEventListener('click', function() {
//   // Close the add new city dialog
//   app.toggleAddDialog(false);
// });

// /*****************************************************************************
//  *
//  * On firt load, checks if theres any list in localStorage
//  *
//  ****************************************************************************/    
// app.SelectedToBuyLists = localStorage.SelectedToBuyLists;

// //if theres is a list, show then to the user on select
// if (app.SelectedToBuyLists) {
//   app.SelectedToBuyLists = JSON.parse(app.SelectedToBuyLists);
//   app.SelectedToBuyLists.forEach(function(item) {
//     // load with data
//     ListService.updateToBuyListCards(item);
//   });        
//   ListService.saveSelectedToBuyList();
// }
// //if theres none, get the default and save to the select
// else {  
//   app.SelectedToBuyLists = [
//     {key: fakeToBuyList.key, label: fakeToBuyList.label}
//   ];
//   // load with data
//   ListService.updateToBuyListCards(app.SelectedToBuyLists[0]);    
//   ListService.saveSelectedToBuyList();
// }

/***/ }
/******/ ]);