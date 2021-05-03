

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayMapService$Wonderjs from "../../../atom/ArrayMapService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as MemorySettingService$Wonderjs from "../../../record/main/setting/MemorySettingService.js";
import * as DisposePointLightService$Wonderjs from "../../../record/main/light/point/DisposePointLightService.js";
import * as DisposeScriptMainService$Wonderjs from "../script/DisposeScriptMainService.js";
import * as GameObjectGeometryService$Wonderjs from "../../../record/main/geometry/GameObjectGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";
import * as DisposeGeometryMainService$Wonderjs from "../geometry/DisposeGeometryMainService.js";
import * as DisposeMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/DisposeMeshRendererService.js";
import * as DisposeTransformMainService$Wonderjs from "../transform/DisposeTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as DisposeDirectionLightService$Wonderjs from "../../../record/main/light/direction/DisposeDirectionLightService.js";
import * as DisposeBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/DisposeBasicCameraViewService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../meshRenderer/RecordMeshRendererMainService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../record/main/material/basic/GameObjectBasicMaterialService.js";
import * as GameObjectLightMaterialService$Wonderjs from "../../../record/main/material/light/GameObjectLightMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as DisposeBasicMaterialMainService$Wonderjs from "../material/basic/DisposeBasicMaterialMainService.js";
import * as DisposeLightMaterialMainService$Wonderjs from "../material/light/DisposeLightMaterialMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as DisposeObjectInstanceMainService$Wonderjs from "../instance/DisposeObjectInstanceMainService.js";
import * as DisposeSourceInstanceMainService$Wonderjs from "../instance/DisposeSourceInstanceMainService.js";
import * as MaterialArrayForWorkerInitService$Wonderjs from "../../../primitive/material/MaterialArrayForWorkerInitService.js";
import * as DisposeFlyCameraControllerMainService$Wonderjs from "../camera_controller/fly/DisposeFlyCameraControllerMainService.js";
import * as DisposeArcballCameraControllerMainService$Wonderjs from "../camera_controller/arcball/DisposeArcballCameraControllerMainService.js";
import * as DisposePerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/DisposePerspectiveCameraProjectionService.js";

var _removeComponent = ComponentMapService$Wonderjs.removeComponent;

function deferDisposeScriptComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedScriptArray */27] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedScriptArray */27]);
  newrecord$1[/* scriptMap */42] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* scriptMap */42]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBasicCameraViewComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBasicCameraViewArray */12] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBasicCameraViewArray */12]);
  newrecord$1[/* basicCameraViewMap */31] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicCameraViewMap */31]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePerspectiveCameraProjectionComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedPerspectiveCameraProjectionArray */15] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedPerspectiveCameraProjectionArray */15]);
  newrecord$1[/* perspectiveCameraProjectionMap */32] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */32]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeFlyCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedFlyCameraControllerArray */16] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedFlyCameraControllerArray */16]);
  newrecord$1[/* flyCameraControllerMap */34] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* flyCameraControllerMap */34]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeArcballCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedArcballCameraControllerArray */17] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedArcballCameraControllerArray */17]);
  newrecord$1[/* arcballCameraControllerMap */33] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */33]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedTransformArray */13] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedTransformArray */13]);
  newrecord$1[/* transformMap */30] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* transformMap */30]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponentForKeepOrder(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedTransformArrayForKeepOrder */14] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedTransformArrayForKeepOrder */14]);
  newrecord$1[/* transformMap */30] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* transformMap */30]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBasicMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBasicMaterialDataMap */18] = ArrayMapService$Wonderjs.addValue(component, uid, gameObjectRecord[/* disposedBasicMaterialDataMap */18]);
  newrecord$1[/* basicMaterialMap */36] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicMaterialMap */36]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeLightMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedLightMaterialDataMap */19] = ArrayMapService$Wonderjs.addValue(component, uid, gameObjectRecord[/* disposedLightMaterialDataMap */19]);
  newrecord$1[/* lightMaterialMap */37] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* lightMaterialMap */37]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeLightMaterialComponentRemoveTexture(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedLightMaterialRemoveTextureDataMap */20] = ArrayMapService$Wonderjs.addValue(component, uid, gameObjectRecord[/* disposedLightMaterialRemoveTextureDataMap */20]);
  newrecord$1[/* lightMaterialMap */37] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* lightMaterialMap */37]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedGeometryDataMap */21] = ArrayMapService$Wonderjs.addValue(component, uid, gameObjectRecord[/* disposedGeometryDataMap */21]);
  newrecord$1[/* geometryMap */29] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* geometryMap */29]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeSourceInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedSourceInstanceArray */22] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedSourceInstanceArray */22]);
  newrecord$1[/* sourceInstanceMap */38] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* sourceInstanceMap */38]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeObjectInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedObjectInstanceArray */23] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedObjectInstanceArray */23]);
  newrecord$1[/* objectInstanceMap */39] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* objectInstanceMap */39]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeDirectionLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedDirectionLightArray */24] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedDirectionLightArray */24]);
  newrecord$1[/* directionLightMap */40] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* directionLightMap */40]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePointLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedPointLightArray */25] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedPointLightArray */25]);
  newrecord$1[/* pointLightMap */41] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* pointLightMap */41]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeMeshRendererComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedMeshRendererComponentArray */26] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedMeshRendererComponentArray */26]);
  newrecord$1[/* meshRendererMap */35] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* meshRendererMap */35]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function batchDisposeScriptComponent(state, componentArray) {
  return DisposeScriptMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
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

function batchDisposeFlyCameraControllerComponent(state, componentArray) {
  return DisposeFlyCameraControllerMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeArcballCameraControllerComponent(state, componentArray) {
  return DisposeArcballCameraControllerMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeMeshRendererComponent(state, componentArray) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */24] = DisposeMeshRendererService$Wonderjs.handleBatchDisposeComponent(componentArray, RecordMeshRendererMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function batchDisposeTransformComponent(state, isKeepOrder, componentArray) {
  return DisposeTransformMainService$Wonderjs.handleBatchDisposeComponent(componentArray, MemorySettingService$Wonderjs.getMaxTypeArrayPoolSize(state[/* settingRecord */0]), isKeepOrder, state);
}

function batchDisposeGeometryComponentData(state, compnentDataMap) {
  return DisposeGeometryMainService$Wonderjs.handleBatchDisposeComponentData(compnentDataMap, state);
}

function _batchDisposeSharableComponent(componentArray, param, state) {
  var deferDisposeComponentFunc = param[2];
  var getGameObjectsFunc = param[1];
  var getRecordFunc = param[0];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, component) {
          var state = param[1];
          var componentHasNoGameObjectArr = param[0];
          var geometryRecord = Curry._1(getRecordFunc, state);
          var match = Curry._2(getGameObjectsFunc, component, geometryRecord);
          if (match !== undefined) {
            return /* tuple */[
                    componentHasNoGameObjectArr,
                    ArrayService$WonderCommonlib.reduceOneParam((function (state, gameObject) {
                            return deferDisposeComponentFunc(gameObject, component, state);
                          }), state, match)
                  ];
          } else {
            return /* tuple */[
                    ArrayService$Wonderjs.push(component, componentHasNoGameObjectArr),
                    state
                  ];
          }
        }), /* tuple */[
        /* array */[],
        state
      ], componentArray);
  return Curry._2(param[3], match[0], match[1]);
}

function batchDisposeGeometryComponent(componentArray, state) {
  return _batchDisposeSharableComponent(componentArray, /* tuple */[
              RecordGeometryMainService$Wonderjs.getRecord,
              GameObjectGeometryService$Wonderjs.getGameObjects,
              deferDisposeGeometryComponent,
              DisposeGeometryMainService$Wonderjs.handleBatchDisposeComponent
            ], state);
}

function batchDisposeBasicMaterialComponentData(state, compnentDataMap, _isRemoveTexture) {
  return DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponentData(compnentDataMap, state);
}

function batchDisposeBasicMaterialComponentDataForWorker(state, componentDataMap, _isRemoveTexture) {
  var state$1 = DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponentData(componentDataMap, state);
  var record = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */10];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* colors */record[/* colors */3],
    /* isDepthTests */record[/* isDepthTests */4],
    /* alphas */record[/* alphas */5],
    /* defaultColor */record[/* defaultColor */6],
    /* gameObjectsMap */record[/* gameObjectsMap */7],
    /* disposedIndexArray */record[/* disposedIndexArray */8],
    /* nameMap */record[/* nameMap */9],
    /* materialArrayForWorkerInit */MaterialArrayForWorkerInitService$Wonderjs.removeDisposedOnesFromMaterialArrayForWorkerInit(componentDataMap, materialArrayForWorkerInit)
  ];
  return newrecord;
}

function batchDisposeBasicMaterialComponent(componentArray, state) {
  return _batchDisposeSharableComponent(componentArray, /* tuple */[
              RecordBasicMaterialMainService$Wonderjs.getRecord,
              GameObjectBasicMaterialService$Wonderjs.getGameObjects,
              deferDisposeBasicMaterialComponent,
              DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponent
            ], state);
}

function batchDisposeLightMaterialComponentData(state, componentDataMap, isRemoveTexture) {
  return DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponentData(isRemoveTexture, componentDataMap, state);
}

function batchDisposeLightMaterialComponentDataForWorker(state, componentDataMap, isRemoveTexture) {
  var state$1 = DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponentData(isRemoveTexture, componentDataMap, state);
  var record = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */14];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* diffuseColors */record[/* diffuseColors */3],
    /* specularColors */record[/* specularColors */4],
    /* shininess */record[/* shininess */5],
    /* diffuseTextureIndices */record[/* diffuseTextureIndices */6],
    /* specularTextureIndices */record[/* specularTextureIndices */7],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */record[/* defaultSpecularColor */9],
    /* defaultShininess */record[/* defaultShininess */10],
    /* gameObjectsMap */record[/* gameObjectsMap */11],
    /* disposedIndexArray */record[/* disposedIndexArray */12],
    /* nameMap */record[/* nameMap */13],
    /* materialArrayForWorkerInit */MaterialArrayForWorkerInitService$Wonderjs.removeDisposedOnesFromMaterialArrayForWorkerInit(componentDataMap, materialArrayForWorkerInit)
  ];
  return newrecord;
}

function batchDisposeLightMaterialComponent(componentArray, isRemoveTexture, state) {
  return _batchDisposeSharableComponent(componentArray, /* tuple */[
              RecordLightMaterialMainService$Wonderjs.getRecord,
              GameObjectLightMaterialService$Wonderjs.getGameObjects,
              isRemoveTexture ? deferDisposeLightMaterialComponentRemoveTexture : deferDisposeLightMaterialComponent,
              (function (param, param$1) {
                  return DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponent(isRemoveTexture, param, param$1);
                })
            ], state);
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

function batchDisposeSourceInstanceComponent(state, param, disposeGameObjectFunc, componentArray) {
  return DisposeSourceInstanceMainService$Wonderjs.handleBatchDisposeComponent(componentArray, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], disposeGameObjectFunc, state);
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
  _removeComponent ,
  deferDisposeScriptComponent ,
  deferDisposeBasicCameraViewComponent ,
  deferDisposePerspectiveCameraProjectionComponent ,
  deferDisposeFlyCameraControllerComponent ,
  deferDisposeArcballCameraControllerComponent ,
  deferDisposeTransformComponent ,
  deferDisposeTransformComponentForKeepOrder ,
  deferDisposeBasicMaterialComponent ,
  deferDisposeLightMaterialComponent ,
  deferDisposeLightMaterialComponentRemoveTexture ,
  deferDisposeGeometryComponent ,
  deferDisposeSourceInstanceComponent ,
  deferDisposeObjectInstanceComponent ,
  deferDisposeDirectionLightComponent ,
  deferDisposePointLightComponent ,
  deferDisposeMeshRendererComponent ,
  batchDisposeScriptComponent ,
  batchDisposeBasicCameraViewComponent ,
  batchDisposePerspectiveCameraProjectionComponent ,
  batchDisposeFlyCameraControllerComponent ,
  batchDisposeArcballCameraControllerComponent ,
  batchDisposeMeshRendererComponent ,
  batchDisposeTransformComponent ,
  batchDisposeGeometryComponentData ,
  _batchDisposeSharableComponent ,
  batchDisposeGeometryComponent ,
  batchDisposeBasicMaterialComponentData ,
  batchDisposeBasicMaterialComponentDataForWorker ,
  batchDisposeBasicMaterialComponent ,
  batchDisposeLightMaterialComponentData ,
  batchDisposeLightMaterialComponentDataForWorker ,
  batchDisposeLightMaterialComponent ,
  batchDisposeDirectionLightComponent ,
  batchDisposePointLightComponent ,
  batchDisposeSourceInstanceComponent ,
  batchDisposeObjectInstanceComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
