

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";
import * as RecordMeshRendererMainService$Wonderjs from "./RecordMeshRendererMainService.js";
import * as OperateMeshRendererMainService$Wonderjs from "./OperateMeshRendererMainService.js";
import * as RenderArrayMeshRendererMainService$Wonderjs from "./RenderArrayMeshRendererMainService.js";

function handleAddComponent(meshRenderer, gameObjectUid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("should add material component before add meshRenderer component", "not(the gameObjectUid is " + (String(gameObjectUid) + ")")), (function (param) {
                        return Contract$WonderLog.assertTrue(HasComponentGameObjectService$Wonderjs.hasBasicMaterialComponent(gameObjectUid, state[/* gameObjectRecord */10]) || HasComponentGameObjectService$Wonderjs.hasLightMaterialComponent(gameObjectUid, state[/* gameObjectRecord */10]));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var match = OperateMeshRendererMainService$Wonderjs.getIsRender(meshRenderer, state);
  var meshRendererRecord$1 = match ? RenderArrayMeshRendererMainService$Wonderjs.addToRenderGameObjectMap(meshRenderer, gameObjectUid, meshRendererRecord, gameObjectRecord) : meshRendererRecord;
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */23] = /* record */[
    /* index */meshRendererRecord$1[/* index */0],
    /* buffer */meshRendererRecord$1[/* buffer */1],
    /* drawModes */meshRendererRecord$1[/* drawModes */2],
    /* isRenders */meshRendererRecord$1[/* isRenders */3],
    /* basicMaterialRenderGameObjectMap */meshRendererRecord$1[/* basicMaterialRenderGameObjectMap */4],
    /* lightMaterialRenderGameObjectMap */meshRendererRecord$1[/* lightMaterialRenderGameObjectMap */5],
    /* gameObjectMap */AddComponentService$Wonderjs.addComponentToGameObjectMap(meshRenderer, gameObjectUid, meshRendererRecord$1[/* gameObjectMap */6]),
    /* disposedIndexArray */meshRendererRecord$1[/* disposedIndexArray */7]
  ];
  return newrecord;
}

export {
  handleAddComponent ,
  
}
/* Log-WonderLog Not a pure module */
