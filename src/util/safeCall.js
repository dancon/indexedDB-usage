const toString = Object.prototype.toString,
  TYPE = {
    FUNCTION: '[object Function]'
  };

export function callWithoutPromise(func, args, thisArg){
  if(toString.call(func) === TYPE.FUNCTION){
    func.apply(thisArg ? thisArg : null, args)
  }
}

export default function(promise, success, error){
  if (toString.call(success) === TYPE.FUNCTION) {
    promise.then(success);
  }

  if (toString.call(error) === TYPE.FUNCTION) {
    promise.catch(error);
  }
}