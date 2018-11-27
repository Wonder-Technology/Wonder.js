

import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";

function isDefaultColor(color) {
  return Caml_obj.caml_equal(color, /* array */[
              1,
              1,
              1
            ]);
}

function buildColorFactor(color) {
  var match = isDefaultColor(color);
  if (match) {
    return undefined;
  } else {
    return color.concat(/* array */[1]);
  }
}

export {
  isDefaultColor ,
  buildColorFactor ,
  
}
/* No side effect */
