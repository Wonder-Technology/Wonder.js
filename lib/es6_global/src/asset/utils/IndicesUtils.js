

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function getBasicSourceTextures(imageIndex, basicSourceTextureArr, param) {
  var textureIndices = param[/* textureIndices */0];
  return ArrayService$WonderCommonlib.reduceOneParami((function (indexArr, imageSource, index) {
                  var match = imageSource === imageIndex;
                  if (match) {
                    return ArrayService$Wonderjs.push(index, indexArr);
                  } else {
                    return indexArr;
                  }
                }), /* array */[], param[/* imageIndices */1]).map((function (index) {
                return basicSourceTextureArr[textureIndices[index]];
              }));
}

export {
  getBasicSourceTextures ,
  
}
/* ArrayService-Wonderjs Not a pure module */
