

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ConvertCommon$Wonderjs from "../ConvertCommon.js";

function doesPrimitiveHasMaterial(param) {
  return Js_option.isSome(param[/* material */2]);
}

function doesMeshHasMaterial(param) {
  return doesPrimitiveHasMaterial(ConvertCommon$Wonderjs.getPrimitiveData(param[/* primitives */0]));
}

export {
  doesPrimitiveHasMaterial ,
  doesMeshHasMaterial ,
  
}
/* ConvertCommon-Wonderjs Not a pure module */
