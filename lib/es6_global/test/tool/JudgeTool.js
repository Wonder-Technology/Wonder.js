

import * as Caml_obj from "./../../../../node_modules/bs-platform/lib/es6/caml_obj.js";

function isUndefined(value) {
  return value === undefined;
}

var isNotEqual = Caml_obj.caml_notequal;

var isEqual = Caml_obj.caml_equal;

var isGreaterThan = Caml_obj.caml_greaterthan;

var isGreaterOrEqualThan = Caml_obj.caml_greaterequal;

function isFunction (func){
    return Object.prototype.toString.call(func).toLowerCase() === "[object function]";
    };

export {
  isUndefined ,
  isNotEqual ,
  isEqual ,
  isGreaterThan ,
  isGreaterOrEqualThan ,
  isFunction ,
  
}
/* No side effect */
