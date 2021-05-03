

import * as GenerateSceneGraphSystem$Wonderjs from "../../asset/generate/GenerateSceneGraphSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function generateGLBData(sceneGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) {
  return GenerateSceneGraphSystem$Wonderjs.generateGLBData(sceneGameObject, (imageUint8ArrayMap == null) ? MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0) : imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state);
}

function generateWDB(sceneGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) {
  return GenerateSceneGraphSystem$Wonderjs.generateWDB(sceneGameObject, (imageUint8ArrayMap == null) ? MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0) : imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state);
}

export {
  generateGLBData ,
  generateWDB ,
  
}
/* GenerateSceneGraphSystem-Wonderjs Not a pure module */
