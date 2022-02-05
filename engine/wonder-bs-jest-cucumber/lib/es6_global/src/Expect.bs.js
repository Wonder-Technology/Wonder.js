

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";

var _invokeNotMethod = (function(jsObj, methodName, paramsArr) {
    return jsObj.not[methodName].apply(null, paramsArr)
});

var _invokeMethod = (function(jsObj, methodName, paramsArr) {
    return jsObj[methodName].apply(null, paramsArr)
});

function toEqualFunc(param, target) {
  return Curry._1(param.toEqual, target);
}

function toThrowMessage(param, message) {
  return Curry._1(param.toThrow, message);
}

function toThrow(expectReturnData) {
  return _invokeMethod(expectReturnData, "toThrow", []);
}

function toNotThrow(expectReturnData) {
  return _invokeNotMethod(expectReturnData, "toThrow", []);
}

function toNotEqual(expectReturnData, val) {
  return _invokeNotMethod(expectReturnData, "toEqual", [val]);
}

export {
  _invokeNotMethod ,
  _invokeMethod ,
  toEqualFunc ,
  toThrowMessage ,
  toThrow ,
  toNotThrow ,
  toNotEqual ,
  
}
/* No side effect */
