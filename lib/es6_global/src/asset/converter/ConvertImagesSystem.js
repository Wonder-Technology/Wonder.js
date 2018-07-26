

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function convertToImages(gltf) {
  var images = gltf[/* images */3];
  if (images !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                  return ArrayService$Wonderjs.push(/* record */[
                              /* bufferView */OptionService$Wonderjs.unsafeGet(param[/* bufferView */2]),
                              /* mimeType */OptionService$Wonderjs.unsafeGet(param[/* mimeType */3])
                            ], arr);
                }), /* array */[], images);
  }
  
}

export {
  convertToImages ,
  
}
/* ArrayService-Wonderjs Not a pure module */
