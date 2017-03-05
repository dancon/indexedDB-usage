/**
 * Created by John on 2017/3/5 0005.
 *
 * SessionStorage 为每个域都维护了一个独立的存储区域用来保存 key/value 对值，SessionStorage 只在页面会话期间有效
 */

console.log('SessionStorage set data:');

sessionStorage.setItem('name', 'John');

console.log('SessionStorage get Data:', sessionStorage.getItem('name'));

window.addEventListener('storage', function(event){
  console.log('oldValue:', event.oldValue);
  console.log('newValue:', event.newValue);
  console.log('key:', event.key);
  console.log('storageArea:', event.storageArea);
  console.log('target:', event.target);
}, false);

// 添加数据
document.querySelector('input[type=submit]').addEventListener('click', function(){
  var inputs = document.querySelectorAll('input[name]'),
    data = {};

  inputs.forEach(function(ele){
    data[ele.name] = ele.value;
  });

  sessionStorage.setItem(data.key, data.value);

  // 获取所有的 key
  for(var keys = [], i = 0, len = sessionStorage.length; i < len ; i ++){
    keys.push(sessionStorage.key(i));
  };
  console.log(keys.join());
}, false);

// 清除数据
document.querySelector('input[type=button]').addEventListener('click', function(){
  sessionStorage.clear();
}, false);


setTimeout(function(){
  sessionStorage.setItem('name', 'Terry');
}, 2000);