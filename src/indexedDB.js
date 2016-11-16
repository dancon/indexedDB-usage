
var idb = window.indexedDB || window.webkitIndexedDB,
  db;

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