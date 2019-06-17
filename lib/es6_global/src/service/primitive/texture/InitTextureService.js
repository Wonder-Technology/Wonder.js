

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateGlTextureMapService$Wonderjs from "./OperateGlTextureMapService.js";

function initTexture(gl, texture, glTextureMap) {
  var match = OperateGlTextureMapService$Wonderjs.getTexture(texture, glTextureMap);
  if (match !== undefined) {
    return glTextureMap;
  } else {
    return OperateGlTextureMapService$Wonderjs.setTexture(texture, gl.createTexture(), glTextureMap);
  }
}

function initTexturesWithIndexArray(gl, textureIndexArray, glTextureMap) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (glTextureMap, textureIndex) {
                return initTexture(gl, textureIndex, glTextureMap);
              }), glTextureMap, textureIndexArray);
}

var initTextures = initTexturesWithIndexArray;

export {
  initTexture ,
  initTexturesWithIndexArray ,
  initTextures ,
  
}
/* OperateGlTextureMapService-Wonderjs Not a pure module */
