

import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/OperateCubemapTextureMainService.js";
import * as BatchSetCubemapTextureAllDataSystem$Wonderjs from "./BatchSetCubemapTextureAllDataSystem.js";

function _batchSetCubemapTextureSources(imageCubemapTextures, default11Image, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, cubemapTexture) {
                return OperateCubemapTextureMainService$Wonderjs.setNZSource(cubemapTexture, default11Image, OperateCubemapTextureMainService$Wonderjs.setPZSource(cubemapTexture, default11Image, OperateCubemapTextureMainService$Wonderjs.setNYSource(cubemapTexture, default11Image, OperateCubemapTextureMainService$Wonderjs.setPYSource(cubemapTexture, default11Image, OperateCubemapTextureMainService$Wonderjs.setNXSource(cubemapTexture, default11Image, OperateCubemapTextureMainService$Wonderjs.setPXSource(cubemapTexture, default11Image, state))))));
              }), state, imageCubemapTextures);
}

function batchSet(param, state) {
  var match = param[1];
  var match$1 = param[0];
  return _batchSetCubemapTextureSources(match[0], match[1], BatchSetCubemapTextureAllDataSystem$Wonderjs.batchSetCubemapTextureData(match$1[0], match$1[1], state));
}

export {
  _batchSetCubemapTextureSources ,
  batchSet ,
  
}
/* OperateCubemapTextureMainService-Wonderjs Not a pure module */
