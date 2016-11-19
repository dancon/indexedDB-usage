import dbms from './DBMS';

let dbObj = dbms.createDatabase('idbtest');

dbObj.createObjectStore('testTable');

dbObj.createObjectStore('userInfo', {keyPath: 'userId'});

var gradeTable = dbObj.createObjectStore('gradeInfo');

/*
console.log(gradeTable);
gradeTable.then(function(table){
  console.log('create table gradeInfo success, table is', table);
  table.setItem('grade', {
    name: 'John',
    age: 23
  }).then(function(value){
    console.log('setItem success, value is', value);
  });
});*/
