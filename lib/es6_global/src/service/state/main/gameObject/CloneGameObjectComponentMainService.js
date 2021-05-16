

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as CloneComponentGameObjectMainService$Wonderjs from "./CloneComponentGameObjectMainService.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "./BatchAddGameObjectComponentMainService.js";

function _clone(param, param$1, state) {
  var component = param[1];
  if (component !== undefined) {
    var match = Curry._3(param$1[0], component, param[2], state);
    return Curry._3(param$1[1], param[3], match[1], match[0]);
  } else {
    return state;
  }
}

function _cloneMeshRenderer(uid, countRangeArr, clonedGameObjectArr, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = GetComponentGameObjectService$Wonderjs.getMeshRendererComponent(uid, gameObjectRecord);
  if (match !== undefined) {
    var match$1 = CloneComponentGameObjectMainService$Wonderjs.cloneMeshRendererComponent(match, countRangeArr, state);
    return BatchAddGameObjectComponentMainService$Wonderjs.batchAddMeshRendererComponentForClone(clonedGameObjectArr, match$1[1], match$1[0]);
  } else {
    return state;
  }
}

function _cloneComponentExceptTransform(param, isShareMaterial, state) {
  var clonedGameObjectArr = param[2];
  var countRangeArr = param[1];
  var uid = param[0];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return _clone(/* tuple */[
              uid,
              GetComponentGameObjectService$Wonderjs.getPointLightComponent(uid, gameObjectRecord),
              countRangeArr,
              clonedGameObjectArr
            ], /* tuple */[
              CloneComponentGameObjectMainService$Wonderjs.clonePointLightComponent,
              BatchAddGameObjectComponentMainService$Wonderjs.batchAddPointLightComponentForClone
            ], _clone(/* tuple */[
                  uid,
                  GetComponentGameObjectService$Wonderjs.getDirectionLightComponent(uid, gameObjectRecord),
                  countRangeArr,
                  clonedGameObjectArr
                ], /* tuple */[
                  CloneComponentGameObjectMainService$Wonderjs.cloneDirectionLightComponent,
                  BatchAddGameObjectComponentMainService$Wonderjs.batchAddDirectionLightComponentForClone
                ], _cloneMeshRenderer(uid, countRangeArr, clonedGameObjectArr, _clone(/* tuple */[
                          uid,
                          GetComponentGameObjectService$Wonderjs.getLightMaterialComponent(uid, gameObjectRecord),
                          countRangeArr,
                          clonedGameObjectArr
                        ], /* tuple */[
                          (function (param, param$1, param$2) {
                              return CloneComponentGameObjectMainService$Wonderjs.cloneLightMaterialComponent(isShareMaterial, param, param$1, param$2);
                            }),
                          BatchAddGameObjectComponentMainService$Wonderjs.batchAddLightMaterialComponentForClone
                        ], _clone(/* tuple */[
                              uid,
                              GetComponentGameObjectService$Wonderjs.getBasicMaterialComponent(uid, gameObjectRecord),
                              countRangeArr,
                              clonedGameObjectArr
                            ], /* tuple */[
                              (function (param, param$1, param$2) {
                                  return CloneComponentGameObjectMainService$Wonderjs.cloneBasicMaterialComponent(isShareMaterial, param, param$1, param$2);
                                }),
                              BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicMaterialComponentForClone
                            ], _clone(/* tuple */[
                                  uid,
                                  GetComponentGameObjectService$Wonderjs.getArcballCameraControllerComponent(uid, gameObjectRecord),
                                  countRangeArr,
                                  clonedGameObjectArr
                                ], /* tuple */[
                                  CloneComponentGameObjectMainService$Wonderjs.cloneArcballCameraControllerComponent,
                                  BatchAddGameObjectComponentMainService$Wonderjs.batchAddArcballCameraControllerComponentForClone
                                ], _clone(/* tuple */[
                                      uid,
                                      GetComponentGameObjectService$Wonderjs.getFlyCameraControllerComponent(uid, gameObjectRecord),
                                      countRangeArr,
                                      clonedGameObjectArr
                                    ], /* tuple */[
                                      CloneComponentGameObjectMainService$Wonderjs.cloneFlyCameraControllerComponent,
                                      BatchAddGameObjectComponentMainService$Wonderjs.batchAddFlyCameraControllerComponentForClone
                                    ], _clone(/* tuple */[
                                          uid,
                                          GetComponentGameObjectService$Wonderjs.getPerspectiveCameraProjectionComponent(uid, gameObjectRecord),
                                          countRangeArr,
                                          clonedGameObjectArr
                                        ], /* tuple */[
                                          CloneComponentGameObjectMainService$Wonderjs.clonePerspectiveCameraProjectionComponent,
                                          BatchAddGameObjectComponentMainService$Wonderjs.batchAddPerspectiveCameraProjectionComponentForClone
                                        ], _clone(/* tuple */[
                                              uid,
                                              GetComponentGameObjectService$Wonderjs.getBasicCameraViewComponent(uid, gameObjectRecord),
                                              countRangeArr,
                                              clonedGameObjectArr
                                            ], /* tuple */[
                                              CloneComponentGameObjectMainService$Wonderjs.cloneBasicCameraViewComponent,
                                              BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicCameraViewComponentForClone
                                            ], _clone(/* tuple */[
                                                  uid,
                                                  GetComponentGameObjectService$Wonderjs.getScriptComponent(uid, gameObjectRecord),
                                                  countRangeArr,
                                                  clonedGameObjectArr
                                                ], /* tuple */[
                                                  CloneComponentGameObjectMainService$Wonderjs.cloneScriptComponent,
                                                  BatchAddGameObjectComponentMainService$Wonderjs.batchAddScriptComponentForClone
                                                ], _clone(/* tuple */[
                                                      uid,
                                                      GetComponentGameObjectService$Wonderjs.getGeometryComponent(uid, gameObjectRecord),
                                                      countRangeArr,
                                                      clonedGameObjectArr
                                                    ], /* tuple */[
                                                      CloneComponentGameObjectMainService$Wonderjs.cloneGeometryComponent,
                                                      BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForClone
                                                    ], state)))))))))));
}

function clone(param, isShareMaterial, state) {
  var clonedGameObjectArr = param[3];
  var countRangeArr = param[2];
  var match = CloneComponentGameObjectMainService$Wonderjs.cloneTransformComponent(param[1], countRangeArr, _cloneComponentExceptTransform(/* tuple */[
            param[0],
            countRangeArr,
            clonedGameObjectArr
          ], isShareMaterial, state));
  var clonedTransformArr = match[1];
  return /* tuple */[
          BatchAddGameObjectComponentMainService$Wonderjs.batchAddTransformComponentForClone(clonedGameObjectArr, clonedTransformArr, match[0]),
          clonedTransformArr
        ];
}

export {
  _clone ,
  _cloneMeshRenderer ,
  _cloneComponentExceptTransform ,
  clone ,
  
}
/* GetComponentGameObjectService-Wonderjs Not a pure module */
