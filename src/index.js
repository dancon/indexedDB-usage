import dbms from './DBMS';

let dbObj = dbms.createDatabase('idbtest');

dbObj.createTable('testTable');

dbObj.createTable('userInfo', {keyPath: 'userId'});

dbObj.createTable('gradeInfo');