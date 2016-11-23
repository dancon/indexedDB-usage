const MODE = {
  RO: 'readonly',
  RW: 'readwrite'
};

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


}

export default IObjectStore;