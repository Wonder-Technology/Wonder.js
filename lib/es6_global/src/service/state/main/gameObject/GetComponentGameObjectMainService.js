

import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _getAllComponents(disposedUidMap, componentMap) {
  return componentMap.filter((function (component, uid) {
                if (MutableSparseMapService$WonderCommonlib.has(uid, disposedUidMap)) {
                  return false;
                } else {
                  return component !== undefined;
                }
              }));
}

function getAllGeometryComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var geometryMap = gameObjectRecord[/* geometryMap */24];
  return _getAllComponents(disposedUidMap, geometryMap);
}

function getAllArcballCameraControllerComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var arcballCameraControllerMap = gameObjectRecord[/* arcballCameraControllerMap */28];
  return _getAllComponents(disposedUidMap, arcballCameraControllerMap);
}

function getAllBasicMaterialComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var basicMaterialMap = gameObjectRecord[/* basicMaterialMap */30];
  return _getAllComponents(disposedUidMap, basicMaterialMap);
}

function getAllLightMaterialComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var lightMaterialMap = gameObjectRecord[/* lightMaterialMap */31];
  return _getAllComponents(disposedUidMap, lightMaterialMap);
}

function getAllBasicCameraViewComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var basicCameraViewMap = gameObjectRecord[/* basicCameraViewMap */26];
  return _getAllComponents(disposedUidMap, basicCameraViewMap);
}

function getAllPerspectiveCameraProjectionComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var perspectiveCameraProjectionMap = gameObjectRecord[/* perspectiveCameraProjectionMap */27];
  return _getAllComponents(disposedUidMap, perspectiveCameraProjectionMap);
}

function getAllDirectionLightComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var directionLightMap = gameObjectRecord[/* directionLightMap */34];
  return _getAllComponents(disposedUidMap, directionLightMap);
}

function getAllPointLightComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */4];
  var pointLightMap = gameObjectRecord[/* pointLightMap */35];
  return _getAllComponents(disposedUidMap, pointLightMap);
}

export {
  _getAllComponents ,
  getAllGeometryComponents ,
  getAllArcballCameraControllerComponents ,
  getAllBasicMaterialComponents ,
  getAllLightMaterialComponents ,
  getAllBasicCameraViewComponents ,
  getAllPerspectiveCameraProjectionComponents ,
  getAllDirectionLightComponents ,
  getAllPointLightComponents ,
  
}
/* MutableSparseMapService-WonderCommonlib Not a pure module */
