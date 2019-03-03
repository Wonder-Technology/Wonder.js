


function serializeFunction (func){
    return func.toString();
    };

function deserializeFunction (funcStr){
    return eval('(' + funcStr + ')');
    };

function serializeValueWithFunction (value){
      return JSON.stringify(value, function (key, val) {
        if (typeof val === "function") {
          return val.toString();
        }
        return val;
      });
    };

function deserializeValueWithFunction (value){
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
