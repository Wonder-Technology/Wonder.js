

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function isRenderConfigRecordExist(state) {
  return Js_option.isSome(state[/* renderConfigRecord */4]);
}

function setRenderConfig(renderConfig, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* renderConfigRecord */4] = renderConfig;
  return newrecord;
}

export {
  isRenderConfigRecordExist ,
  setRenderConfig ,
  
}
/* No side effect */
