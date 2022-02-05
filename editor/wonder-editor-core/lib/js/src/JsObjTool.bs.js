'use strict';


var invokeObjMethod = (function(jsObj, methodName, paramsArr) {
    return jsObj[methodName].apply(null, paramsArr)
});

var getObjValue = (function(jsObj,key ) {
    return jsObj[key]
});

exports.invokeObjMethod = invokeObjMethod;
exports.getObjValue = getObjValue;
/* No side effect */
