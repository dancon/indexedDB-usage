import IDBFactory from './database/IDBFactory';

// 用来保存不同的数据库实例
const dataBaseMap = {};

class DBMS{
  constructor(){

  }

  createDatabase(databaseName){
    if(!dataBaseMap[databaseName]){
      dataBaseMap[databaseName] = new IDBFactory(databaseName);
    }

    return this.getDatabase(databaseName);
  }

  getDatabase(databaseName){
    return dataBaseMap[dataBaseMap];
  }

  deleteDatabase(databaseName){

  }

  clearAllDatabase(){

  }
}

export default new DBMS();