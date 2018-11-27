

import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* uid */0,
          /* nameMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposeCount */0,
          /* disposedUidMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
          /* geometryMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* transformMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* basicCameraViewMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* perspectiveCameraProjectionMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* arcballCameraControllerMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* meshRendererMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* basicMaterialMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* lightMaterialMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* sourceInstanceMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* objectInstanceMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* directionLightMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* pointLightMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
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
          /* nameMap */SparseMapService$Wonderjs.copy(nameMap),
          /* disposeCount */disposeCount,
          /* disposedUidMap */SparseMapService$Wonderjs.copy(disposedUidMap),
          /* disposedUidArray */SparseMapService$Wonderjs.copy(disposedUidArray),
          /* disposedUidArrayForKeepOrder */SparseMapService$Wonderjs.copy(disposedUidArrayForKeepOrder),
          /* disposedUidArrayForKeepOrderRemoveGeometry */SparseMapService$Wonderjs.copy(disposedUidArrayForKeepOrderRemoveGeometry),
          /* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */SparseMapService$Wonderjs.copy(disposedUidArrayForKeepOrderRemoveGeometry),
          /* disposedUidArrayForDisposeGeometryRemoveMaterial */SparseMapService$Wonderjs.copy(disposedUidArrayForDisposeGeometryRemoveMaterial),
          /* disposedBasicCameraViewArray */SparseMapService$Wonderjs.copy(disposedBasicCameraViewArray),
          /* disposedTransformArray */SparseMapService$Wonderjs.copy(disposedTransformArray),
          /* disposedTransformArrayForKeepOrder */SparseMapService$Wonderjs.copy(disposedTransformArrayForKeepOrder),
          /* disposedPerspectiveCameraProjectionArray */SparseMapService$Wonderjs.copy(disposedPerspectiveCameraProjectionArray),
          /* disposedArcballCameraControllerArray */SparseMapService$Wonderjs.copy(disposedPerspectiveCameraProjectionArray),
          /* disposedBasicMaterialDataArray */SparseMapService$Wonderjs.copy(disposedBasicMaterialDataArray),
          /* disposedLightMaterialDataArray */SparseMapService$Wonderjs.copy(disposedLightMaterialDataArray),
          /* disposedGeometryDataArray */SparseMapService$Wonderjs.copy(disposedGeometryDataArray),
          /* disposedSourceInstanceArray */SparseMapService$Wonderjs.copy(disposedSourceInstanceArray),
          /* disposedObjectInstanceArray */SparseMapService$Wonderjs.copy(disposedObjectInstanceArray),
          /* disposedDirectionLightArray */SparseMapService$Wonderjs.copy(disposedDirectionLightArray),
          /* disposedPointLightArray */SparseMapService$Wonderjs.copy(disposedPointLightArray),
          /* disposedMeshRendererComponentArray */SparseMapService$Wonderjs.copy(disposedMeshRendererComponentArray),
          /* aliveUidArray */SparseMapService$Wonderjs.copy(aliveUidArray),
          /* geometryMap */SparseMapService$Wonderjs.copy(geometryMap),
          /* transformMap */SparseMapService$Wonderjs.copy(transformMap),
          /* basicCameraViewMap */SparseMapService$Wonderjs.copy(basicCameraViewMap),
          /* perspectiveCameraProjectionMap */SparseMapService$Wonderjs.copy(perspectiveCameraProjectionMap),
          /* arcballCameraControllerMap */SparseMapService$Wonderjs.copy(arcballCameraControllerMap),
          /* meshRendererMap */SparseMapService$Wonderjs.copy(meshRendererMap),
          /* basicMaterialMap */SparseMapService$Wonderjs.copy(basicMaterialMap),
          /* lightMaterialMap */SparseMapService$Wonderjs.copy(lightMaterialMap),
          /* sourceInstanceMap */SparseMapService$Wonderjs.copy(sourceInstanceMap),
          /* objectInstanceMap */SparseMapService$Wonderjs.copy(objectInstanceMap),
          /* directionLightMap */SparseMapService$Wonderjs.copy(directionLightMap),
          /* pointLightMap */SparseMapService$Wonderjs.copy(pointLightMap)
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
