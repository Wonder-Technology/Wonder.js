

import * as Caml_array from "./../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../service/primitive/component/AliveComponentService.js";
import * as StaticTransformService$Wonderjs from "../service/primitive/instance/StaticTransformService.js";
import * as CreateSourceInstanceMainService$Wonderjs from "../service/state/main/instance/CreateSourceInstanceMainService.js";
import * as GameObjectSourceInstanceService$Wonderjs from "../service/record/main/instance/sourceInstance/GameObjectSourceInstanceService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../service/state/main/instance/RecordSourceInstanceMainService.js";
import * as DisposeSourceInstanceMainService$Wonderjs from "../service/state/main/instance/DisposeSourceInstanceMainService.js";
import * as GetObjectInstanceArrayMainService$Wonderjs from "../service/state/main/instance/GetObjectInstanceArrayMainService.js";
import * as CreateObjectInstanceGameObjectMainService$Wonderjs from "../service/state/main/instance/CreateObjectInstanceGameObjectMainService.js";

function unsafeGetSourceInstanceGameObject(sourceInstance, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(sourceInstance, DisposeSourceInstanceMainService$Wonderjs.isAlive, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectSourceInstanceService$Wonderjs.unsafeGetGameObject(sourceInstance, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
}

function createObjectInstanceGameObject(sourceInstance, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(sourceInstance, DisposeSourceInstanceMainService$Wonderjs.isAlive, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return CreateObjectInstanceGameObjectMainService$Wonderjs.createInstance(sourceInstance, state);
}

function getSourceInstanceObjectInstanceTransformArray(sourceInstance, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(sourceInstance, DisposeSourceInstanceMainService$Wonderjs.isAlive, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetObjectInstanceArrayMainService$Wonderjs.getObjectInstanceTransformArray(sourceInstance, state);
}

function markSourceInstanceModelMatrixIsStatic(sourceInstance, isStatic, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(sourceInstance, DisposeSourceInstanceMainService$Wonderjs.isAlive, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  newrecord[/* sourceInstanceRecord */6] = /* record */[
    /* index */init[/* index */0],
    /* objectInstanceTransformIndexMap */init[/* objectInstanceTransformIndexMap */1],
    /* buffer */init[/* buffer */2],
    /* isTransformStatics */StaticTransformService$Wonderjs.markModelMatrixIsStatic(sourceInstance, isStatic, RecordSourceInstanceMainService$Wonderjs.getRecord(state)[/* isTransformStatics */3]),
    /* objectInstanceTransformCollections */init[/* objectInstanceTransformCollections */4],
    /* matrixInstanceBufferCapacityMap */init[/* matrixInstanceBufferCapacityMap */5],
    /* matrixFloat32ArrayMap */init[/* matrixFloat32ArrayMap */6],
    /* isSendTransformMatrixDataMap */init[/* isSendTransformMatrixDataMap */7],
    /* disposedIndexArray */init[/* disposedIndexArray */8],
    /* gameObjectMap */init[/* gameObjectMap */9]
  ];
  return newrecord;
}

var createSourceInstance = CreateSourceInstanceMainService$Wonderjs.create;

export {
  createSourceInstance ,
  unsafeGetSourceInstanceGameObject ,
  createObjectInstanceGameObject ,
  getSourceInstanceObjectInstanceTransformArray ,
  markSourceInstanceModelMatrixIsStatic ,
  
}
/* Contract-WonderLog Not a pure module */
