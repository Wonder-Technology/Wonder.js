

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getFileExtName(str) {
  var match = (/^.*(\.\w+)$/).exec(str);
  if (match !== null) {
    return Caml_array.caml_array_get(match, 1);
  }
  
}

export {
  getFileExtName ,
  
}
/* No side effect */
