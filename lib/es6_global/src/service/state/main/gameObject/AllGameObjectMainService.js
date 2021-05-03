

import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../record/main/transform/HierachyTransformService.js";
import * as GameObjectTransformService$Wonderjs from "../../../record/main/transform/GameObjectTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";

var _getChildren = HierachyTransformService$Wonderjs.unsafeGetChildren;

function _addChildren(parentArr, transformRecord, totalChildrenArr) {
  var totalChildrenArr$1 = ArrayService$Wonderjs.fastConcat(totalChildrenArr, parentArr);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, parent) {
                var transformRecord = param[0];
                return _addChildren(HierachyTransformService$Wonderjs.unsafeGetChildren(parent, transformRecord), transformRecord, param[1]);
              }), /* tuple */[
              transformRecord,
              totalChildrenArr$1
            ], parentArr);
}

function getAllChildrenTransform(gameObject, state) {
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var parent = GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObject, state[/* gameObjectRecord */10]);
  return _addChildren(HierachyTransformService$Wonderjs.unsafeGetChildren(parent, transformRecord), RecordTransformMainService$Wonderjs.getRecord(state), /* array */[])[1];
}

function getAllGameObjects(gameObject, state) {
  var allTransformChildren = getAllChildrenTransform(gameObject, state);
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  return ArrayService$Wonderjs.fastConcat(/* array */[gameObject], allTransformChildren.map((function (transform) {
                    return GameObjectTransformService$Wonderjs.unsafeGetGameObject(transform, transformRecord);
                  })));
}

function getAllChildren(gameObject, state) {
  return getAllGameObjects(gameObject, state).slice(1);
}

function _getAllComponentsOfGameObject(gameObject, getComponentFunc, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, gameObject) {
                  var allComponents = param[1];
                  var gameObjectRecord = param[0];
                  var match = getComponentFunc(gameObject, gameObjectRecord);
                  if (match !== undefined) {
                    return /* tuple */[
                            gameObjectRecord,
                            ArrayService$Wonderjs.push(Caml_option.valFromOption(match), allComponents)
                          ];
                  } else {
                    return /* tuple */[
                            gameObjectRecord,
                            allComponents
                          ];
                  }
                }), /* tuple */[
                gameObjectRecord,
                /* array */[]
              ], getAllGameObjects(gameObject, state))[1];
}

function getAllDirectionLightComponentsOfGameObject(gameObject, state) {
  return _getAllComponentsOfGameObject(gameObject, GetComponentGameObjectService$Wonderjs.getDirectionLightComponent, state);
}

function getAllPointLightComponentsOfGameObject(gameObject, state) {
  return _getAllComponentsOfGameObject(gameObject, GetComponentGameObjectService$Wonderjs.getPointLightComponent, state);
}

export {
  _getChildren ,
  _addChildren ,
  getAllChildrenTransform ,
  getAllGameObjects ,
  getAllChildren ,
  _getAllComponentsOfGameObject ,
  getAllDirectionLightComponentsOfGameObject ,
  getAllPointLightComponentsOfGameObject ,
  
}
/* ArrayService-Wonderjs Not a pure module */
