

import * as Sinon from "sinon";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function buildFinishRenderData($staropt$star, _) {
  var customData = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : Sinon.match.any;
  return {
          operateType: "FINISH_RENDER",
          customData: customData
        };
}

export {
  buildFinishRenderData ,
  
}
/* sinon Not a pure module */
