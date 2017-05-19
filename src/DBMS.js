import IDBFactory from './database/IDBFactory';
import safeCall, {callWithoutPromise} from './util/safeCall';

// 用来保存不同的数据库实例
const _dataBaseMap = Symbol('class [DBMS] inner property "_dataBaseMap"'),
  _connect = Symbol('class [DBMS] inner property "_connect"');

class DBMS {
  constructor() {
    this[_dataBaseMap] = {};
  }

  /**
   * @method connectDatabase       创建数据库
   * @param databaseName {String}  数据库名称
   * @param success {Function}     创建成功的回调
   * @param error {Function}       创建失败的回调
   * @return Promise
   * */
  connectDatabase(databaseName, success, error) {
    let promise = new Promise((resolve, reject) => {
      try {
        if (!this[_dataBaseMap][databaseName]) {
          this[_dataBaseMap][databaseName] = new IDBFactory(databaseName);
        }
        resolve(this[_dataBaseMap][databaseName]);
      } catch (e) {
        reject(e);
      }
    });

    safeCall(promise, success, error);
    return promise;
  }

  /**
   * @method deleteDatabase      删除指定名称的数据库实例
   * @param success {Function}   删除成功的回调
   * @param error {Function}     删除失败的回调
   * @return Promise
   * */
  deleteDatabase(databaseName, success, error) {
    return this.connectDatabase(databaseName, dbInstance => {
      return dbInstance.drop(() => {
        // 数据库删除成功后，同时也删除 DBMS 中维护的数据库映射表中的映射
        Reflect.deleteProperty(this[_dataBaseMap], databaseName);
        callWithoutPromise(success, [dbInstance]);
      }, error);
    }, error);
  }

  clearAllDatabase() {

  }
}

export default new DBMS();