// 私有属性和方法
const _getConnection = Symbol('class [IDBFactory] inner method _getConnection'),
  _isUpgradeNeeded = Symbol('class [IDBFactory] inner method _isUpgradeNeeded'),
  _INDEXEDDB = Symbol('class [IDBFactory] inner property _INDEXEDDB'),
  _dbConnectionPromise = Symbol('class [IDBFactory inner property _dbConnectionPromise]');

class IDBFactory{
  constructor(dbName){
    this.name = dbName;
    this.db = null;
    this.version = 1;
    this[_INDEXEDDB] = window.indexedDB || window.webkitIndexedDB;

    this[_dbConnectionPromise] = this.getConnection(dbName);
  }

  // 公有方法
  getConnection(databaseName){
    var dbInfo = {
      name: this.name,
      db: this.db,
      version: this.version
    }

    return Promise.resolve().then(function(){
      // 尝试打开数据库
      return this[_getConnection](dbInfo, false);
    }).then(function(db){
      return dbInfo.db = this.db = db;
    });
  }

  // 私有方法

  // 创建链接
  [_getConnection](dbInfo, isUpgradeNeeded){
    return new Promise(resolve, reject){
      // 先检查数据库实例是否存在，如果存在并且版本不一致，则关闭，否则返回该数据库实例
      if(dbInfo.db){
        if(isUpgradeNeeded){
          dbInfo.db.close();
        }else{
          return resolve(dbInfo.db);
        }
      }

      var indexedDB = this[_INDEXEDDB],
        dbParam = [dbInfo.name],
        idbOpenRequest;

      isUpgradeNeeded && dbParam.push(dbInfo.version);

      idbOpenRequest = indexedDB.open.apply(indexedDB, dbParam);

      if(isUpgradeNeeded){
        idbOpenRequest.onupgradeneeded = function(event){
          var db = idbOpenRequest.result;

          try{
            db.createObjectStore(dbInfo.tableInfo.name, dbInfo.tableInfo.param);
          }catch(exception){
            if(exception.name == 'ConstraintError'){
              console.warn('The database "' + dbInfo.name + '"' +
                ' has been upgraded from version ' + event.oldVersion +
                ' to version ' + event.newVersion +
                ', but the storage "' + dbInfo.table.name + '" already exists.');
            }else{
              throw exception;
            }
          }
        }
      }

      idbOpenRequest.onerror = function(){
        reject(idbOpenRequest.error);
      }

      idbOpenRequest.onsuccess = function(){
        resolve(idbOpenRequest.result);
      }
    }
  }

  [_isUpgradeNeeded](dbInfo){
    if (!dbInfo.db) {
      return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

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
}
export default IDBFactory;