

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureIndexService$Wonderjs from "../../../primitive/material/TextureIndexService.js";
import * as BufferMaterialService$Wonderjs from "../../../record/main/material/BufferMaterialService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../texture/source/IndexSourceTextureMainService.js";
import * as DisposeBasicSourceTextureMainService$Wonderjs from "../texture/source/basic_source/DisposeBasicSourceTextureMainService.js";
import * as DisposeArrayBufferViewSourceTextureMainService$Wonderjs from "../texture/source/arrayBufferView_source/DisposeArrayBufferViewSourceTextureMainService.js";

function disposeTextureIndices(material, getTextureIndicesIndexFunc, textureIndices) {
  var sourceIndex = Curry._1(getTextureIndicesIndexFunc, material);
  var defaultIndex = TextureIndexService$Wonderjs.getDefaultTextureIndex(/* () */0);
  for(var i = 0 ,i_finish = BufferMaterialService$Wonderjs.getTextureIndicesSize(/* () */0) - 1 | 0; i <= i_finish; ++i){
    textureIndices[sourceIndex + i | 0] = defaultIndex;
  }
  return textureIndices;
}

var isAlive = DisposeComponentService$Wonderjs.isAlive;

function _getExistMapArr(mapArr) {
  return mapArr.filter(Js_option.isSome).map(OptionService$Wonderjs.unsafeGet);
}

function addAllMaps(mapArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, map) {
                var arrayBufferViewSourceTextureArr = param[1];
                var basicSourceTextureArr = param[0];
                var match = IndexSourceTextureMainService$Wonderjs.isBasicSourceTextureIndex(map, state);
                if (match) {
                  return /* tuple */[
                          ArrayService$Wonderjs.push(map, basicSourceTextureArr),
                          arrayBufferViewSourceTextureArr
                        ];
                } else {
                  var match$1 = IndexSourceTextureMainService$Wonderjs.isArrayBufferViewSourceTextureIndex(map, state);
                  if (match$1) {
                    return /* tuple */[
                            basicSourceTextureArr,
                            ArrayService$Wonderjs.push(map, arrayBufferViewSourceTextureArr)
                          ];
                  } else {
                    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addAllMaps", "unknown map: " + (String(map) + ""), "", "", ""));
                  }
                }
              }), /* tuple */[
              ArrayService$WonderCommonlib.createEmpty(/* () */0),
              ArrayService$WonderCommonlib.createEmpty(/* () */0)
            ], _getExistMapArr(mapArr));
}

function disposeSourceMaps(isRemoveTexture, materialData, mapArr, state) {
  var match = addAllMaps(mapArr, state);
  return DisposeArrayBufferViewSourceTextureMainService$Wonderjs.handleDispose(isRemoveTexture, materialData, match[1], DisposeBasicSourceTextureMainService$Wonderjs.handleDispose(isRemoveTexture, materialData, match[0], state));
}

export {
  disposeTextureIndices ,
  isAlive ,
  _getExistMapArr ,
  addAllMaps ,
  disposeSourceMaps ,
  
}
/* Log-WonderLog Not a pure module */
