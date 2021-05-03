

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayMapService$Wonderjs from "../../../atom/ArrayMapService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RemoveComponentGameObjectMainService$Wonderjs from "./RemoveComponentGameObjectMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "./DisposeComponentGameObjectMainService.js";
import * as BatchGetComponentGameObjectMainService$Wonderjs from "./BatchGetComponentGameObjectMainService.js";

function _getSharableComponentDataArr(uidArray, getComponentFunc, gameObjectRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (dataMap, uid) {
                var match = getComponentFunc(uid, gameObjectRecord);
                if (match !== undefined) {
                  return ArrayMapService$Wonderjs.addValue(match, uid, dataMap);
                } else {
                  return dataMap;
                }
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), uidArray);
}

function _batchDisposeSharableComponents(uidArray, param, param$1, state) {
  var isRemoveTexture = param[2];
  var isRemoveMaterial = param[1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var geometryDataMap = _getSharableComponentDataArr(uidArray, GetComponentGameObjectService$Wonderjs.getGeometryComponent, gameObjectRecord);
  var match = param[0] ? /* tuple */[
      RemoveComponentGameObjectMainService$Wonderjs.batchRemoveGeometryComponent(state, geometryDataMap),
      /* array */[]
    ] : DisposeComponentGameObjectMainService$Wonderjs.batchDisposeGeometryComponentData(state, geometryDataMap);
  var state$1 = match[0];
  var basicMaterialDataMap = _getSharableComponentDataArr(uidArray, GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent, gameObjectRecord);
  var state$2 = isRemoveMaterial ? RemoveComponentGameObjectMainService$Wonderjs.batchRemoveBasicMaterialComponent(state$1, basicMaterialDataMap) : Curry._3(param$1[0], state$1, basicMaterialDataMap, isRemoveTexture);
  var gameObjectRecord$1 = state$2[/* gameObjectRecord */10];
  var lightMaterialDataMap = _getSharableComponentDataArr(uidArray, GetComponentGameObjectService$Wonderjs.getLightMaterialComponent, gameObjectRecord$1);
  var state$3 = isRemoveMaterial ? RemoveComponentGameObjectMainService$Wonderjs.batchRemoveLightMaterialComponent(state$2, lightMaterialDataMap) : Curry._3(param$1[1], state$2, lightMaterialDataMap, isRemoveTexture);
  return /* tuple */[
          state$3,
          match[1]
        ];
}

function batchDispose(param, param$1, state) {
  var batchDisposeLightMaterialComponentFunc = param$1[1];
  var batchDisposeBasicMaterialComponentFunc = param$1[0];
  var isRemoveTexture = param[4];
  var isRemoveMaterial = param[3];
  var isRemoveGeometry = param[2];
  var isKeepOrder = param[1];
  var uidArray = param[0];
  var state$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeTransformComponent(state, isKeepOrder, BatchGetComponentGameObjectMainService$Wonderjs.batchGetTransformComponent(uidArray, state));
  var match = _batchDisposeSharableComponents(uidArray, /* tuple */[
        isRemoveGeometry,
        isRemoveMaterial,
        isRemoveTexture
      ], /* tuple */[
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc
      ], state$1);
  var state$2 = match[0];
  var state$3 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeScriptComponent(state$2, BatchGetComponentGameObjectMainService$Wonderjs.batchGetScriptComponent(uidArray, state$2));
  var state$4 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicCameraViewComponent(state$3, BatchGetComponentGameObjectMainService$Wonderjs.batchGetBasicCameraViewComponent(uidArray, state$3));
  var state$5 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePerspectiveCameraProjectionComponent(state$4, BatchGetComponentGameObjectMainService$Wonderjs.batchGetPerspectiveCameraProjectionComponent(uidArray, state$4));
  var state$6 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeArcballCameraControllerComponent(state$5, BatchGetComponentGameObjectMainService$Wonderjs.batchGetArcballCameraControllerComponent(uidArray, state$5));
  var state$7 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeMeshRendererComponent(state$6, BatchGetComponentGameObjectMainService$Wonderjs.batchGetMeshRendererComponent(uidArray, state$6));
  var state$8 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeDirectionLightComponent(state$7, BatchGetComponentGameObjectMainService$Wonderjs.batchGetDirectionLightComponent(uidArray, state$7));
  var state$9 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposePointLightComponent(state$8, BatchGetComponentGameObjectMainService$Wonderjs.batchGetPointLightComponent(uidArray, state$8));
  var match$1 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeSourceInstanceComponent(state$9, /* tuple */[
        isKeepOrder,
        isRemoveGeometry,
        isRemoveMaterial,
        isRemoveTexture
      ], Curry._1(param$1[2], /* tuple */[
            batchDisposeBasicMaterialComponentFunc,
            batchDisposeLightMaterialComponentFunc
          ]), BatchGetComponentGameObjectMainService$Wonderjs.batchGetSourceInstanceComponent(uidArray, state$9));
  var state$10 = match$1[0];
  var state$11 = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeObjectInstanceComponent(state$10, BatchGetComponentGameObjectMainService$Wonderjs.batchGetObjectInstanceComponent(uidArray, state$10));
  return /* tuple */[
          state$11,
          match[1],
          match$1[1]
        ];
}

export {
  _getSharableComponentDataArr ,
  _batchDisposeSharableComponents ,
  batchDispose ,
  
}
/* ArrayMapService-Wonderjs Not a pure module */
