

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
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

function batchDispose(param, uidArray, isKeepOrder, state) {
  var state$1 = _setDisposedUidMap(uidArray, _disposeNameMap(uidArray, state));
  var record = state$1[/* gameObjectRecord */10];
  var disposeCount = record[/* disposeCount */2];
  record[/* disposeCount */2] = disposeCount + uidArray.length | 0;
  var match = DisposeGameObjectComponentMainService$Wonderjs.batchDispose(/* tuple */[
        uidArray,
        isKeepOrder
      ], /* tuple */[
        param[0],
        param[1],
        batchDispose
      ], state$1);
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3]
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
    /* disposedBasicCameraViewArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedTransformArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedTransformArrayForKeepOrder */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedPerspectiveCameraProjectionArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedArcballCameraControllerArray */init[/* disposedArcballCameraControllerArray */10],
    /* disposedBasicMaterialArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedLightMaterialArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedBoxGeometryArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedCustomGeometryArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedSourceInstanceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedObjectInstanceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedDirectionLightArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedPointLightArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedMeshRendererComponentArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* aliveUidArray */init[/* aliveUidArray */20],
    /* geometryDataMap */init[/* geometryDataMap */21],
    /* transformMap */init[/* transformMap */22],
    /* basicCameraViewMap */init[/* basicCameraViewMap */23],
    /* perspectiveCameraProjectionMap */init[/* perspectiveCameraProjectionMap */24],
    /* arcballCameraControllerMap */init[/* arcballCameraControllerMap */25],
    /* meshRendererMap */init[/* meshRendererMap */26],
    /* basicMaterialMap */init[/* basicMaterialMap */27],
    /* lightMaterialMap */init[/* lightMaterialMap */28],
    /* sourceInstanceMap */init[/* sourceInstanceMap */29],
    /* objectInstanceMap */init[/* objectInstanceMap */30],
    /* directionLightMap */init[/* directionLightMap */31],
    /* pointLightMap */init[/* pointLightMap */32]
  ];
  return newrecord;
}

function deferDispose(uid, state) {
  return deferBatchDispose(/* array */[uid], state);
}

function deferDisposeKeepOrder(uid, state) {
  return deferBatchDisposeKeepOrder(/* array */[uid], state);
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
  
}
/* DisposeECSService-Wonderjs Not a pure module */
