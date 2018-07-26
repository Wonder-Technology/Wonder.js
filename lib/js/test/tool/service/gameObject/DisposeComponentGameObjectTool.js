'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var ComponentMapService$Wonderjs = require("../../../../src/service/primitive/gameObject/ComponentMapService.js");
var MemorySettingService$Wonderjs = require("../../../../src/service/record/main/setting/MemorySettingService.js");
var DisposePointLightService$Wonderjs = require("../../../../src/service/record/main/light/point/DisposePointLightService.js");
var DisposeTransformMainService$Wonderjs = require("../../../../src/service/state/main/transform/DisposeTransformMainService.js");
var DisposeDirectionLightService$Wonderjs = require("../../../../src/service/record/main/light/direction/DisposeDirectionLightService.js");
var DisposeBasicCameraViewService$Wonderjs = require("../../../../src/service/record/main/basic_camera_view/DisposeBasicCameraViewService.js");
var DisposeBoxGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/box/DisposeBoxGeometryMainService.js");
var DisposeCustomGeometryMainService$Wonderjs = require("../../../../src/service/state/main/geometry/custom/DisposeCustomGeometryMainService.js");
var DisposeObjectInstanceMainService$Wonderjs = require("../../../../src/service/state/main/instance/DisposeObjectInstanceMainService.js");
var DisposeSourceInstanceMainService$Wonderjs = require("../../../../src/service/state/main/instance/DisposeSourceInstanceMainService.js");
var DisposeComponentGameObjectMainService$Wonderjs = require("../../../../src/service/state/main/gameObject/DisposeComponentGameObjectMainService.js");
var DisposePerspectiveCameraProjectionService$Wonderjs = require("../../../../src/service/record/main/perspective_camera_projection/DisposePerspectiveCameraProjectionService.js");

function deferDisposeBasicCameraViewComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedBasicCameraViewArray */6] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBasicCameraViewArray */6]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePerspectiveCameraProjectionComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedPerspectiveCameraProjectionArray */9] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedPerspectiveCameraProjectionArray */9]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedTransformArray */7] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedTransformArray */7]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponentForKeepOrder(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedTransformArrayForKeepOrder */8] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedTransformArrayForKeepOrder */8]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBasicMaterialComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedBasicMaterialArray */11] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBasicMaterialArray */11]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeLightMaterialComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedLightMaterialArray */12] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedLightMaterialArray */12]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBoxGeometryComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedBoxGeometryArray */13] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBoxGeometryArray */13]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeCustomGeometryComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedCustomGeometryArray */14] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedCustomGeometryArray */14]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeSourceInstanceComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedSourceInstanceArray */15] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedSourceInstanceArray */15]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeObjectInstanceComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedObjectInstanceArray */16] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedObjectInstanceArray */16]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeDirectionLightComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedDirectionLightArray */17] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedDirectionLightArray */17]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePointLightComponent(component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedPointLightArray */18] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedPointLightArray */18]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeMeshRendererComponent(_, component, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(state[/* gameObjectRecord */10]);
  newrecord$1[/* disposedMeshRendererComponentArray */19] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedMeshRendererComponentArray */19]);
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

function batchDisposeBoxGeometryComponent(state, componentArray) {
  return DisposeBoxGeometryMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeCustomGeometryComponent(state, componentArray) {
  return DisposeCustomGeometryMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

var batchDisposeBasicMaterialComponent = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponent;

var batchDisposeLightMaterialComponent = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponent;

function batchDisposeDirectionLightComponent(state, componentArray) {
  var directionLightRecord = state[/* directionLightRecord */20];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */20] = ComponentMapService$Wonderjs.batchDisposeComponent(directionLightRecord, DisposeDirectionLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposePointLightComponent(state, componentArray) {
  var pointLightRecord = state[/* pointLightRecord */21];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */21] = ComponentMapService$Wonderjs.batchDisposeComponent(pointLightRecord, DisposePointLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
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

exports.deferDisposeBasicCameraViewComponent = deferDisposeBasicCameraViewComponent;
exports.deferDisposePerspectiveCameraProjectionComponent = deferDisposePerspectiveCameraProjectionComponent;
exports.deferDisposeTransformComponent = deferDisposeTransformComponent;
exports.deferDisposeTransformComponentForKeepOrder = deferDisposeTransformComponentForKeepOrder;
exports.deferDisposeBasicMaterialComponent = deferDisposeBasicMaterialComponent;
exports.deferDisposeLightMaterialComponent = deferDisposeLightMaterialComponent;
exports.deferDisposeBoxGeometryComponent = deferDisposeBoxGeometryComponent;
exports.deferDisposeCustomGeometryComponent = deferDisposeCustomGeometryComponent;
exports.deferDisposeSourceInstanceComponent = deferDisposeSourceInstanceComponent;
exports.deferDisposeObjectInstanceComponent = deferDisposeObjectInstanceComponent;
exports.deferDisposeDirectionLightComponent = deferDisposeDirectionLightComponent;
exports.deferDisposePointLightComponent = deferDisposePointLightComponent;
exports.deferDisposeMeshRendererComponent = deferDisposeMeshRendererComponent;
exports.batchDisposeBasicCameraViewComponent = batchDisposeBasicCameraViewComponent;
exports.batchDisposePerspectiveCameraProjectionComponent = batchDisposePerspectiveCameraProjectionComponent;
exports.batchDisposeMeshRendererComponent = batchDisposeMeshRendererComponent;
exports.batchDisposeTransformComponent = batchDisposeTransformComponent;
exports.batchDisposeBoxGeometryComponent = batchDisposeBoxGeometryComponent;
exports.batchDisposeCustomGeometryComponent = batchDisposeCustomGeometryComponent;
exports.batchDisposeBasicMaterialComponent = batchDisposeBasicMaterialComponent;
exports.batchDisposeLightMaterialComponent = batchDisposeLightMaterialComponent;
exports.batchDisposeDirectionLightComponent = batchDisposeDirectionLightComponent;
exports.batchDisposePointLightComponent = batchDisposePointLightComponent;
exports.batchDisposeSourceInstanceComponent = batchDisposeSourceInstanceComponent;
exports.batchDisposeObjectInstanceComponent = batchDisposeObjectInstanceComponent;
/* ArrayService-Wonderjs Not a pure module */
