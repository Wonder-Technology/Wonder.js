

import * as Caml_obj from "../../../../node_modules/bs-platform/lib/es6/caml_obj.js";

function isUndefined(value) {
  return value === undefined;
}

var isNotEqual = Caml_obj.caml_notequal;

export {
  isUndefined ,
  isNotEqual ,
  
}
/* No side effect */
