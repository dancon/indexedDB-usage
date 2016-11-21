const MODE = {
  RO: 'readyonly',
  RW: 'readwrite'
};

class IObjectStore{
  constructor(name, IDBDatabase){
    this.name = name;
    this.dbInst = IDBDatabase;

    console.log('readPromise', this.dbInst.readyPromise);
  }

  setItem(key, value){
    console.log('IObjectStore setItem', key, value);
    var promise = new Promise((resolve, reject) => {

      Promise.all([this.dbInst.readyPromise]).then(() => {
        var db = this.dbInst.db,
          transaction = db.transaction([this.name], MODE.RW),
          objStore = transaction.objectStore(this.name),
          req = objStore.put(key, value);

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
}

export default IObjectStore;