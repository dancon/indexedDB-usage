import IObjectStore from './IObjectStore';

// 私有属性和方法
const _getConnection = Symbol('class [IDBFactory] inner method _getConnection'),
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

class IDBFactory {

  /**
   * @description  IDBFactory 构造函数
   * @method constructor
   * @param dbName          数据库名
   * */
  constructor(dbName, success, error) {
    var self = this;

    this.name = dbName;
    this.db = null;
    this.version = 1;
    this[_INDEXEDDB] = window.indexedDB || window.webkitIndexedDB;

    this[_dbConnectionPromise] = this[_init](dbName);
    this[_operationQueue] = []; // 用来保存
    this[_status] = 'done';

    excuteCallback(this[_dbConnectionPromise], () => {
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
  destory(success, error) {
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

  createObjectStore(tableName, param) {
    // 使用一个队列来存储这些异步操作, 只有前一个完成后才会进行下一个
    var promise = this[_pushInQueue](() => {
      var dbPromise = this[_dbConnectionPromise],
        dbInfo = {
          name: this.name,
          tableInfo: {
            name: tableName
          }
        }, self = this;

      if (param && param.keyPath) {
        dbInfo.tableInfo.param = param;
      }

      console.log('step 1 ++++++++++++++++++++++++++++++++++++++++++++');
      Promise.all([dbPromise]).then(function () {
        dbInfo.db = self.db;
        dbInfo.version = self.version;

        self[_status] = 'pending';
        // 更新 IDBFactory 实例中的 _dbConnectionPromise
        console.log('step 2 +++++++++++++++++++++++++++++++++++++++++++');
        self[_dbConnectionPromise] = self[_getConnection](dbInfo, self[_isUpgradeNeeded](dbInfo), (response) => {

          var db = response.db,
            dbInfo = response.dbInfo,
            event = response.event;
          try {
            db.createObjectStore(dbInfo.tableInfo.name, dbInfo.tableInfo.param);
          } catch (exception) {
            if (exception.name == 'ConstraintError') {
              console.warn('The database "' + dbInfo.name + '"' +
                ' has been upgraded from version ' + event.oldVersion +
                ' to version ' + event.newVersion +
                ', but the storage "' + dbInfo.tableInfo.name + '" already exists.');
            } else {
              throw exception;
            }
          }
        });
      });
    });


    if (this[_status] == 'done') {
      this[_operationQueue].shift().resolve();
      this[_status] = 'pending';
    }

    return promise.then(() => {
      // 更新 IDBFactory 实例中的 db, 并创建 IObjectStore 对象
      console.log('step 4 +++++++++++++++++++++++++++++++++++++++++++++++');
      this.readyPromise = promise;
      return (this[tableName] = new IObjectStore(tableName, this));
    });
  }

  deleteObjectStore(tableName) {
    var dbInfo = {
      name: this.name
    }
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
  [_init](databaseName, success, error) {
    var self = this,
      dbInfo = {
        name: databaseName,
        db: this.db,
        version: this.version
      }, promise;

    promise = Promise.resolve().then(function () {
      // 尝试打开数据库
      console.log('_init');
      return self[_getConnection](dbInfo, false);
    }).then(function (db) {
      return dbInfo.db = self.db = db;
    });

    excuteCallback(promise, success, error);

    return promise;
  }

  // 创建链接
  [_getConnection](dbInfo, isUpgradeNeeded, callback) {
    var self = this;

    return new Promise(function (resolve, reject) {
      // 先检查数据库实例是否存在，如果存在并且版本不一致，则关闭，否则返回该数据库实例
      console.log('dbInfo', dbInfo, isUpgradeNeeded);
      if (dbInfo.db) {
        if (isUpgradeNeeded) {
          dbInfo.db.close();
        } else {
          return resolve(dbInfo.db);
        }
      }

      var indexedDB = self[_INDEXEDDB],
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
        }
      }

      idbOpenRequest.onerror = function () {
        reject(idbOpenRequest.error);
      }

      idbOpenRequest.onsuccess = function () {
        var db = idbOpenRequest.result;

        self[_status] = 'done';
        self.db = db;
        self.version = db.version;
        console.log('step 3 +++++++++++++++++++++++++++++++++++++++++++++');
        resolve(db);

        console.log('2222222: ', self[_operationQueue].length);
        if (self[_operationQueue].length) {
          self[_operationQueue].shift().resolve();
        }
      }
    });
  }

  [_isUpgradeNeeded](dbInfo) {
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

  [_pushInQueue](defferFn) {
    var queueObj = {};

    queueObj.promise = new Promise(function(resolve){
      queueObj.resolve = resolve;
    });

    this[_operationQueue].push(queueObj);

    return queueObj.promise.then(defferFn);
  }
}
export default IDBFactory;