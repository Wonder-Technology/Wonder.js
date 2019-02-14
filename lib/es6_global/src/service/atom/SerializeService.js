


var serializeFunction = function (func){
    return func.toString();
    };

var deserializeFunction = function (funcStr){
    return eval('(' + funcStr + ')');
    };

var serializeValueWithFunction = function (value){
      return JSON.stringify(value, function (key, val) {
        if (typeof val === "function") {
          return val.toString();
        }
        return val;
      });
    };

var deserializeValueWithFunction = function (value){
    return JSON.parse(value, (key, value) => {
      if (typeof value != "string") {
        return value;
      }

      return (value.substring(0, 8) == "function") ? eval('(' + value + ')') : value;
    });
    };

export {
  serializeFunction ,
  deserializeFunction ,
  serializeValueWithFunction ,
  deserializeValueWithFunction ,
  
}
/* No side effect */
