

import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GenerateSceneGraphSystem$Wonderjs from "../../asset/generate/GenerateSceneGraphSystem.js";

function generateGLBData(sceneGameObject, imageUint8ArrayMap, state) {
  return GenerateSceneGraphSystem$Wonderjs.generateGLBData(sceneGameObject, (imageUint8ArrayMap == null) ? SparseMapService$WonderCommonlib.createEmpty(/* () */0) : imageUint8ArrayMap, state);
}

function generateWDB(sceneGameObject, imageUint8ArrayMap, state) {
  return GenerateSceneGraphSystem$Wonderjs.generateWDB(sceneGameObject, (imageUint8ArrayMap == null) ? SparseMapService$WonderCommonlib.createEmpty(/* () */0) : imageUint8ArrayMap, state);
}

export {
  generateGLBData ,
  generateWDB ,
  
}
/* GenerateSceneGraphSystem-Wonderjs Not a pure module */
