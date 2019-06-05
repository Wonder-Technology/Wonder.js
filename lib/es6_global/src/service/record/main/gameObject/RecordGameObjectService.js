

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* uid */0,
          /* nameMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* isRootMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* isActiveMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposeCount */0,
          /* disposedUidMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
          /* pointLightMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* scriptMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(record) {
  var uid = record[/* uid */0];
  var nameMap = record[/* nameMap */1];
  var isRootMap = record[/* isRootMap */2];
  var isActiveMap = record[/* isActiveMap */3];
  var disposeCount = record[/* disposeCount */4];
  var disposedUidMap = record[/* disposedUidMap */5];
  var disposedUidArray = record[/* disposedUidArray */6];
  var disposedUidArrayForKeepOrder = record[/* disposedUidArrayForKeepOrder */7];
  var disposedUidArrayForKeepOrderRemoveGeometry = record[/* disposedUidArrayForKeepOrderRemoveGeometry */8];
  var disposedUidArrayForDisposeGeometryRemoveMaterial = record[/* disposedUidArrayForDisposeGeometryRemoveMaterial */10];
  var disposedUidArrayForRemoveTexture = record[/* disposedUidArrayForRemoveTexture */11];
  var disposedBasicCameraViewArray = record[/* disposedBasicCameraViewArray */12];
  var disposedTransformArray = record[/* disposedTransformArray */13];
  var disposedTransformArrayForKeepOrder = record[/* disposedTransformArrayForKeepOrder */14];
  var disposedPerspectiveCameraProjectionArray = record[/* disposedPerspectiveCameraProjectionArray */15];
  var disposedArcballCameraControllerArray = record[/* disposedArcballCameraControllerArray */16];
  var disposedBasicMaterialDataMap = record[/* disposedBasicMaterialDataMap */17];
  var disposedLightMaterialDataMap = record[/* disposedLightMaterialDataMap */18];
  var disposedLightMaterialRemoveTextureDataMap = record[/* disposedLightMaterialRemoveTextureDataMap */19];
  var disposedGeometryDataMap = record[/* disposedGeometryDataMap */20];
  var disposedSourceInstanceArray = record[/* disposedSourceInstanceArray */21];
  var disposedObjectInstanceArray = record[/* disposedObjectInstanceArray */22];
  var disposedDirectionLightArray = record[/* disposedDirectionLightArray */23];
  var disposedPointLightArray = record[/* disposedPointLightArray */24];
  var disposedMeshRendererComponentArray = record[/* disposedMeshRendererComponentArray */25];
  var disposedScriptArray = record[/* disposedScriptArray */26];
  var aliveUidArray = record[/* aliveUidArray */27];
  var geometryMap = record[/* geometryMap */28];
  var transformMap = record[/* transformMap */29];
  var basicCameraViewMap = record[/* basicCameraViewMap */30];
  var perspectiveCameraProjectionMap = record[/* perspectiveCameraProjectionMap */31];
  var arcballCameraControllerMap = record[/* arcballCameraControllerMap */32];
  var meshRendererMap = record[/* meshRendererMap */33];
  var basicMaterialMap = record[/* basicMaterialMap */34];
  var lightMaterialMap = record[/* lightMaterialMap */35];
  var sourceInstanceMap = record[/* sourceInstanceMap */36];
  var objectInstanceMap = record[/* objectInstanceMap */37];
  var directionLightMap = record[/* directionLightMap */38];
  var pointLightMap = record[/* pointLightMap */39];
  var scriptMap = record[/* scriptMap */40];
  return /* record */[
          /* uid */uid,
          /* nameMap */MutableSparseMapService$WonderCommonlib.copy(nameMap),
          /* isRootMap */MutableSparseMapService$WonderCommonlib.copy(isRootMap),
          /* isActiveMap */MutableSparseMapService$WonderCommonlib.copy(isActiveMap),
          /* disposeCount */disposeCount,
          /* disposedUidMap */MutableSparseMapService$WonderCommonlib.copy(disposedUidMap),
          /* disposedUidArray */MutableSparseMapService$WonderCommonlib.copy(disposedUidArray),
          /* disposedUidArrayForKeepOrder */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForKeepOrder),
          /* disposedUidArrayForKeepOrderRemoveGeometry */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForKeepOrderRemoveGeometry),
          /* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForKeepOrderRemoveGeometry),
          /* disposedUidArrayForDisposeGeometryRemoveMaterial */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForDisposeGeometryRemoveMaterial),
          /* disposedUidArrayForRemoveTexture */MutableSparseMapService$WonderCommonlib.copy(disposedUidArrayForRemoveTexture),
          /* disposedBasicCameraViewArray */MutableSparseMapService$WonderCommonlib.copy(disposedBasicCameraViewArray),
          /* disposedTransformArray */MutableSparseMapService$WonderCommonlib.copy(disposedTransformArray),
          /* disposedTransformArrayForKeepOrder */MutableSparseMapService$WonderCommonlib.copy(disposedTransformArrayForKeepOrder),
          /* disposedPerspectiveCameraProjectionArray */MutableSparseMapService$WonderCommonlib.copy(disposedPerspectiveCameraProjectionArray),
          /* disposedArcballCameraControllerArray */MutableSparseMapService$WonderCommonlib.copy(disposedArcballCameraControllerArray),
          /* disposedBasicMaterialDataMap */MutableSparseMapService$WonderCommonlib.copy(disposedBasicMaterialDataMap),
          /* disposedLightMaterialDataMap */MutableSparseMapService$WonderCommonlib.copy(disposedLightMaterialDataMap),
          /* disposedLightMaterialRemoveTextureDataMap */MutableSparseMapService$WonderCommonlib.copy(disposedLightMaterialRemoveTextureDataMap),
          /* disposedGeometryDataMap */MutableSparseMapService$WonderCommonlib.copy(disposedGeometryDataMap),
          /* disposedSourceInstanceArray */MutableSparseMapService$WonderCommonlib.copy(disposedSourceInstanceArray),
          /* disposedObjectInstanceArray */MutableSparseMapService$WonderCommonlib.copy(disposedObjectInstanceArray),
          /* disposedDirectionLightArray */MutableSparseMapService$WonderCommonlib.copy(disposedDirectionLightArray),
          /* disposedPointLightArray */MutableSparseMapService$WonderCommonlib.copy(disposedPointLightArray),
          /* disposedMeshRendererComponentArray */MutableSparseMapService$WonderCommonlib.copy(disposedMeshRendererComponentArray),
          /* disposedScriptArray */MutableSparseMapService$WonderCommonlib.copy(disposedScriptArray),
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
          /* pointLightMap */MutableSparseMapService$WonderCommonlib.copy(pointLightMap),
          /* scriptMap */MutableSparseMapService$WonderCommonlib.copy(scriptMap)
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
