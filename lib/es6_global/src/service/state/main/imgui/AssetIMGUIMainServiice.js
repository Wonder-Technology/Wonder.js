

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as AssetIMGUIAPI$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/AssetIMGUIAPI.js";
import * as ImageDataService$Wonderjs from "../../../primitive/canvas/ImageDataService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AssetIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/io/AssetIMGUIService.js";
import * as RecordIMGUIMainService$Wonderjs from "./RecordIMGUIMainService.js";

function convertBitmapToImageData(state) {
  var match = AssetIMGUIService$WonderImgui.getBitmap(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
  if (match !== undefined) {
    return ImageDataService$Wonderjs.convertImageToImageData(Caml_option.valFromOption(match));
  }
  
}

function convertCustomTextureSourcesToImageDataArr(state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (imageDataArr, param) {
                return ArrayService$Wonderjs.push(/* tuple */[
                            ImageDataService$Wonderjs.convertImageToImageData(param[0]),
                            param[1],
                            param[2]
                          ], imageDataArr);
              }), /* array */[], AssetIMGUIAPI$WonderImgui.getCustomImageArr(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state)));
}

export {
  convertBitmapToImageData ,
  convertCustomTextureSourcesToImageDataArr ,
  
}
/* ArrayService-Wonderjs Not a pure module */
