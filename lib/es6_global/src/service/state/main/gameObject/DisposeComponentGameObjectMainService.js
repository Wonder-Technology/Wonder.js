

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as MemorySettingService$Wonderjs from "../../../record/main/setting/MemorySettingService.js";
import * as DisposePointLightService$Wonderjs from "../../../record/main/light/point/DisposePointLightService.js";
import * as GameObjectGeometryService$Wonderjs from "../../../record/main/geometry/GameObjectGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";
import * as DisposeGeometryMainService$Wonderjs from "../geometry/DisposeGeometryMainService.js";
import * as DisposeMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/DisposeMeshRendererService.js";
import * as DisposeTransformMainService$Wonderjs from "../transform/DisposeTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as DisposeDirectionLightService$Wonderjs from "../../../record/main/light/direction/DisposeDirectionLightService.js";
import * as DisposeBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/DisposeBasicCameraViewService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../meshRenderer/RecordMeshRendererMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as DisposeBasicMaterialMainService$Wonderjs from "../material/basic/DisposeBasicMaterialMainService.js";
import * as DisposeLightMaterialMainService$Wonderjs from "../material/light/DisposeLightMaterialMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as DisposeObjectInstanceMainService$Wonderjs from "../instance/DisposeObjectInstanceMainService.js";
import * as DisposeSourceInstanceMainService$Wonderjs from "../instance/DisposeSourceInstanceMainService.js";
import * as MaterialArrayForWorkerInitService$Wonderjs from "../../../primitive/material/MaterialArrayForWorkerInitService.js";
import * as DisposeArcballCameraControllerMainService$Wonderjs from "../camera_controller/arcball/DisposeArcballCameraControllerMainService.js";
import * as DisposePerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/DisposePerspectiveCameraProjectionService.js";

var _removeComponent = ComponentMapService$Wonderjs.removeComponent;

function deferDisposeBasicCameraViewComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBasicCameraViewArray */10] = ArrayService$Wonderjs.push(component, state[/* gameObjectRecord */10][/* disposedBasicCameraViewArray */10]);
  newrecord$1[/* basicCameraViewMap */26] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicCameraViewMap */26]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePerspectiveCameraProjectionComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedPerspectiveCameraProjectionArray */13] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedPerspectiveCameraProjectionArray */13]);
  newrecord$1[/* perspectiveCameraProjectionMap */27] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* perspectiveCameraProjectionMap */27]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeArcballCameraControllerComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedArcballCameraControllerArray */14] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedArcballCameraControllerArray */14]);
  newrecord$1[/* arcballCameraControllerMap */28] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* arcballCameraControllerMap */28]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedTransformArray */11] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedTransformArray */11]);
  newrecord$1[/* transformMap */25] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* transformMap */25]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeTransformComponentForKeepOrder(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedTransformArrayForKeepOrder */12] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedTransformArrayForKeepOrder */12]);
  newrecord$1[/* transformMap */25] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* transformMap */25]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeBasicMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedBasicMaterialDataArray */15] = ArrayService$Wonderjs.push(/* tuple */[
        uid,
        component
      ], gameObjectRecord[/* disposedBasicMaterialDataArray */15]);
  newrecord$1[/* basicMaterialMap */30] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicMaterialMap */30]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeLightMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedLightMaterialDataArray */16] = ArrayService$Wonderjs.push(/* tuple */[
        uid,
        component
      ], gameObjectRecord[/* disposedLightMaterialDataArray */16]);
  newrecord$1[/* lightMaterialMap */31] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* lightMaterialMap */31]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedGeometryDataArray */17] = ArrayService$Wonderjs.push(/* tuple */[
        uid,
        component
      ], gameObjectRecord[/* disposedGeometryDataArray */17]);
  newrecord$1[/* geometryMap */24] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* geometryMap */24]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeSourceInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedSourceInstanceArray */18] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedSourceInstanceArray */18]);
  newrecord$1[/* sourceInstanceMap */32] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* sourceInstanceMap */32]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeObjectInstanceComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedObjectInstanceArray */19] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedObjectInstanceArray */19]);
  newrecord$1[/* objectInstanceMap */33] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* objectInstanceMap */33]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeDirectionLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedDirectionLightArray */20] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedDirectionLightArray */20]);
  newrecord$1[/* directionLightMap */34] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* directionLightMap */34]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposePointLightComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedPointLightArray */21] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedPointLightArray */21]);
  newrecord$1[/* pointLightMap */35] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* pointLightMap */35]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function deferDisposeMeshRendererComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedMeshRendererComponentArray */22] = ArrayService$Wonderjs.push(component, gameObjectRecord[/* disposedMeshRendererComponentArray */22]);
  newrecord$1[/* meshRendererMap */29] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* meshRendererMap */29]);
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

function batchDisposeArcballCameraControllerComponent(state, componentArray) {
  return DisposeArcballCameraControllerMainService$Wonderjs.handleBatchDisposeComponent(componentArray, state);
}

function batchDisposeMeshRendererComponent(state, componentArray) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */23] = DisposeMeshRendererService$Wonderjs.handleBatchDisposeComponent(componentArray, RecordMeshRendererMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function batchDisposeTransformComponent(state, isKeepOrder, componentArray) {
  return DisposeTransformMainService$Wonderjs.handleBatchDisposeComponent(componentArray, MemorySettingService$Wonderjs.getMaxTypeArrayPoolSize(state[/* settingRecord */0]), isKeepOrder, state);
}

function batchDisposeGeometryComponentData(state, compnentDataArray) {
  return DisposeGeometryMainService$Wonderjs.handleBatchDisposeComponentData(compnentDataArray, state);
}

function batchDisposeGeometryComponent(componentArray, state) {
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, component) {
          var state = param[1];
          var componentHasNoGameObjectArr = param[0];
          var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
          var match = GameObjectGeometryService$Wonderjs.getGameObjects(component, geometryRecord);
          if (match !== undefined) {
            return /* tuple */[
                    componentHasNoGameObjectArr,
                    ArrayService$WonderCommonlib.reduceOneParam((function (state, gameObject) {
                            return deferDisposeGeometryComponent(gameObject, component, state);
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
  return DisposeGeometryMainService$Wonderjs.handleBatchDisposeComponent(match[0], match[1]);
}

function batchDisposeBasicMaterialComponent(state, compnentDataArray) {
  return DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponent(compnentDataArray, state);
}

function batchDisposeBasicMaterialComponentForWorker(state, componentDataArray) {
  var state$1 = DisposeBasicMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentDataArray, state);
  var record = RecordBasicMaterialMainService$Wonderjs.getRecord(state$1);
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */13];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* colors */record[/* colors */3],
    /* textureIndices */record[/* textureIndices */4],
    /* mapUnits */record[/* mapUnits */5],
    /* isDepthTests */record[/* isDepthTests */6],
    /* alphas */record[/* alphas */7],
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */8],
    /* defaultColor */record[/* defaultColor */9],
    /* gameObjectsMap */record[/* gameObjectsMap */10],
    /* disposedIndexArray */record[/* disposedIndexArray */11],
    /* nameMap */record[/* nameMap */12],
    /* materialArrayForWorkerInit */MaterialArrayForWorkerInitService$Wonderjs.removeDisposedOnesFromMaterialArrayForWorkerInit(componentDataArray, materialArrayForWorkerInit)
  ];
  return newrecord;
}

function batchDisposeLightMaterialComponent(state, componentDataArray) {
  return DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentDataArray, state);
}

function batchDisposeLightMaterialComponentForWorker(state, componentDataArray) {
  var state$1 = DisposeLightMaterialMainService$Wonderjs.handleBatchDisposeComponent(componentDataArray, state);
  var record = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */16];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* shaderIndices */record[/* shaderIndices */2],
    /* diffuseColors */record[/* diffuseColors */3],
    /* specularColors */record[/* specularColors */4],
    /* shininess */record[/* shininess */5],
    /* textureIndices */record[/* textureIndices */6],
    /* diffuseMapUnits */record[/* diffuseMapUnits */7],
    /* specularMapUnits */record[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */record[/* emptyMapUnitArrayMap */9],
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */record[/* defaultSpecularColor */11],
    /* defaultShininess */record[/* defaultShininess */12],
    /* gameObjectsMap */record[/* gameObjectsMap */13],
    /* disposedIndexArray */record[/* disposedIndexArray */14],
    /* nameMap */record[/* nameMap */15],
    /* materialArrayForWorkerInit */MaterialArrayForWorkerInitService$Wonderjs.removeDisposedOnesFromMaterialArrayForWorkerInit(componentDataArray, materialArrayForWorkerInit)
  ];
  return newrecord;
}

function batchDisposeDirectionLightComponent(state, componentArray) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */20] = ComponentMapService$Wonderjs.batchDisposeComponent(RecordDirectionLightMainService$Wonderjs.getRecord(state), DisposeDirectionLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposePointLightComponent(state, componentArray) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */21] = ComponentMapService$Wonderjs.batchDisposeComponent(RecordPointLightMainService$Wonderjs.getRecord(state), DisposePointLightService$Wonderjs.handleBatchDisposeComponent, componentArray);
  return newrecord;
}

function batchDisposeSourceInstanceComponent(state, param, disposeGameObjectFunc, componentArray) {
  return DisposeSourceInstanceMainService$Wonderjs.handleBatchDisposeComponent(componentArray, /* tuple */[
              param[0],
              param[1],
              param[2]
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
  deferDisposeBasicCameraViewComponent ,
  deferDisposePerspectiveCameraProjectionComponent ,
  deferDisposeArcballCameraControllerComponent ,
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
  batchDisposeArcballCameraControllerComponent ,
  batchDisposeMeshRendererComponent ,
  batchDisposeTransformComponent ,
  batchDisposeGeometryComponentData ,
  batchDisposeGeometryComponent ,
  batchDisposeBasicMaterialComponent ,
  batchDisposeBasicMaterialComponentForWorker ,
  batchDisposeLightMaterialComponent ,
  batchDisposeLightMaterialComponentForWorker ,
  batchDisposeDirectionLightComponent ,
  batchDisposePointLightComponent ,
  batchDisposeSourceInstanceComponent ,
  batchDisposeObjectInstanceComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
