

import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/source/basic_source/OperateBasicSourceTextureMainService.js";
import * as BatchSetBasicSourceTextureAllDataSystem$Wonderjs from "./BatchSetBasicSourceTextureAllDataSystem.js";

function _batchSetBasicSourceTextureSources(imageBasicSourceTextures, default11Image, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, basicSourceTexture, index) {
                return OperateBasicSourceTextureMainService$Wonderjs.setSource(basicSourceTexture, default11Image, state);
              }), state, imageBasicSourceTextures);
}

function batchSet(param, state) {
  var match = param[2];
  var match$1 = param[1];
  var match$2 = param[0];
  return _batchSetBasicSourceTextureSources(match[0], match[1], BatchSetBasicSourceTextureAllDataSystem$Wonderjs.batchSetBasicSourceTextureData(match$1[0], match$1[1], BatchSetBasicSourceTextureAllDataSystem$Wonderjs.batchSetNewDiffueMaps(match$2[0], match$2[1], state)));
}

export {
  _batchSetBasicSourceTextureSources ,
  batchSet ,
  
}
/* OperateBasicSourceTextureMainService-Wonderjs Not a pure module */
