

import * as Contract$WonderLog from "./../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../service/primitive/component/AliveComponentService.js";
import * as DisposeMeshRendererService$Wonderjs from "../service/record/main/meshRenderer/DisposeMeshRendererService.js";
import * as CreateMeshRendererMainService$Wonderjs from "../service/state/main/meshRenderer/CreateMeshRendererMainService.js";
import * as GameObjectMeshRendererService$Wonderjs from "../service/record/main/meshRenderer/GameObjectMeshRendererService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../service/state/main/meshRenderer/RecordMeshRendererMainService.js";
import * as OperateMeshRendererMainService$Wonderjs from "../service/state/main/meshRenderer/OperateMeshRendererMainService.js";

function createMeshRenderer(state) {
  return CreateMeshRendererMainService$Wonderjs.create(state);
}

function unsafeGetMeshRendererGameObject(meshRenderer, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(meshRenderer, DisposeMeshRendererService$Wonderjs.isAlive, RecordMeshRendererMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectMeshRendererService$Wonderjs.unsafeGetGameObject(meshRenderer, RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getMeshRendererDrawMode(meshRenderer, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(meshRenderer, DisposeMeshRendererService$Wonderjs.isAlive, RecordMeshRendererMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateMeshRendererMainService$Wonderjs.getDrawMode(meshRenderer, state);
}

function setMeshRendererDrawMode(meshRenderer, drawMode, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(meshRenderer, DisposeMeshRendererService$Wonderjs.isAlive, RecordMeshRendererMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateMeshRendererMainService$Wonderjs.setDrawMode(meshRenderer, drawMode, state);
}

function getMeshRendererIsRender(meshRenderer, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(meshRenderer, DisposeMeshRendererService$Wonderjs.isAlive, RecordMeshRendererMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateMeshRendererMainService$Wonderjs.getIsRender(meshRenderer, state);
}

function setMeshRendererIsRender(meshRenderer, isRender, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(meshRenderer, DisposeMeshRendererService$Wonderjs.isAlive, RecordMeshRendererMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateMeshRendererMainService$Wonderjs.setIsRender(meshRenderer, isRender, state);
}

export {
  createMeshRenderer ,
  unsafeGetMeshRendererGameObject ,
  getMeshRendererDrawMode ,
  setMeshRendererDrawMode ,
  getMeshRendererIsRender ,
  setMeshRendererIsRender ,
  
}
/* Contract-WonderLog Not a pure module */
