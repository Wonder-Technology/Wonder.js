

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create() {
  return /* record */[
          /* uid */0,
          /* nameMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposeCount */0,
          /* disposedUidMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
          /* aliveUidArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* transformMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* basicCameraViewMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* perspectiveCameraProjectionMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* arcballCameraControllerMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* meshRendererMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* basicMaterialMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* lightMaterialMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* sourceInstanceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* objectInstanceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* directionLightMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointLightMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(record) {
  var uid = record[/* uid */0];
  var nameMap = record[/* nameMap */1];
  var disposeCount = record[/* disposeCount */2];
  var disposedUidMap = record[/* disposedUidMap */3];
  var disposedUidArray = record[/* disposedUidArray */4];
  var disposedUidArrayForKeepOrder = record[/* disposedUidArrayForKeepOrder */5];
  var disposedUidArrayForKeepOrderRemoveGeometry = record[/* disposedUidArrayForKeepOrderRemoveGeometry */6];
  var disposedUidArrayForDisposeGeometryRemoveMaterial = record[/* disposedUidArrayForDisposeGeometryRemoveMaterial */8];
  var disposedBasicCameraViewArray = record[/* disposedBasicCameraViewArray */9];
  var disposedTransformArray = record[/* disposedTransformArray */10];
  var disposedTransformArrayForKeepOrder = record[/* disposedTransformArrayForKeepOrder */11];
  var disposedPerspectiveCameraProjectionArray = record[/* disposedPerspectiveCameraProjectionArray */12];
  var disposedBasicMaterialDataArray = record[/* disposedBasicMaterialDataArray */14];
  var disposedLightMaterialDataArray = record[/* disposedLightMaterialDataArray */15];
  var disposedGeometryDataArray = record[/* disposedGeometryDataArray */16];
  var disposedSourceInstanceArray = record[/* disposedSourceInstanceArray */17];
  var disposedObjectInstanceArray = record[/* disposedObjectInstanceArray */18];
  var disposedDirectionLightArray = record[/* disposedDirectionLightArray */19];
  var disposedPointLightArray = record[/* disposedPointLightArray */20];
  var disposedMeshRendererComponentArray = record[/* disposedMeshRendererComponentArray */21];
  var aliveUidArray = record[/* aliveUidArray */22];
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
  return /* record */[
          /* uid */uid,
          /* nameMap */MutableSparseMapService$WonderCommonlib.copy(nameMap),
          /* disposeCount */disposeCount,
          /* disposedUidMap */MutableSparseMapService$WonderCommonlib.copy(disposedUidMap),
          /* disposedUidArray */MutableSparseMapService$WonderCommonlib.copy(disposedUidArray),
          /* disposedUidArrayForKeepOrder */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForKeepOrder),
          /* disposedUidArrayForKeepOrderRemoveGeometry */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForKeepOrderRemoveGeometry),
          /* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForKeepOrderRemoveGeometry),
          /* disposedUidArrayForDisposeGeometryRemoveMaterial */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForDisposeGeometryRemoveMaterial),
          /* disposedBasicCameraViewArray */MutableSparseMapService$WonderCommonlib.copy(disposedBasicCameraViewArray),
          /* disposedTransformArray */MutableSparseMapService$WonderCommonlib.copy(disposedTransformArray),
          /* disposedTransformArrayForKeepOrder */MutableSparseMapService$WonderCommonlib.copy(disposedTransformArrayForKeepOrder),
          /* disposedPerspectiveCameraProjectionArray */MutableSparseMapService$WonderCommonlib.copy(disposedPerspectiveCameraProjectionArray),
          /* disposedArcballCameraControllerArray */MutableSparseMapService$WonderCommonlib.copy(disposedPerspectiveCameraProjectionArray),
          /* disposedBasicMaterialDataArray */MutableSparseMapService$WonderCommonlib.copy(disposedBasicMaterialDataArray),
          /* disposedLightMaterialDataArray */MutableSparseMapService$WonderCommonlib.copy(disposedLightMaterialDataArray),
          /* disposedGeometryDataArray */MutableSparseMapService$WonderCommonlib.copy(disposedGeometryDataArray),
          /* disposedSourceInstanceArray */MutableSparseMapService$WonderCommonlib.copy(disposedSourceInstanceArray),
          /* disposedObjectInstanceArray */MutableSparseMapService$WonderCommonlib.copy(disposedObjectInstanceArray),
          /* disposedDirectionLightArray */MutableSparseMapService$WonderCommonlib.copy(disposedDirectionLightArray),
          /* disposedPointLightArray */MutableSparseMapService$WonderCommonlib.copy(disposedPointLightArray),
          /* disposedMeshRendererComponentArray */MutableSparseMapService$WonderCommonlib.copy(disposedMeshRendererComponentArray),
          /* aliveUidArray */MutableSparseMapService$WonderCommonlib.copy(aliveUidArray),
          /* geometryMap */MutableSparseMapService$WonderCommonlib.copy(geometryMap),
          /* transformMap */MutableSparseMapService$WonderCommonlib.copy(transformMap),
          /* basicCameraViewMap */MutableSparseMapService$WonderCommonlib.copy(basicCameraViewMap),
          /* perspectiveCameraProjectionMap */MutableSparseMapService$WonderCommonlib.copy(perspectiveCameraProjectionMap),
          /* arcballCameraControllerMap */MutableSparseMapService$WonderCommonlib.copy(arcballCameraControllerMap),
          /* meshRendererMap */MutableSparseMapService$WonderCommonlib.copy(meshRendererMap),
          /* basicMaterialMap */MutableSparseMapService$WonderCommonlib.copy(basicMaterialMap),
          /* lightMaterialMap */MutableSparseMapService$WonderCommonlib.copy(lightMaterialMap),
          /* sourceInstanceMap */MutableSparseMapService$WonderCommonlib.copy(sourceInstanceMap),
          /* objectInstanceMap */MutableSparseMapService$WonderCommonlib.copy(objectInstanceMap),
          /* directionLightMap */MutableSparseMapService$WonderCommonlib.copy(directionLightMap),
          /* pointLightMap */MutableSparseMapService$WonderCommonlib.copy(pointLightMap)
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
