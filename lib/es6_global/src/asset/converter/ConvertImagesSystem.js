

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";

var _buildDefaultName = ConvertCommon$Wonderjs.buildDefaultImageName;

function convertToImages(gltf) {
  var images = gltf[/* images */3];
  if (images !== undefined) {
    return ArrayService$Wonderjs.reduceOneParamValidi((function (arr, param, index) {
                  var name = param[/* name */1];
                  arr[index] = /* record */[
                    /* name */name !== undefined ? name : ConvertCommon$Wonderjs.buildDefaultImageName(index),
                    /* bufferView */OptionService$Wonderjs.unsafeGet(param[/* bufferView */2]),
                    /* mimeType */OptionService$Wonderjs.unsafeGet(param[/* mimeType */3])
                  ];
                  return arr;
                }), /* array */[], images);
  }
  
}

export {
  _buildDefaultName ,
  convertToImages ,
  
}
/* ArrayService-Wonderjs Not a pure module */
