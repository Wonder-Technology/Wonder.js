

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ReallocateCPUMemoryService$Wonderjs from "../../../primitive/memory/ReallocateCPUMemoryService.js";

function _setNewDataToState(newAliveUidArray, record, param) {
  return /* record */[
          /* uid */record[/* uid */0],
          /* nameMap */param[0],
          /* disposeCount */record[/* disposeCount */2],
          /* disposedUidMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedUidArray */record[/* disposedUidArray */4],
          /* disposedUidArrayForKeepOrder */record[/* disposedUidArrayForKeepOrder */5],
          /* disposedBasicCameraViewArray */record[/* disposedBasicCameraViewArray */6],
          /* disposedTransformArray */record[/* disposedTransformArray */7],
          /* disposedTransformArrayForKeepOrder */record[/* disposedTransformArrayForKeepOrder */8],
          /* disposedPerspectiveCameraProjectionArray */record[/* disposedPerspectiveCameraProjectionArray */9],
          /* disposedArcballCameraControllerArray */record[/* disposedArcballCameraControllerArray */10],
          /* disposedBasicMaterialArray */record[/* disposedBasicMaterialArray */11],
          /* disposedLightMaterialArray */record[/* disposedLightMaterialArray */12],
          /* disposedBoxGeometryArray */record[/* disposedBoxGeometryArray */13],
          /* disposedCustomGeometryArray */record[/* disposedCustomGeometryArray */14],
          /* disposedSourceInstanceArray */record[/* disposedSourceInstanceArray */15],
          /* disposedObjectInstanceArray */record[/* disposedObjectInstanceArray */16],
          /* disposedDirectionLightArray */record[/* disposedDirectionLightArray */17],
          /* disposedPointLightArray */record[/* disposedPointLightArray */18],
          /* disposedMeshRendererComponentArray */record[/* disposedMeshRendererComponentArray */19],
          /* aliveUidArray */newAliveUidArray,
          /* geometryDataMap */param[1],
          /* transformMap */param[2],
          /* basicCameraViewMap */param[4],
          /* perspectiveCameraProjectionMap */param[5],
          /* arcballCameraControllerMap */param[6],
          /* meshRendererMap */param[3],
          /* basicMaterialMap */param[7],
          /* lightMaterialMap */param[8],
          /* sourceInstanceMap */param[11],
          /* objectInstanceMap */param[12],
          /* directionLightMap */param[9],
          /* pointLightMap */param[10]
        ];
}

function _setNewMap(uid, oldMap, newMap) {
  var match = SparseMapService$WonderCommonlib.get(uid, oldMap);
  if (match !== undefined) {
    return SparseMapService$WonderCommonlib.set(uid, Js_primitive.valFromOption(match), newMap);
  } else {
    return newMap;
  }
}

function _allocateNewMaps(newAliveUidArray, record) {
  var nameMap = record[/* nameMap */1];
  var geometryDataMap = record[/* geometryDataMap */21];
  var transformMap = record[/* transformMap */22];
  var basicCameraViewMap = record[/* basicCameraViewMap */23];
  var perspectiveCameraProjectionMap = record[/* perspectiveCameraProjectionMap */24];
  var arcballCameraControllerMap = record[/* arcballCameraControllerMap */25];
  var meshRendererMap = record[/* meshRendererMap */26];
  var basicMaterialMap = record[/* basicMaterialMap */27];
  var lightMaterialMap = record[/* lightMaterialMap */28];
  var sourceInstanceMap = record[/* sourceInstanceMap */29];
  var objectInstanceMap = record[/* objectInstanceMap */30];
  var directionLightMap = record[/* directionLightMap */31];
  var pointLightMap = record[/* pointLightMap */32];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, uid) {
                return /* tuple */[
                        _setNewMap(uid, nameMap, param[0]),
                        _setNewMap(uid, geometryDataMap, param[1]),
                        SparseMapService$WonderCommonlib.set(uid, SparseMapService$WonderCommonlib.unsafeGet(uid, transformMap), param[2]),
                        _setNewMap(uid, meshRendererMap, param[3]),
                        _setNewMap(uid, basicCameraViewMap, param[4]),
                        _setNewMap(uid, perspectiveCameraProjectionMap, param[5]),
                        _setNewMap(uid, arcballCameraControllerMap, param[6]),
                        _setNewMap(uid, basicMaterialMap, param[7]),
                        _setNewMap(uid, lightMaterialMap, param[8]),
                        _setNewMap(uid, directionLightMap, param[9]),
                        _setNewMap(uid, pointLightMap, param[10]),
                        _setNewMap(uid, sourceInstanceMap, param[11]),
                        _setNewMap(uid, objectInstanceMap, param[12])
                      ];
              }), /* tuple */[
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0),
              SparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], newAliveUidArray);
}

function reAllocate(record) {
  var disposedUidMap = record[/* disposedUidMap */3];
  var aliveUidArray = record[/* aliveUidArray */20];
  var newAliveUidArray = aliveUidArray.filter((function (aliveUid) {
          return !ReallocateCPUMemoryService$Wonderjs.isDisposed(aliveUid, disposedUidMap);
        }));
  return _setNewDataToState(newAliveUidArray, record, _allocateNewMaps(newAliveUidArray, record));
}

export {
  _setNewDataToState ,
  _setNewMap ,
  _allocateNewMaps ,
  reAllocate ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
