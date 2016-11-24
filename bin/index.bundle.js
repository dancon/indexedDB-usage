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

	var _DBMS = __webpack_require__(1);

	var _DBMS2 = _interopRequireDefault(_DBMS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建数据库
	var dbObj = _DBMS2.default.createDatabase('idbtest');

	// 创建表
	var gradeTable = dbObj.createObjectStore('gradeInfo'),
	    userInfoTable = dbObj.createObjectStore('userInfo');

	// 插入数据
	gradeTable.setItem('grade', {
	  name: 'John',
	  age: 23
	}).then(function (value) {
	  console.log('setItem success, value is', value);
	});

	gradeTable.setItem('test', {
	  name: 'test',
	  age: 77
	}).then(function (value) {
	  return console.log('setItem in gradeInfo success, value is', value);
	});

	userInfoTable.setItem('user1', {
	  name: 'Terry',
	  age: 25
	}).then(function (value) {
	  console.log('setItem in userInfo success, value is', value);
	});

	gradeTable.setItem('test', {
	  name: 'yy',
	  age: 89
	}).then(function (value) {
	  return console.log('update info in grade table success');
	});

	gradeTable.setItem('test', {}).then(function (value) {
	  return console.log('哟呵呵呵');
	});

	// 获取数据
	gradeTable.getItem('grade').then(function (value) {
	  return console.log('getItem success, value is', value);
	});

	// 删除数据
	gradeTable.removeItem('test').then(function () {
	  return console.log('removeItem success');
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _IDBFactory = __webpack_require__(2);

	var _IDBFactory2 = _interopRequireDefault(_IDBFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 用来保存不同的数据库实例
	var _dataBaseMap = Symbol('class [DBMS] inner property _dataBaseMap');

	var DBMS = function () {
	  function DBMS() {
	    _classCallCheck(this, DBMS);

	    this[_dataBaseMap] = {};
	  }

	  _createClass(DBMS, [{
	    key: 'createDatabase',
	    value: function createDatabase(databaseName, success, error) {
	      var dbms = this;

	      if (!this[_dataBaseMap][databaseName]) {
	        this[_dataBaseMap][databaseName] = new _IDBFactory2.default(databaseName, success, error);
	      }

	      return dbms.getDatabase(databaseName);
	    }
	  }, {
	    key: 'getDatabase',
	    value: function getDatabase(databaseName) {
	      return this[_dataBaseMap][databaseName];
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _IObjectStore = __webpack_require__(3);

	var _IObjectStore2 = _interopRequireDefault(_IObjectStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 私有属性和方法
	var _getConnection = Symbol('class [IDBFactory] inner method _getConnection'),
	    _isUpgradeNeeded = Symbol('class [IDBFactory] inner method _isUpgradeNeeded'),
	    _INDEXEDDB = Symbol('class [IDBFactory] inner property _INDEXEDDB'),
	    _dbConnectionPromise = Symbol('class [IDBFactory] inner property _dbConnectionPromise'),
	    _init = Symbol('class [IDBFactory] inner method _init'),
	    _operationQueue = Symbol('class [IDBFactory] inner property _operationQueue'),
	    _status = Symbol('class [IDBFactory] inner property _status'),
	    _pushInQueue = Symbol('class [IDBFactory] inner method _pushInQueue'),
	    _popFromQueue = Symbol('class [IDBFactory] inner method _popFromQueue'),
	    toString = Object.prototype.toString;

	function excuteCallback(promise, successCallback, errorCallback) {
	  if (toString.call(successCallback) === '[object Function]') {
	    promise.then(successCallback);
	  }

	  if (errorCallback) {
	    promise.catch(errorCallback);
	  }
	}

	var IDBFactory = function () {

	  /**
	   * @description  IDBFactory 构造函数
	   * @method constructor
	   * @param dbName          数据库名
	   * */
	  function IDBFactory(dbName, success, error) {
	    _classCallCheck(this, IDBFactory);

	    var self = this;

	    this.name = dbName;
	    this.db = null;
	    this.version = 1;
	    this.readyPromise = [];
	    this[_INDEXEDDB] = window.indexedDB || window.webkitIndexedDB;

	    this[_dbConnectionPromise] = this[_init](dbName);
	    this[_operationQueue] = []; // 用来保存
	    this[_status] = 'done';

	    excuteCallback(this[_dbConnectionPromise], function () {
	      toString.call(success) === '[object Function]' && success(self);
	    }, error);
	  }

	  // 公有方法
	  /**
	   * @description   删除指定名称的数据库
	   * @method  destory
	   * @param   success         删除成功后的回调
	   * @param   error           删除失败的回调
	   * @return  Promise
	   * */


	  _createClass(IDBFactory, [{
	    key: 'destory',
	    value: function destory(success, error) {
	      var indexedDB = this[_INDEXEDDB],
	          self = this,
	          promise;

	      promise = new Promise(function (resolve, reject) {
	        var deleteRequest = indexedDB.deleteDatabase(self.name);

	        deleteRequest.onsuccess = function (event) {
	          self.db = deleteRequest.result;
	          resolve(deleteRequest.result);
	        };

	        deleteRequest.onerror = function (event) {
	          reject(deleteRequest.error);
	        };
	      });

	      excuteCallback(promise, success, error);

	      return promise;
	    }

	    /**
	     * @method createObjectStore
	     * @param tableName     表名称
	     * @param param         表配置
	     * @return IObjectStore IObjectStore 实例
	     * */

	  }, {
	    key: 'createObjectStore',
	    value: function createObjectStore(tableName, param) {
	      var _this = this;

	      var promise = Promise.all([this[_dbConnectionPromise]]).then(function () {
	        console.log('open db success');
	        var db = _this.db,
	            dbInfo = {
	          name: _this.name,
	          tableInfo: {
	            name: tableName
	          }
	        };

	        if (param && param.keyPath) {
	          dbInfo.tableInfo.param = param;
	        }
	        // 每次创建 table 的时候，都先来检测 table 是否已经存在，如果不存在，然后再创建
	        if (!db.objectStoreNames.contains(tableName)) {
	          // 使用一个队列来存储这些异步操作, 只有前一个完成后才会进行下一个
	          var pushPromise = _this[_pushInQueue](function () {
	            dbInfo.db = _this.db;
	            dbInfo.version = _this.version;

	            _this[_status] = 'pending';
	            // 更新 IDBFactory 实例中的 _dbConnectionPromise
	            _this[_dbConnectionPromise] = _this[_getConnection](dbInfo, _this[_isUpgradeNeeded](dbInfo), function (response) {

	              var db = response.db,
	                  dbInfo = response.dbInfo,
	                  event = response.event;
	              try {
	                db.createObjectStore(dbInfo.tableInfo.name, dbInfo.tableInfo.param);
	              } catch (exception) {
	                if (exception.name == 'ConstraintError') {
	                  console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + event.oldVersion + ' to version ' + event.newVersion + ', but the storage "' + dbInfo.tableInfo.name + '" already exists.');
	                } else {
	                  throw exception;
	                }
	              }
	            });

	            return _this[_dbConnectionPromise];
	          });

	          if (_this[_status] == 'done') {
	            _this[_operationQueue].shift().resolve();
	            _this[_status] = 'pending';
	          }

	          return pushPromise;
	        } else {
	          return Promise.resolve();
	        }
	      });

	      this.readyPromise.push(promise);
	      return this[tableName] = new _IObjectStore2.default(tableName, this);
	    }

	    /**
	     * @method deleteObjectStore
	     *
	     */

	  }, {
	    key: 'deleteObjectStore',
	    value: function deleteObjectStore(tableName) {
	      var dbInfo = {
	        name: this.name
	      };
	    }

	    // 私有方法

	    /**
	     * @description  创建指定名称的数据库
	     * @method  create
	     * @param   databaseName   数据库名称
	     * @param   success        创建成功的回调
	     * @param   error          创建失败的回调
	     * @return  Promise
	     * */

	  }, {
	    key: _init,
	    value: function value(databaseName, success, error) {
	      var self = this,
	          dbInfo = {
	        name: databaseName,
	        db: this.db,
	        version: this.version
	      },
	          promise;

	      promise = Promise.resolve().then(function () {
	        // 尝试打开数据库
	        return self[_getConnection](dbInfo, false);
	      });

	      excuteCallback(promise, success, error);

	      return promise;
	    }

	    // 创建链接

	  }, {
	    key: _getConnection,
	    value: function value(dbInfo, isUpgradeNeeded, callback) {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        // 先检查数据库实例是否存在，如果存在并且版本不一致，则关闭，否则返回该数据库实例
	        if (dbInfo.db) {
	          if (isUpgradeNeeded) {
	            dbInfo.db.close();
	          } else {
	            return resolve(dbInfo.db);
	          }
	        }

	        var indexedDB = _this2[_INDEXEDDB],
	            dbParam = [dbInfo.name],
	            idbOpenRequest;

	        isUpgradeNeeded && dbParam.push(dbInfo.version);

	        idbOpenRequest = indexedDB.open.apply(indexedDB, dbParam);

	        if (isUpgradeNeeded) {
	          idbOpenRequest.onupgradeneeded = function (event) {

	            callback && callback({
	              event: event,
	              db: idbOpenRequest.result,
	              dbInfo: dbInfo
	            });
	          };
	        }

	        idbOpenRequest.onerror = function () {
	          reject(idbOpenRequest.error);
	        };

	        idbOpenRequest.onsuccess = function () {
	          var db = idbOpenRequest.result;

	          _this2[_status] = 'done';
	          _this2.db = db;
	          _this2.version = db.version;
	          resolve(db);

	          if (isUpgradeNeeded && _this2[_operationQueue].length) {
	            _this2[_operationQueue].shift().resolve();
	          }
	        };
	      });
	    }
	  }, {
	    key: _isUpgradeNeeded,
	    value: function value(dbInfo) {
	      if (!dbInfo.db) {
	        return true;
	      }

	      var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.tableInfo.name),
	          isDowngrade = dbInfo.version < dbInfo.db.version,
	          isUpgrade = dbInfo.version > dbInfo.db.version;

	      if (isDowngrade) {
	        dbInfo.version = dbInfo.db.version;
	      }

	      if (isUpgrade || isNewStore) {
	        if (isNewStore) {
	          var incVersion = dbInfo.db.version + 1;
	          if (incVersion > dbInfo.version) {
	            dbInfo.version = this.version = incVersion;
	          }
	        }
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: _pushInQueue,
	    value: function value(defferFn) {
	      var queueObj = {};

	      queueObj.promise = new Promise(function (resolve) {
	        queueObj.resolve = resolve;
	      });

	      this[_operationQueue].push(queueObj);

	      return queueObj.promise.then(defferFn);
	    }
	  }]);

	  return IDBFactory;
	}();

	exports.default = IDBFactory;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MODE = {
	  RO: 'readonly',
	  RW: 'readwrite'
	},
	    _keyRange = Symbol('class [IObjectStore] inner method that create a key range'),
	    toString = Object.prototype.toString;

	var IObjectStore = function () {
	  function IObjectStore(name, IDBDatabase) {
	    _classCallCheck(this, IObjectStore);

	    this.name = name;
	    this.dbInst = IDBDatabase;
	  }

	  _createClass(IObjectStore, [{
	    key: 'setItem',
	    value: function setItem(key, value) {
	      var _this = this;

	      var promise = new Promise(function (resolve, reject) {
	        // console.log(this.dbInst.readyPromise);
	        Promise.all(_this.dbInst.readyPromise).then(function () {
	          console.log('begin setItem', _this.name, key, value);
	          var db = _this.dbInst.db,
	              transaction = db.transaction([_this.name], MODE.RW),
	              objStore = transaction.objectStore(_this.name),
	              req = objStore.put(value, key);

	          value = value === null ? void 0 : value;
	          transaction.oncomplete = function () {
	            value = value === void 0 ? null : value;
	            resolve(value);
	          };

	          transaction.onabort = transaction.onerror = function () {
	            reject(transaction.error);
	          };
	        }).catch(reject);
	      });

	      return promise;
	    }
	  }, {
	    key: 'getItem',
	    value: function getItem(key) {
	      var _this2 = this;

	      var promise = new Promise(function (resolve, reject) {
	        Promise.all(_this2.dbInst.readyPromise).then(function () {
	          var db = _this2.dbInst.db,
	              transaction = db.transaction(_this2.name, MODE.RO),
	              objStore = transaction.objectStore(_this2.name),
	              req = objStore.get(key);

	          req.onsuccess = function () {
	            var val = req.result;
	            val = val === void 0 ? null : val;
	            resolve(val);
	          };

	          req.onerror = function () {
	            reject(req.error);
	          };
	        });
	      });

	      return promise;
	    }
	  }, {
	    key: 'removeItem',
	    value: function removeItem(key) {
	      var _this3 = this;

	      var promise = new Promise(function (resolve, reject) {
	        Promise.all(_this3.dbInst.readyPromise).then(function () {
	          var db = _this3.dbInst.db,
	              transaction = db.transaction(_this3.name, MODE.RW),
	              objStore = transaction.objectStore(_this3.name),
	              req = objStore.delete(key);

	          req.onsuccess = function () {
	            console.log(req.result);
	            resolve();
	          };

	          req.onerror = function () {
	            reject(req.error);
	          };
	        });
	      });

	      return promise;
	    }

	    // 私有方法
	    /**
	     * @description 生成一个 key 的范围，用来获取或者删除该范围内的数据
	     * @method _keyRange
	     * @param String | Object
	     * @return IDBRange
	     * */

	  }, {
	    key: _keyRange,
	    value: function value(rangeObject) {
	      var key, value;

	      if (toString.call(rangeObject) == '[object Object]') {} else {
	        IDBKeyRange.only(rangeObject);
	      }
	    }
	  }]);

	  return IObjectStore;
	}();

	exports.default = IObjectStore;

/***/ }
/******/ ]);