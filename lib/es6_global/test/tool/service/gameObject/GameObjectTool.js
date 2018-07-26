

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as AllMaterialTool$Wonderjs from "../material/AllMaterialTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ReallocateCPUMemoryJob$Wonderjs from "../../../../src/job/no_worker/loop/ReallocateCPUMemoryJob.js";
import * as DisposeVboBufferService$Wonderjs from "../../../../src/service/record/main/vboBuffer/DisposeVboBufferService.js";
import * as HierachyTransformService$Wonderjs from "../../../../src/service/record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/RecordTransformMainService.js";
import * as DisposeGameObjectMainService$Wonderjs from "../../../../src/service/state/main/gameObject/DisposeGameObjectMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../src/service/record/main/gameObject/GetComponentGameObjectService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../../../src/service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function createGameObject(state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = match[0];
  return /* tuple */[
          state$1,
          gameObject,
          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1)
        ];
}

function getGameObjectRecord(state) {
  return state[/* gameObjectRecord */10];
}

function initGameObject(gameObject, state) {
  return GameObjectAPI$Wonderjs.initGameObject(gameObject, AllMaterialTool$Wonderjs.prepareForInit(state));
}

function batchDisposeGameObject(gameObjectArray, state) {
  var match = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent
      ], gameObjectArray, false, state);
  var state$1 = ReallocateCPUMemoryJob$Wonderjs.execJob(undefined, match[0]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* vboBufferRecord */34] = DisposeVboBufferService$Wonderjs.disposeSourceInstanceVboBuffer(match[3], DisposeVboBufferService$Wonderjs.disposeCustomGeometryVboBuffer(match[2], DisposeVboBufferService$Wonderjs.disposeBoxGeometryVboBuffer(match[1], state$1[/* vboBufferRecord */34])));
  return newrecord;
}

function batchDisposeGameObjectKeepOrder(gameObjectArray, state) {
  var match = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent
      ], gameObjectArray, true, state);
  var state$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* vboBufferRecord */34] = DisposeVboBufferService$Wonderjs.disposeSourceInstanceVboBuffer(match[3], DisposeVboBufferService$Wonderjs.disposeCustomGeometryVboBuffer(match[2], DisposeVboBufferService$Wonderjs.disposeBoxGeometryVboBuffer(match[1], state$1[/* vboBufferRecord */34])));
  return newrecord;
}

function disposeGameObject(gameObject, state) {
  return batchDisposeGameObject(/* array */[gameObject], state);
}

function disposeGameObjectKeepOrder(gameObject, state) {
  return batchDisposeGameObjectKeepOrder(/* array */[gameObject], state);
}

function disposeGameObjectBasicCameraViewComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicCameraViewComponent(state, /* array */[component]);
}

function disposeGameObjectPerspectiveCameraProjectionComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposePerspectiveCameraProjectionComponent(state, /* array */[component]);
}

function disposeGameObjectArcballCameraControllerComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeArcballCameraControllerComponent(state, /* array */[component]);
}

function disposeGameObjectTransformComponent(_, component, isKeepOrder, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state, isKeepOrder, /* array */[component]);
}

function disposeGameObjectBoxGeometryComponentWithoutVboBuffer(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBoxGeometryComponent(state, /* array */[component])[0];
}

function disposeGameObjectCustomGeometryComponentWithoutVboBuffer(_, component, state) {
  var match = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeCustomGeometryComponent(state, /* array */[component]);
  return ReallocateCPUMemoryJob$Wonderjs.execJob(undefined, match[0]);
}

function disposeGameObjectBasicMaterialComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponent(state, /* array */[component]);
}

function disposeGameObjectLightMaterialComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent(state, /* array */[component]);
}

function disposeGameObjectMeshRendererComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeMeshRendererComponent(state, /* array */[component]);
}

function disposeGameObjectDirectionLightComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeDirectionLightComponent(state, /* array */[component]);
}

function disposeGameObjectPointLightComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposePointLightComponent(state, /* array */[component]);
}

function disposeGameObjectSourceInstanceComponent(_, component, state) {
  var partial_arg = /* tuple */[
    DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponent,
    DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent
  ];
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeSourceInstanceComponent(state, false, (function (param, param$1, param$2) {
                  return DisposeGameObjectMainService$Wonderjs.batchDispose(partial_arg, param, param$1, param$2);
                }), /* array */[component])[0];
}

function disposeGameObjectObjectInstanceComponent(_, component, state) {
  return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeObjectInstanceComponent(state, /* array */[component]);
}

function addChild(parentGameObject, childGameObject, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = HierachyTransformService$Wonderjs.setParent(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(parentGameObject, gameObjectRecord), GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(childGameObject, gameObjectRecord), RecordTransformMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function addChildren(parentGameObject, childGameObjectArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, childGameObject) {
                return addChild(parentGameObject, childGameObject, state);
              }), state, childGameObjectArr);
}

export {
  createGameObject ,
  getGameObjectRecord ,
  initGameObject ,
  batchDisposeGameObject ,
  batchDisposeGameObjectKeepOrder ,
  disposeGameObject ,
  disposeGameObjectKeepOrder ,
  disposeGameObjectBasicCameraViewComponent ,
  disposeGameObjectPerspectiveCameraProjectionComponent ,
  disposeGameObjectArcballCameraControllerComponent ,
  disposeGameObjectTransformComponent ,
  disposeGameObjectBoxGeometryComponentWithoutVboBuffer ,
  disposeGameObjectCustomGeometryComponentWithoutVboBuffer ,
  disposeGameObjectBasicMaterialComponent ,
  disposeGameObjectLightMaterialComponent ,
  disposeGameObjectMeshRendererComponent ,
  disposeGameObjectDirectionLightComponent ,
  disposeGameObjectPointLightComponent ,
  disposeGameObjectSourceInstanceComponent ,
  disposeGameObjectObjectInstanceComponent ,
  addChild ,
  addChildren ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
