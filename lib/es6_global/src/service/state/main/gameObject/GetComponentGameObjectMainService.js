

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
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var geometryMap = gameObjectRecord[/* geometryMap */23];
  return _getAllComponents(disposedUidMap, geometryMap);
}

function getAllArcballCameraControllerComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var arcballCameraControllerMap = gameObjectRecord[/* arcballCameraControllerMap */27];
  return _getAllComponents(disposedUidMap, arcballCameraControllerMap);
}

function getAllBasicMaterialComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var basicMaterialMap = gameObjectRecord[/* basicMaterialMap */29];
  return _getAllComponents(disposedUidMap, basicMaterialMap);
}

function getAllLightMaterialComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var lightMaterialMap = gameObjectRecord[/* lightMaterialMap */30];
  return _getAllComponents(disposedUidMap, lightMaterialMap);
}

function getAllBasicCameraViewComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var basicCameraViewMap = gameObjectRecord[/* basicCameraViewMap */25];
  return _getAllComponents(disposedUidMap, basicCameraViewMap);
}

function getAllPerspectiveCameraProjectionComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var perspectiveCameraProjectionMap = gameObjectRecord[/* perspectiveCameraProjectionMap */26];
  return _getAllComponents(disposedUidMap, perspectiveCameraProjectionMap);
}

function getAllDirectionLightComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var directionLightMap = gameObjectRecord[/* directionLightMap */33];
  return _getAllComponents(disposedUidMap, directionLightMap);
}

function getAllPointLightComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var pointLightMap = gameObjectRecord[/* pointLightMap */34];
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
