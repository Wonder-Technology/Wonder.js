

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getScriptAPIJsObj(state) {
  return state[/* apiRecord */43][/* scriptAPIJsObj */0];
}

function setScriptAPIJsObj(scriptAPIJsObj, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* apiRecord */43];
  newrecord[/* apiRecord */43] = /* record */[
    /* scriptAPIJsObj */scriptAPIJsObj,
    /* imguiAPIJsObj */init[/* imguiAPIJsObj */1]
  ];
  return newrecord;
}

export {
  getScriptAPIJsObj ,
  setScriptAPIJsObj ,
  
}
/* No side effect */
