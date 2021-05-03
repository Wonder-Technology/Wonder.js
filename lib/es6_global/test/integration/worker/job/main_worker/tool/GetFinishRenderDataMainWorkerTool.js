

import * as Sinon from "sinon";
import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function buildFinishRenderData($staropt$star, param) {
  var customData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : Sinon.match.any;
  return {
          operateType: "FINISH_RENDER",
          customData: customData
        };
}

export {
  buildFinishRenderData ,
  
}
/* sinon Not a pure module */
