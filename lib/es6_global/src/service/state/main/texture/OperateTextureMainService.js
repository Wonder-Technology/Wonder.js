

import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ImageDataService$Wonderjs from "../../../primitive/canvas/ImageDataService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function convertNeedAddedSourceArrayToImageDataArr(needAddedSourceArray) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (imageDataArr, param) {
                var match = ImageDataService$Wonderjs.convertImageToImageData(param[1]);
                return ArrayService$Wonderjs.push(/* tuple */[
                            match[0],
                            match[1],
                            match[2],
                            param[0]
                          ], imageDataArr);
              }), /* array */[], needAddedSourceArray.filter((function (param) {
                    return param[1] !== undefined;
                  })));
}

export {
  convertNeedAddedSourceArrayToImageDataArr ,
  
}
/* ArrayService-Wonderjs Not a pure module */
