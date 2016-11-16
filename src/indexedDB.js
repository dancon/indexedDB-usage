(function(){
  var indexedDB = window.indexedDB || window.webkitIndexedDB,
      dbInfo = {
        db: null,
        version: 1
      };

  function isUpgradeNeeded(dbInfo){
    if(!dbInfo.db){
      return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.store);

    if(isNewStore){
      dbInfo.version = dbInfo.db.version + 1;
      return true;
    }
  }

  function getConnection(dbInfo){
    return new Promise(function(resolve, reject){

    });
  }
}());


function createTable(dbInfo, tablename){

  return new Promise(function(resolve, reject){

    var req = indexedDB.open(dbInfo.name, dbInfo.version),
      hasUpgrade = false;

    req.onupgradeneeded = function(event){
      var db = req.result;
      console.log('up');
    }

    req.onsuccess = function(){
      console.log('open success');
      var db = req.result;
      resolve(db);
    }
  });
}

createTable('test', 'table1');