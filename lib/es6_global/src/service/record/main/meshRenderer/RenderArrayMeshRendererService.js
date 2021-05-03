

import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getBasicMaterialRenderGameObjectArray(param) {
  return MutableSparseMapService$WonderCommonlib.getValidValues(param[/* basicMaterialRenderGameObjectMap */4]);
}

function getLightMaterialRenderGameObjectArray(param) {
  return MutableSparseMapService$WonderCommonlib.getValidValues(param[/* lightMaterialRenderGameObjectMap */5]);
}

function removeFromRenderGameObjectMap(meshRenderer, meshRendererRecord) {
  return /* record */[
          /* index */meshRendererRecord[/* index */0],
          /* buffer */meshRendererRecord[/* buffer */1],
          /* drawModes */meshRendererRecord[/* drawModes */2],
          /* isRenders */meshRendererRecord[/* isRenders */3],
          /* basicMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.deleteVal(meshRenderer, meshRendererRecord[/* basicMaterialRenderGameObjectMap */4]),
          /* lightMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.deleteVal(meshRenderer, meshRendererRecord[/* lightMaterialRenderGameObjectMap */5]),
          /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
          /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */7]
        ];
}

export {
  getBasicMaterialRenderGameObjectArray ,
  getLightMaterialRenderGameObjectArray ,
  removeFromRenderGameObjectMap ,
  
}
/* No side effect */
