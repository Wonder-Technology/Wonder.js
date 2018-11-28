

import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getBasicMaterialRenderArray(param) {
  return SparseMapService$Wonderjs.getValidValues(param[/* basicMaterialRenderGameObjectMap */4]);
}

function getLightMaterialRenderArray(param) {
  return SparseMapService$Wonderjs.getValidValues(param[/* lightMaterialRenderGameObjectMap */5]);
}

function removeFromRenderGameObjectMap(meshRenderer, meshRendererRecord) {
  return /* record */[
          /* index */meshRendererRecord[/* index */0],
          /* buffer */meshRendererRecord[/* buffer */1],
          /* drawModes */meshRendererRecord[/* drawModes */2],
          /* isRenders */meshRendererRecord[/* isRenders */3],
          /* basicMaterialRenderGameObjectMap */SparseMapService$WonderCommonlib.deleteVal(meshRenderer, meshRendererRecord[/* basicMaterialRenderGameObjectMap */4]),
          /* lightMaterialRenderGameObjectMap */SparseMapService$WonderCommonlib.deleteVal(meshRenderer, meshRendererRecord[/* lightMaterialRenderGameObjectMap */5]),
          /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
          /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */7]
        ];
}

export {
  getBasicMaterialRenderArray ,
  getLightMaterialRenderArray ,
  removeFromRenderGameObjectMap ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
