window.indexedDB = window.indexedDB || window.webkitIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

if(!window.indexedDB){
    console.log('Your browser is not support indexedDB');
}

// 通过 open 函数来打开一个指定版本的数据库， open 函数的第二个参数指定了数据库的版本号，而且数据库的版本号必须是一个 int 型的整数，不可以是 float, 如果你指定了 float 类型的 version, indexedDB 会默认向下取整

var request = window.indexedDB.open('MyTestDatabase', 3);

request.onerror = function(event){
    console.log('打开 DB 失败', event);
};


// 如果一切顺利，onsuccess 事件会被触发，这是一个 DOM event, event 对象的 type 被设置为 success, open 方法返回的对象作为 event 的target, 同时把 this 对象绑定到了 request 对象
request.onsuccess = function(event){
    console.log('打开 DB 成功', event, request);
    console.log(this === request);
}