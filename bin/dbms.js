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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _IDBFactory = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./database/IDBFactory\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _IDBFactory2 = _interopRequireDefault(_IDBFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 用来保存不同的数据库实例
	var dataBaseMap = {};

	var DBMS = function () {
	  function DBMS() {
	    _classCallCheck(this, DBMS);
	  }

	  _createClass(DBMS, [{
	    key: 'createDatabase',
	    value: function createDatabase(databaseName) {
	      if (!dataBaseMap[databaseName]) {
	        dataBaseMap[databaseName] = new _IDBFactory2.default(databaseName);
	      }

	      return this.getDatabase(databaseName);
	    }
	  }, {
	    key: 'getDatabase',
	    value: function getDatabase(databaseName) {
	      return dataBaseMap[dataBaseMap];
	    }
	  }, {
	    key: 'deleteDatabase',
	    value: function deleteDatabase(databaseName) {}
	  }, {
	    key: 'clearAllDatabase',
	    value: function clearAllDatabase() {}
	  }]);

	  return DBMS;
	}();

	exports.default = new DBMS();

/***/ }
/******/ ]);