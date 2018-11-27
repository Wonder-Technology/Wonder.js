

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as DisposeECSService$Wonderjs from "../../../primitive/ecs/DisposeECSService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as DisposeGameObjectComponentMainService$Wonderjs from "./DisposeGameObjectComponentMainService.js";

function _disposeNameMap(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  gameObjectRecord[/* nameMap */1] = ArrayService$WonderCommonlib.reduceOneParam((function (nameMap, uid) {
          return DisposeComponentService$Wonderjs.disposeSparseMapData(uid, nameMap);
        }), gameObjectRecord[/* nameMap */1], uidArray);
  state[/* gameObjectRecord */10] = gameObjectRecord;
  return state;
}

function _setDisposedUidMap(uidArray, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* disposedUidMap */3] = DisposeECSService$Wonderjs.buildMapFromArray(uidArray, gameObjectRecord[/* disposedUidMap */3]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

function batchDispose(param, uidArray, param$1, state) {
  var state$1 = _setDisposedUidMap(uidArray, _disposeNameMap(uidArray, state));
  var record = state$1[/* gameObjectRecord */10];
  var disposeCount = record[/* disposeCount */2];
  record[/* disposeCount */2] = disposeCount + uidArray.length | 0;
  var match = DisposeGameObjectComponentMainService$Wonderjs.batchDispose(/* tuple */[
        uidArray,
        param$1[0],
        param$1[1],
        param$1[2]
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
  state[/* gameObjectRecord */10][/* disposedUidArray */4] = state[/* gameObjectRecord */10][/* disposedUidArray */4].concat(uidArray);
  return state;
}

function deferBatchDisposeKeepOrder(uidArray, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrder */5] = state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrder */5].concat(uidArray);
  return state;
}

function clearDeferDisposeData(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gameObjectRecord */10];
  newrecord[/* gameObjectRecord */10] = /* record */[
    /* uid */init[/* uid */0],
    /* nameMap */init[/* nameMap */1],
    /* disposeCount */init[/* disposeCount */2],
    /* disposedUidMap */init[/* disposedUidMap */3],
    /* disposedUidArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForKeepOrder */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForKeepOrderRemoveGeometry */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedUidArrayForDisposeGeometryRemoveMaterial */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedBasicCameraViewArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedTransformArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedTransformArrayForKeepOrder */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedPerspectiveCameraProjectionArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedArcballCameraControllerArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedBasicMaterialDataArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedLightMaterialDataArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedGeometryDataArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedSourceInstanceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedObjectInstanceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedDirectionLightArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedPointLightArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedMeshRendererComponentArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* aliveUidArray */init[/* aliveUidArray */22],
    /* geometryMap */init[/* geometryMap */23],
    /* transformMap */init[/* transformMap */24],
    /* basicCameraViewMap */init[/* basicCameraViewMap */25],
    /* perspectiveCameraProjectionMap */init[/* perspectiveCameraProjectionMap */26],
    /* arcballCameraControllerMap */init[/* arcballCameraControllerMap */27],
    /* meshRendererMap */init[/* meshRendererMap */28],
    /* basicMaterialMap */init[/* basicMaterialMap */29],
    /* lightMaterialMap */init[/* lightMaterialMap */30],
    /* sourceInstanceMap */init[/* sourceInstanceMap */31],
    /* objectInstanceMap */init[/* objectInstanceMap */32],
    /* directionLightMap */init[/* directionLightMap */33],
    /* pointLightMap */init[/* pointLightMap */34]
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
  state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometry */6] = state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometry */6].concat(uidArray);
  return state;
}

function deferDisposeKeepOrderRemoveGeometry(uid, state) {
  return _deferBatchDisposeRemoveGeometryKeepOrder(/* array */[uid], state);
}

function _deferDisposeKeepOrderRemoveGeometryRemoveMaterial(uidArray, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */7] = state[/* gameObjectRecord */10][/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */7].concat(uidArray);
  return state;
}

function deferDisposeKeepOrderRemoveGeometryRemoveMaterial(uid, state) {
  return _deferDisposeKeepOrderRemoveGeometryRemoveMaterial(/* array */[uid], state);
}

function deferDisposeDisposeGeometryRemoveMaterial(uid, state) {
  state[/* gameObjectRecord */10][/* disposedUidArrayForDisposeGeometryRemoveMaterial */8] = ArrayService$Wonderjs.push(uid, state[/* gameObjectRecord */10][/* disposedUidArrayForDisposeGeometryRemoveMaterial */8]);
  return state;
}

export {
  _disposeNameMap ,
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
  
}
/* ArrayService-Wonderjs Not a pure module */
