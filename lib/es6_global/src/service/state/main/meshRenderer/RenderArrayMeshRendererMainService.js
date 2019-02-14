

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";
import * as RecordMeshRendererMainService$Wonderjs from "./RecordMeshRendererMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RenderArrayMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/RenderArrayMeshRendererService.js";

var _setRenderGameObject = MutableSparseMapService$WonderCommonlib.set;

function addToRenderGameObjectMap(meshRenderer, gameObjectUid, meshRendererRecord, gameObjectRecord) {
  var lightMaterialRenderGameObjectMap = meshRendererRecord[/* lightMaterialRenderGameObjectMap */5];
  var basicMaterialRenderGameObjectMap = meshRendererRecord[/* basicMaterialRenderGameObjectMap */4];
  var match = HasComponentGameObjectService$Wonderjs.hasBasicMaterialComponent(gameObjectUid, gameObjectRecord);
  var match$1 = HasComponentGameObjectService$Wonderjs.hasLightMaterialComponent(gameObjectUid, gameObjectRecord);
  return /* record */[
          /* index */meshRendererRecord[/* index */0],
          /* buffer */meshRendererRecord[/* buffer */1],
          /* drawModes */meshRendererRecord[/* drawModes */2],
          /* isRenders */meshRendererRecord[/* isRenders */3],
          /* basicMaterialRenderGameObjectMap */match ? MutableSparseMapService$WonderCommonlib.set(meshRenderer, gameObjectUid, basicMaterialRenderGameObjectMap) : basicMaterialRenderGameObjectMap,
          /* lightMaterialRenderGameObjectMap */match$1 ? MutableSparseMapService$WonderCommonlib.set(meshRenderer, gameObjectUid, lightMaterialRenderGameObjectMap) : lightMaterialRenderGameObjectMap,
          /* gameObjectMap */meshRendererRecord[/* gameObjectMap */6],
          /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */7]
        ];
}

function removeFromRenderGameObjectMap(meshRenderer, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */23] = RenderArrayMeshRendererService$Wonderjs.removeFromRenderGameObjectMap(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state));
  return newrecord;
}

export {
  _setRenderGameObject ,
  addToRenderGameObjectMap ,
  removeFromRenderGameObjectMap ,
  
}
/* HasComponentGameObjectService-Wonderjs Not a pure module */
