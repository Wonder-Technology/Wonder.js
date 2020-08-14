

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as IndicesUtils$Wonderjs from "../utils/IndicesUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "./BatchSetTextureAllDataSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function _batchSetBasicSourceTextureSources(imageBasicSourceTextures, basicSourceTextureImages, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, basicSourceTexture, index) {
                var match = ArrayService$Wonderjs.getNth(index, basicSourceTextureImages);
                if (match !== undefined) {
                  return OperateBasicSourceTextureMainService$Wonderjs.setSource(basicSourceTexture, Caml_option.valFromOption(match), state);
                } else {
                  return state;
                }
              }), state, imageBasicSourceTextures);
}

function convertKeyFromImageIndexToBasicSourceTexture(imageTextureIndexData, basicSourceTextureArr, imageUint8ArrayDataMap) {
  return MutableSparseMapService$WonderCommonlib.reduceiValid((function (resultImageUint8ArrayDataMap, data, imageIndex) {
                return ArrayService$WonderCommonlib.reduceOneParam((function (resultImageUint8ArrayDataMap, basicSourceTexture) {
                              return MutableSparseMapService$WonderCommonlib.set(basicSourceTexture, data, resultImageUint8ArrayDataMap);
                            }), resultImageUint8ArrayDataMap, IndicesUtils$Wonderjs.getBasicSourceTextures(imageIndex, basicSourceTextureArr, imageTextureIndexData));
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), imageUint8ArrayDataMap);
}

function batchSet(param, state) {
  var match = param[2];
  var match$1 = param[1];
  var match$2 = param[0];
  return _batchSetBasicSourceTextureSources(match[0], match[1], BatchSetTextureAllDataSystem$Wonderjs.batchSetBasicSourceTextureData(match$1[0], match$1[1], BatchSetTextureAllDataSystem$Wonderjs.batchSetNewDiffueMaps(match$2[0], match$2[1], state)));
}

export {
  _batchSetBasicSourceTextureSources ,
  convertKeyFromImageIndexToBasicSourceTexture ,
  batchSet ,
  
}
/* ArrayService-Wonderjs Not a pure module */
