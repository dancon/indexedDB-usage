import dbms from './DBMS';

// 创建数据库
let dbObj = dbms.createDatabase('idbtest');

// 创建表
var gradeTable = dbObj.createObjectStore('gradeInfo'),
  userInfoTable = dbObj.createObjectStore('userInfo');

// 插入数据
gradeTable.setItem('grade', {
  name: 'John',
  age: 23
}).then(function(value){
  console.log('setItem success, value is', value);
});

gradeTable.setItem('test', {
  name: 'test',
  age: 77
}).then(value => console.log('setItem in gradeInfo success, value is', value));

userInfoTable.setItem('user1', {
  name: 'Terry',
  age: 25
}).then((value) => {
  console.log('setItem in userInfo success, value is', value);
});

gradeTable.setItem('test', {
  name: 'yy',
  age: 89
}).then(value => console.log('update info in grade table success'));

gradeTable.setItem('test', {}).then(value => console.log('哟呵呵呵'));

// 获取数据
gradeTable.getItem('grade').then(value => console.log('getItem success, value is', value));

// 删除数据
gradeTable.removeItem('test').then(() => console.log('removeItem success'));