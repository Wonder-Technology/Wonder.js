

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as DisposeECSService$Wonderjs from "../../../primitive/ecs/DisposeECSService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeGameObjectComponentMainService$Wonderjs from "./DisposeGameObjectComponentMainService.js";

function _setDisposedUidMap(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedUidMap */5] = DisposeECSService$Wonderjs.buildMapFromArray(uidArray, gameObjectRecord[/* disposedUidMap */5]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function batchDispose(param, uidArray, param$1, state) {
  var state$1 = _setDisposedUidMap(uidArray, state);
  var record = state$1[/* gameObjectRecord */10];
  var disposeCount = record[/* disposeCount */4];
  record[/* disposeCount */4] = disposeCount + uidArray.length | 0;
  var match = DisposeGameObjectComponentMainService$Wonderjs.batchDispose(/* tuple */[
        uidArray,
        param$1[0],
        param$1[1],
        param$1[2],
        param$1[3]
      ], /* tuple */[
        param[0],
        param[1],
        batchDispose
      ], state$1);
  return /* tuple */[
          match[0],
          match[1],
          match[2]
        ];
}

function deferBatchDispose(uidArray, state) {
  state[/* gameObjectRecord */10][/* disposedUidArray */6] = state[/* gameObjectRecord */10][/* disposedUidArray */6].concat(uidArray);
  return state;
}

function deferBatchDisposeKeepOrder(uidArray, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrder */7] = state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrder */7].concat(uidArray);
  return state;
}

function clearDeferDisposeData(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gameObjectRecord */10];
  newrecord[/* gameObjectRecord */10] = /* record */[
    /* uid */init[/* uid */0],
    /* nameMap */init[/* nameMap */1],
    /* isRootMap */init[/* isRootMap */2],
    /* isActiveMap */init[/* isActiveMap */3],
    /* disposeCount */init[/* disposeCount */4],
    /* disposedUidMap */init[/* disposedUidMap */5],
    /* disposedUidArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForKeepOrder */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForKeepOrderRemoveGeometry */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForDisposeGeometryRemoveMaterial */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForRemoveTexture */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedBasicCameraViewArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedTransformArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedTransformArrayForKeepOrder */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedPerspectiveCameraProjectionArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedFlyCameraControllerArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedArcballCameraControllerArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedBasicMaterialDataMap */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedLightMaterialDataMap */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedLightMaterialRemoveTextureDataMap */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedGeometryDataMap */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedSourceInstanceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedObjectInstanceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedDirectionLightArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedPointLightArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedMeshRendererComponentArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedScriptArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* aliveUidArray */init[/* aliveUidArray */28],
    /* geometryMap */init[/* geometryMap */29],
    /* transformMap */init[/* transformMap */30],
    /* basicCameraViewMap */init[/* basicCameraViewMap */31],
    /* perspectiveCameraProjectionMap */init[/* perspectiveCameraProjectionMap */32],
    /* arcballCameraControllerMap */init[/* arcballCameraControllerMap */33],
    /* flyCameraControllerMap */init[/* flyCameraControllerMap */34],
    /* meshRendererMap */init[/* meshRendererMap */35],
    /* basicMaterialMap */init[/* basicMaterialMap */36],
    /* lightMaterialMap */init[/* lightMaterialMap */37],
    /* sourceInstanceMap */init[/* sourceInstanceMap */38],
    /* objectInstanceMap */init[/* objectInstanceMap */39],
    /* directionLightMap */init[/* directionLightMap */40],
    /* pointLightMap */init[/* pointLightMap */41],
    /* scriptMap */init[/* scriptMap */42]
  ];
  return newrecord;
}

function deferDispose(uid, state) {
  return deferBatchDispose(/* array */[uid], state);
}

function deferDisposeKeepOrder(uid, state) {
  return deferBatchDisposeKeepOrder(/* array */[uid], state);
}

function _deferBatchDisposeRemoveGeometryKeepOrder(uidArray, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometry */8] = state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometry */8].concat(uidArray);
  return state;
}

function deferDisposeKeepOrderRemoveGeometry(uid, state) {
  return _deferBatchDisposeRemoveGeometryKeepOrder(/* array */[uid], state);
}

function _deferDisposeKeepOrderRemoveGeometryRemoveMaterial(uidArray, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */9] = state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */9].concat(uidArray);
  return state;
}

function deferDisposeKeepOrderRemoveGeometryRemoveMaterial(uid, state) {
  return _deferDisposeKeepOrderRemoveGeometryRemoveMaterial(/* array */[uid], state);
}

function deferDisposeDisposeGeometryRemoveMaterial(uid, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForDisposeGeometryRemoveMaterial */10] = ArrayService$Wonderjs.push(uid, state[/* gameObjectRecord */10][/* disposedUidArrayForDisposeGeometryRemoveMaterial */10]);
  return state;
}

function deferDisposeRemoveTexture(uid, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForRemoveTexture */11] = ArrayService$Wonderjs.push(uid, state[/* gameObjectRecord */10][/* disposedUidArrayForRemoveTexture */11]);
  return state;
}

export {
  _setDisposedUidMap ,
  batchDispose ,
  deferBatchDispose ,
  deferBatchDisposeKeepOrder ,
  clearDeferDisposeData ,
  deferDispose ,
  deferDisposeKeepOrder ,
  _deferBatchDisposeRemoveGeometryKeepOrder ,
  deferDisposeKeepOrderRemoveGeometry ,
  _deferDisposeKeepOrderRemoveGeometryRemoveMaterial ,
  deferDisposeKeepOrderRemoveGeometryRemoveMaterial ,
  deferDisposeDisposeGeometryRemoveMaterial ,
  deferDisposeRemoveTexture ,
  
}
/* ArrayService-Wonderjs Not a pure module */
