window.indexedDB = window.indexedDB || window.webkitIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

if(!window.indexedDB){
    console.log('Your browser is not support indexedDB');
}

var curtomerData = [{
    ssn: '444-444-444', name: 'Bill', age: 34, email: 'bill@company.com'
}, {
    ssn: '555-555-555', name: 'Donna', age: 32, email: 'donna@home.org'
}], db;

// 通过 open 函数来打开一个指定版本的数据库， open 函数的第二个参数指定了数据库的版本号，而且数据库的版本号必须是一个 int 型的整数，不可以是 float, 如果你指定了 float 类型的 version, indexedDB 会默认向下取整

var request = window.indexedDB.open('the_name', 4);

request.onerror = function(event){
    console.log('打开 DB 失败', event);

    db = event.target.result;
};


// 如果一切顺利，onsuccess 事件会被触发，这是一个 DOM event, event 对象的 type 被设置为 success, open 方法返回的对象作为 event 的target, 同时把 this 对象绑定到了 request 对象
request.onsuccess = function(event){
    console.log('打开 DB 成功', event, request);
    console.log(this === request);

};
    
request.onupgradeneeded = function(event){
    console.log('upgrade DB');
  var db = event.target.result,
    objectStore;

    console.log(db);

     if(!db.objectStoreNames.contains('curstomers')){
         objectStore = db.createObjectStore('curstomers', {keyPath: 'ssn'});
     }else{
         objectStore = db.transaction(['curstomers']).objectStore('curstomers');
     }

     objectStore.createIndex('name', 'name', {unique: false});
     objectStore.createIndex('email', 'email', {unique: true});

     objectStore.transaction.oncomplete = function(event){
        var curstomerObjectStore = db.transaction('curstomers', 'readwrite').objectStore('curstomers');

        for(var i in curtomerData){
            curstomerObjectStore.add(curtomerData[i]);
        }

        console.log('完成添加数据');

        getData('444-444-444');
     };  

};

function getData(key){
    var t = db.transaction(['curstomers']),
        dbStore = t.objectStore('curstomers'),
        request = dbStore.get(key);

    request.onsuccess = function(event){
       console.log('Name of', key, ' is', request.result.name);  
    };
}