

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ReallocateCPUMemoryService$Wonderjs from "../../../primitive/memory/ReallocateCPUMemoryService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _setNewDataToState(newAliveUidArray, record, param) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* nameMap */1] = param[0];
  newrecord[/* disposedUidMap */3] = MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
  newrecord[/* aliveUidArray */22] = newAliveUidArray;
  newrecord[/* geometryMap */23] = param[1];
  newrecord[/* transformMap */24] = param[2];
  newrecord[/* basicCameraViewMap */25] = param[4];
  newrecord[/* perspectiveCameraProjectionMap */26] = param[5];
  newrecord[/* arcballCameraControllerMap */27] = param[6];
  newrecord[/* meshRendererMap */28] = param[3];
  newrecord[/* basicMaterialMap */29] = param[7];
  newrecord[/* lightMaterialMap */30] = param[8];
  newrecord[/* sourceInstanceMap */31] = param[11];
  newrecord[/* objectInstanceMap */32] = param[12];
  newrecord[/* directionLightMap */33] = param[9];
  newrecord[/* pointLightMap */34] = param[10];
  return newrecord;
}

function _setNewMap(uid, oldMap, newMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(uid, oldMap);
  if (match !== undefined) {
    return MutableSparseMapService$WonderCommonlib.set(uid, Js_primitive.valFromOption(match), newMap);
  } else {
    return newMap;
  }
}

function _allocateNewMaps(newAliveUidArray, record) {
  var nameMap = record[/* nameMap */1];
  var geometryMap = record[/* geometryMap */23];
  var transformMap = record[/* transformMap */24];
  var basicCameraViewMap = record[/* basicCameraViewMap */25];
  var perspectiveCameraProjectionMap = record[/* perspectiveCameraProjectionMap */26];
  var arcballCameraControllerMap = record[/* arcballCameraControllerMap */27];
  var meshRendererMap = record[/* meshRendererMap */28];
  var basicMaterialMap = record[/* basicMaterialMap */29];
  var lightMaterialMap = record[/* lightMaterialMap */30];
  var sourceInstanceMap = record[/* sourceInstanceMap */31];
  var objectInstanceMap = record[/* objectInstanceMap */32];
  var directionLightMap = record[/* directionLightMap */33];
  var pointLightMap = record[/* pointLightMap */34];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, uid) {
                return /* tuple */[
                        _setNewMap(uid, nameMap, param[0]),
                        _setNewMap(uid, geometryMap, param[1]),
                        MutableSparseMapService$WonderCommonlib.set(uid, MutableSparseMapService$WonderCommonlib.unsafeGet(uid, transformMap), param[2]),
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
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
              MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], newAliveUidArray);
}

function reAllocate(record) {
  var disposedUidMap = record[/* disposedUidMap */3];
  var aliveUidArray = record[/* aliveUidArray */22];
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
