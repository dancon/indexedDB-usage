### indexedDB入门教程

这篇文章将逐步带你学习 indexedDB 的异步 API.


#### `Method` IDBObjectStore.delete(key|IDBRange)

`delete` 方法用来删除一条或者多条记录。

##### 参数

`key` String 类型的字符串，指定要删除记录的 key。

`IDBRange` 用来删除指定范围内的所有记录。

##### 返回

`IDBRequest` 当删除成功后，注册到该实例上的对应事件将会被触发，同时 `IDBRequrest.result` 被设置为 undefined.

##### 异常

| 异常                      | 描述                        |
| :--------                | :-------                    |
| TransactionInactiveError | 当前游标所在的事务对象已经失效  |
| ReadOnlyError            | 当前事务对象处于只读模式       |
| InvalidStateError        | 当前游标正在使用或者已经失效    |
| DataError                | 指定的 key 或者 IDBRange 无效 |