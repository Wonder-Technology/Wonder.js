

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RestoreShaderFromStateService$Wonderjs from "../../../primitive/shader/RestoreShaderFromStateService.js";

function restore(intersectShaderIndexDataArray, currentState, targetState) {
  var match = currentState[/* programRecord */28];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* programRecord */28] = /* record */[
    /* programMap */RestoreShaderFromStateService$Wonderjs.getIntersectShaderRelatedMap(intersectShaderIndexDataArray, match[/* programMap */0]),
    /* lastUsedProgram */undefined
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* RestoreShaderFromStateService-Wonderjs Not a pure module */
