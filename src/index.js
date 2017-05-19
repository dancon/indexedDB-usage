import dbms from './DBMS';

const CMD = {
  CREATEDB: 'create-db',
  DELETEDB: 'del-db'
};

let dbObj, dbName = 'idbtest';

$(function(){

  $('body').on('click', '[cmd]', function(){
    var cmd = $(this).attr('cmd');

    switch (cmd){
      // 创建数据库
      case CMD.CREATEDB:
        dbObj = dbms.connectDatabase(dbName, function(db){
          console.log('数据库创建成功', db);
        }, function(err){
          console.log('数据库创建失败', err.message);
        });
        break;

      // 删除数据库
      case CMD.DELETEDB:
        console.log('delete');
        dbms.deleteDatabase(dbName, function(db){
          console.log('数据库删除成功', db);
        }, function(err){
          console.log('数据库删除失败', err.toString());
        });
        break;
    }
  });
});

/*
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
gradeTable.removeItem('test').then(() => console.log('removeItem success'));*/
