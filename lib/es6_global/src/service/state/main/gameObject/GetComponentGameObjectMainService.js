

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
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var geometryMap = gameObjectRecord[/* geometryMap */28];
  return _getAllComponents(disposedUidMap, geometryMap);
}

function getAllArcballCameraControllerComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var arcballCameraControllerMap = gameObjectRecord[/* arcballCameraControllerMap */32];
  return _getAllComponents(disposedUidMap, arcballCameraControllerMap);
}

function getAllBasicMaterialComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var basicMaterialMap = gameObjectRecord[/* basicMaterialMap */34];
  return _getAllComponents(disposedUidMap, basicMaterialMap);
}

function getAllLightMaterialComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var lightMaterialMap = gameObjectRecord[/* lightMaterialMap */35];
  return _getAllComponents(disposedUidMap, lightMaterialMap);
}

function getAllBasicCameraViewComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var basicCameraViewMap = gameObjectRecord[/* basicCameraViewMap */30];
  return _getAllComponents(disposedUidMap, basicCameraViewMap);
}

function getAllPerspectiveCameraProjectionComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var perspectiveCameraProjectionMap = gameObjectRecord[/* perspectiveCameraProjectionMap */31];
  return _getAllComponents(disposedUidMap, perspectiveCameraProjectionMap);
}

function getAllDirectionLightComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var directionLightMap = gameObjectRecord[/* directionLightMap */38];
  return _getAllComponents(disposedUidMap, directionLightMap);
}

function getAllPointLightComponents(param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */5];
  var pointLightMap = gameObjectRecord[/* pointLightMap */39];
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
/* No side effect */
