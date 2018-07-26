

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";

var _setRenderGameObject = SparseMapService$WonderCommonlib.set;

function handleAddComponent(meshRenderer, gameObjectUid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var meshRendererRecord = state[/* meshRendererRecord */24];
  var lightMaterialRenderGameObjectMap = meshRendererRecord[/* lightMaterialRenderGameObjectMap */2];
  var basicMaterialRenderGameObjectMap = meshRendererRecord[/* basicMaterialRenderGameObjectMap */1];
  var match = HasComponentGameObjectService$Wonderjs.hasBasicMaterialComponent(gameObjectUid, gameObjectRecord);
  var basicMaterialRenderGameObjectMap$1 = match ? SparseMapService$WonderCommonlib.set(meshRenderer, gameObjectUid, basicMaterialRenderGameObjectMap) : basicMaterialRenderGameObjectMap;
  var match$1 = HasComponentGameObjectService$Wonderjs.hasLightMaterialComponent(gameObjectUid, gameObjectRecord);
  var lightMaterialRenderGameObjectMap$1 = match$1 ? SparseMapService$WonderCommonlib.set(meshRenderer, gameObjectUid, lightMaterialRenderGameObjectMap) : lightMaterialRenderGameObjectMap;
  var newrecord = Caml_array.caml_array_dup(state);
  return Contract$WonderLog.ensureCheck((function (state) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("should add material component before add meshRenderer component", "not(the gameObjectUid is " + (String(gameObjectUid) + ")")), (function () {
                              var match = state[/* meshRendererRecord */24];
                              return Contract$WonderLog.assertTrue(match[/* basicMaterialRenderGameObjectMap */1].includes(gameObjectUid) || match[/* lightMaterialRenderGameObjectMap */2].includes(gameObjectUid));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), (newrecord[/* meshRendererRecord */24] = /* record */[
                /* index */meshRendererRecord[/* index */0],
                /* basicMaterialRenderGameObjectMap */basicMaterialRenderGameObjectMap$1,
                /* lightMaterialRenderGameObjectMap */lightMaterialRenderGameObjectMap$1,
                /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(meshRenderer, gameObjectUid, meshRendererRecord[/* gameObjectMap */3]),
                /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */4]
              ], newrecord));
}

export {
  _setRenderGameObject ,
  handleAddComponent ,
  
}
/* Log-WonderLog Not a pure module */
