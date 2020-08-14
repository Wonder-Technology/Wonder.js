

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DisposeGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeGameObjectMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function _disposeComponents(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var disposedBasicCameraViewArray = gameObjectRecord[/* disposedBasicCameraViewArray */12];
  var disposedTransformArray = gameObjectRecord[/* disposedTransformArray */13];
  var disposedTransformArrayForKeepOrder = gameObjectRecord[/* disposedTransformArrayForKeepOrder */14];
  var disposedPerspectiveCameraProjectionArray = gameObjectRecord[/* disposedPerspectiveCameraProjectionArray */15];
  var disposedArcballCameraControllerArray = gameObjectRecord[/* disposedArcballCameraControllerArray */16];
  var disposedBasicMaterialDataMap = gameObjectRecord[/* disposedBasicMaterialDataMap */17];
  var disposedLightMaterialDataMap = gameObjectRecord[/* disposedLightMaterialDataMap */18];
  var disposedLightMaterialRemoveTextureDataMap = gameObjectRecord[/* disposedLightMaterialRemoveTextureDataMap */19];
  var disposedGeometryDataMap = gameObjectRecord[/* disposedGeometryDataMap */20];
  var disposedSourceInstanceArray = gameObjectRecord[/* disposedSourceInstanceArray */21];
  var disposedObjectInstanceArray = gameObjectRecord[/* disposedObjectInstanceArray */22];
  var disposedDirectionLightArray = gameObjectRecord[/* disposedDirectionLightArray */23];
  var disposedPointLightArray = gameObjectRecord[/* disposedPointLightArray */24];
  var disposedMeshRendererComponentArray = gameObjectRecord[/* disposedMeshRendererComponentArray */25];
  var disposedScriptArray = gameObjectRecord[/* disposedScriptArray */26];
  var state$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicCameraViewComponent(state, disposedBasicCameraViewArray);
  var state$2 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePerspectiveCameraProjectionComponent(state$1, disposedPerspectiveCameraProjectionArray);
  var state$3 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeArcballCameraControllerComponent(state$2, disposedArcballCameraControllerArray);
  var state$4 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state$3, false, disposedTransformArray);
  var state$5 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state$4, true, disposedTransformArrayForKeepOrder);
  var state$6 = Curry._3(batchDisposeBasicMaterialComponentFunc, state$5, disposedBasicMaterialDataMap, false);
  var state$7 = Curry._3(batchDisposeLightMaterialComponentFunc, state$6, disposedLightMaterialDataMap, false);
  var state$8 = Curry._3(batchDisposeLightMaterialComponentFunc, state$7, disposedLightMaterialRemoveTextureDataMap, true);
  var match = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeGeometryComponentData(state$8, disposedGeometryDataMap);
  var partial_arg = /* tuple */[
    batchDisposeBasicMaterialComponentFunc,
    batchDisposeLightMaterialComponentFunc
  ];
  var match$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeSourceInstanceComponent(match[0], /* tuple */[
        false,
        false,
        false,
        false
      ], (function (param, param$1, param$2) {
          return DisposeGameObjectMainService$Wonderjs.batchDispose(partial_arg, param, param$1, param$2);
        }), disposedSourceInstanceArray);
  var state$9 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeObjectInstanceComponent(match$1[0], disposedObjectInstanceArray);
  var state$10 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeDirectionLightComponent(state$9, disposedDirectionLightArray);
  var state$11 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePointLightComponent(state$10, disposedPointLightArray);
  var state$12 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeMeshRendererComponent(state$11, disposedMeshRendererComponentArray);
  var state$13 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeScriptComponent(state$12, disposedScriptArray);
  return /* tuple */[
          state$13,
          match[1],
          match$1[1]
        ];
}

function _disposeGameObjects(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var disposedUidArray = gameObjectRecord[/* disposedUidArray */6];
  var disposedUidArrayForKeepOrder = gameObjectRecord[/* disposedUidArrayForKeepOrder */7];
  var disposedUidArrayForKeepOrderRemoveGeometry = gameObjectRecord[/* disposedUidArrayForKeepOrderRemoveGeometry */8];
  var disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial = gameObjectRecord[/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */9];
  var disposedUidArrayForDisposeGeometryRemoveMaterial = gameObjectRecord[/* disposedUidArrayForDisposeGeometryRemoveMaterial */10];
  var disposedUidArrayForRemoveTexture = gameObjectRecord[/* disposedUidArrayForRemoveTexture */11];
  var match = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArray, /* tuple */[
        false,
        false,
        false,
        false
      ], state);
  var match$1 = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArrayForKeepOrder, /* tuple */[
        true,
        false,
        false,
        false
      ], match[0]);
  var match$2 = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArrayForKeepOrderRemoveGeometry, /* tuple */[
        true,
        true,
        false,
        false
      ], match$1[0]);
  var match$3 = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial, /* tuple */[
        true,
        true,
        true,
        false
      ], match$2[0]);
  var match$4 = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArrayForDisposeGeometryRemoveMaterial, /* tuple */[
        false,
        false,
        true,
        false
      ], match$3[0]);
  var match$5 = DisposeGameObjectMainService$Wonderjs.batchDispose(/* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], disposedUidArrayForRemoveTexture, /* tuple */[
        false,
        false,
        false,
        true
      ], match$4[0]);
  var state$1 = DisposeGameObjectMainService$Wonderjs.clearDeferDisposeData(match$5[0]);
  return /* tuple */[
          state$1,
          match[1].concat(match$1[1], match$2[1], match$3[1], match$4[1], match$5[1]),
          match[2].concat(match$1[2], match$2[2], match$3[2], match$4[2], match$5[2])
        ];
}

function execJob(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state) {
  var match = _disposeComponents(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, state);
  var match$1 = _disposeGameObjects(batchDisposeBasicMaterialComponentFunc, batchDisposeLightMaterialComponentFunc, match[0]);
  return /* tuple */[
          match$1[0],
          match[1].concat(match$1[1]),
          match[2].concat(match$1[2])
        ];
}

export {
  _disposeComponents ,
  _disposeGameObjects ,
  execJob ,
  
}
/* DisposeGameObjectMainService-Wonderjs Not a pure module */
