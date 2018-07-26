


var serializeFunction = function (func){
    return func.toString();
    };

var deserializeFunction = function (funcStr){
    return eval('(' + funcStr + ')');
    };

export {
  serializeFunction ,
  deserializeFunction ,
  
}
/* No side effect */
