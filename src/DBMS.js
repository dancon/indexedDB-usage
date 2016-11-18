import IDBFactory from './database/IDBFactory';

// 用来保存不同的数据库实例
const _dataBaseMap = Symbol('class [DBMS] inner property _dataBaseMap');

class DBMS{
  constructor(){
    this[_dataBaseMap] = {};
  }

  createDatabase(databaseName, success, error){
    var dbms = this;

    if(!this[_dataBaseMap][databaseName]){
      this[_dataBaseMap][databaseName] = new IDBFactory(databaseName, success, error);
    }

    return dbms.getDatabase(databaseName);
  }

  getDatabase(databaseName){
    return this[_dataBaseMap][databaseName];
  }

  deleteDatabase(databaseName){

  }

  clearAllDatabase(){

  }
}

export default new DBMS();