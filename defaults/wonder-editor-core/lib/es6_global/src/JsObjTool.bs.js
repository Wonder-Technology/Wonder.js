


var invokeObjMethod = (function(jsObj, methodName, paramsArr) {
    return jsObj[methodName].apply(null, paramsArr)
});

var getObjValue = (function(jsObj,key ) {
    return jsObj[key]
});

export {
  invokeObjMethod ,
  getObjValue ,
  
}
/* No side effect */
