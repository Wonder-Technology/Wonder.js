

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as ArrayMapService$Wonderjs from "../../../../src/service/atom/ArrayMapService.js";
import * as ComponentMapService$Wonderjs from "../../../../src/service/primitive/gameObject/ComponentMapService.js";
import * as MemorySettingService$Wonderjs from "../../../../src/service/record/main/setting/MemorySettingService.js";
import * as DisposePointLightService$Wonderjs from "../../../../src/service/record/main/light/point/DisposePointLightService.js";
import * as DisposeGeometryMainService$Wonderjs from "../../../../src/service/state/main/geometry/DisposeGeometryMainService.js";
import * as DisposeTransformMainService$Wonderjs from "../../../../src/service/state/main/transform/DisposeTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../../../../src/service/state/main/light/point/RecordPointLightMainService.js";
import * as DisposeDirectionLightService$Wonderjs from "../../../../src/service/record/main/light/direction/DisposeDirectionLightService.js";
import * as DisposeBasicCameraViewService$Wonderjs from "../../../../src/service/record/main/basic_camera_view/DisposeBasicCameraViewService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../../../src/service/state/main/light/direction/RecordDirectionLightMainService.js";
import * as DisposeObjectInstanceMainService$Wonderjs from "../../../../src/service/state/main/instance/DisposeObjectInstanceMainService.js";
import * as DisposeSourceInstanceMainService$Wonderjs from "../../../../src/service/state/main/instance/DisposeSourceInstanceMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../../../src/service/state/main/gameObject/DisposeComponentGameObjectMainService.js";
import * as DisposePerspectiveCameraProjectionService$Wonderjs from "../../../../src/service/record/main/perspective_camera_projection/DisposePerspectiveCameraProjectionService.js";

function deferDisposeBasicCameraViewComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedBasicCameraViewArray */12] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBasicCameraViewArray */12]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePerspectiveCameraProjectionComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedPerspectiveCameraProjectionArray */15] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedPerspectiveCameraProjectionArray */15]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedTransformArray */13] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedTransformArray */13]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponentForKeepOrder(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedTransformArrayForKeepOrder */14] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedTransformArrayForKeepOrder */14]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBasicMaterialComponent(gameObject, component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedBasicMaterialDataMap */18] = ArrayMapService$Wonderjs.addValue(component, gameObject, state[/* gameObjectRecord */10][/* disposedBasicMaterialDataMap */18]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeLightMaterialComponent(gameObject, component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedLightMaterialDataMap */19] = ArrayMapService$Wonderjs.addValue(component, gameObject, state[/* gameObjectRecord */10][/* disposedLightMaterialDataMap */19]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeGeometryComponent(gameObject, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedGeometryDataMap */21] = ArrayMapService$Wonderjs.addValue(component, gameObject, gameObjectRecord[/* disposedGeometryDataMap */21]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeSourceInstanceComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedSourceInstanceArray */22] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedSourceInstanceArray */22]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeObjectInstanceComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedObjectInstanceArray */23] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedObjectInstanceArray */23]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeDirectionLightComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedDirectionLightArray */24] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedDirectionLightArray */24]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePointLightComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedPointLightArray */25] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedPointLightArray */25]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeMeshRendererComponent(uid, component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedMeshRendererComponentArray */26] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedMeshRendererComponentArray */26]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function batchDisposeBasicCameraViewComponent(state, componentArray) {
  var basicCameraViewRecord = state[/* basicCameraViewRecord */13];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicCameraViewRecord */13] = ComponentMapService$Wonderjs.batchDisposeComponent(basicCameraViewRecord, DisposeBasicCameraViewService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposePerspectiveCameraProjectionComponent(state, componentArray) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = ComponentMapService$Wonderjs.batchDisposeComponent(perspectiveCameraProjectionRecord, DisposePerspectiveCameraProjectionService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

var batchDisposeMeshRendererComponent = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeMeshRendererComponent;

function batchDisposeTransformComponent(state, isKeepOrder, componentArray) {
  return DisposeTransformMainService$Wonderjs.handleBatchDisposeComponent(componentArray, MemorySettingService$Wonderjs.getMaxTypeArrayPoolSize(state[/* settingRecord */0]), isKeepOrder, state);
}

function batchDisposeGeometryComponentData(state, geometryDataArray) {
  return DisposeGeometryMainService$Wonderjs.handleBatchDisposeComponentData(geometryDataArray, state);
}

function batchDisposeBasicMaterialComponent(state, componentDataArray) {
  return (function (param) {
      return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponentData(state, componentDataArray, param);
    });
}

function batchDisposeLightMaterialComponent(state, componentDataArray) {
  return (function (param) {
      return DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponentData(state, componentDataArray, param);
    });
}

function batchDisposeDirectionLightComponent(state, componentArray) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = ComponentMapService$Wonderjs.batchDisposeComponent(RecordDirectionLightMainService$Wonderjs.getRecord(state), DisposeDirectionLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposePointLightComponent(state, componentArray) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = ComponentMapService$Wonderjs.batchDisposeComponent(RecordPointLightMainService$Wonderjs.getRecord(state), DisposePointLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposeSourceInstanceComponent(state, isKeepOrder, disposeGameObjectFunc, componentArray) {
  return DisposeSourceInstanceMainService$Wonderjs.handleBatchDisposeComponent(componentArray, isKeepOrder, disposeGameObjectFunc, state);
}

function batchDisposeObjectInstanceComponent(state, componentArray) {
  var match = componentArray.length;
  if (match !== 0) {
    return DisposeObjectInstanceMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
  } else {
    return state;
  }
}

export {
  deferDisposeBasicCameraViewComponent ,
  deferDisposePerspectiveCameraProjectionComponent ,
  deferDisposeTransformComponent ,
  deferDisposeTransformComponentForKeepOrder ,
  deferDisposeBasicMaterialComponent ,
  deferDisposeLightMaterialComponent ,
  deferDisposeGeometryComponent ,
  deferDisposeSourceInstanceComponent ,
  deferDisposeObjectInstanceComponent ,
  deferDisposeDirectionLightComponent ,
  deferDisposePointLightComponent ,
  deferDisposeMeshRendererComponent ,
  batchDisposeBasicCameraViewComponent ,
  batchDisposePerspectiveCameraProjectionComponent ,
  batchDisposeMeshRendererComponent ,
  batchDisposeTransformComponent ,
  batchDisposeGeometryComponentData ,
  batchDisposeBasicMaterialComponent ,
  batchDisposeLightMaterialComponent ,
  batchDisposeDirectionLightComponent ,
  batchDisposePointLightComponent ,
  batchDisposeSourceInstanceComponent ,
  batchDisposeObjectInstanceComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
