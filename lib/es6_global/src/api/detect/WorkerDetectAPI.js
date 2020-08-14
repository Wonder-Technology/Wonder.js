

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Worker$Wonderjs from "../../external/Worker.js";
import * as DomService$Wonderjs from "../../service/primitive/DomService.js";
import * as DetectService$Wonderjs from "../../service/primitive/DetectService.js";

function isSupportRenderWorkerAndSharedArrayBuffer(param) {
  var isSupportSharedArrayBuffer = Worker$Wonderjs.isSupportSharedArrayBuffer(/* () */0);
  var match = !isSupportSharedArrayBuffer;
  if (match) {
    return false;
  } else {
    return Curry._2(DetectService$Wonderjs.hasProperty, "transferControlToOffscreen", DomService$Wonderjs.buildCanvas());
  }
}

export {
  isSupportRenderWorkerAndSharedArrayBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
