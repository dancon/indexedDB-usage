const MODE = {
    RO: 'readonly',
    RW: 'readwrite'
  }, _keyRange = Symbol('class [IObjectStore] inner method that create a key range'),

  toString = Object.prototype.toString;

class IObjectStore{
  constructor(name, IDBDatabase){
    this.name = name;
    this.dbInst = IDBDatabase;
  }

  setItem(key, value){
    var promise = new Promise((resolve, reject) => {
      // console.log(this.dbInst.readyPromise);
      Promise.all(this.dbInst.readyPromise).then(() => {
        console.log('begin setItem', this.name, key, value);
        var db = this.dbInst.db,
          transaction = db.transaction([this.name], MODE.RW),
          objStore = transaction.objectStore(this.name),
          req = objStore.put(value, key);

        value = value === null ? void 0 : value;
        transaction.oncomplete = function(){
          value = value === void 0 ? null : value;
          resolve(value);
        }

        transaction.onabort = transaction.onerror = function(){
          reject(transaction.error);
        }
      }).catch(reject);
    });

    return promise;
  }

  getItem(key){
    var promise = new Promise((resolve, reject) => {
      Promise.all(this.dbInst.readyPromise).then(() => {
        var db = this.dbInst.db,
          transaction = db.transaction(this.name, MODE.RO),
          objStore = transaction.objectStore(this.name),
          req = objStore.get(key);

        req.onsuccess = function(){
          var val = req.result;
          val = val === void 0 ? null : val;
          resolve(val);
        };

        req.onerror = function(){
          reject(req.error);
        };
      });
    });

    return promise;
  }

  removeItem(key){

    var promise = new Promise((resolve, reject) => {
      Promise.all(this.dbInst.readyPromise).then(() => {
        var db = this.dbInst.db,
          transaction = db.transaction(this.name, MODE.RW),
          objStore = transaction.objectStore(this.name),
          req = objStore.delete(key);

        req.onsuccess = function(){
          console.log(req.result);
          resolve();
        };

        req.onerror = function(){
          reject(req.error);
        }
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
  [_keyRange](rangeObject){
    var key, value;

    if(toString.call(rangeObject) == '[object Object]'){

    }else{
      IDBKeyRange.only(rangeObject);
    }
  }

}

export default IObjectStore;