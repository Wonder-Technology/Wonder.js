

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordSceneMainService$Wonderjs from "./RecordSceneMainService.js";
import * as AllGameObjectMainService$Wonderjs from "../gameObject/AllGameObjectMainService.js";
import * as HierachyTransformService$Wonderjs from "../../../record/main/transform/HierachyTransformService.js";
import * as NameGameObjectMainService$Wonderjs from "../gameObject/NameGameObjectMainService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";

function getSceneGameObject(state) {
  return RecordSceneMainService$Wonderjs.getRecord(state)[/* sceneGameObject */1];
}

function setSceneGameObject(sceneGameObject, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordSceneMainService$Wonderjs.getRecord(state);
  newrecord[/* sceneRecord */12] = /* record */[
    /* ambientLight */init[/* ambientLight */0],
    /* sceneGameObject */sceneGameObject
  ];
  return newrecord;
}

function addChild(childGameObject, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = HierachyTransformService$Wonderjs.setParent(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(RecordSceneMainService$Wonderjs.getRecord(state)[/* sceneGameObject */1], gameObjectRecord), GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(childGameObject, gameObjectRecord), RecordTransformMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function addChildren(childGameObjectArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, childGameObject) {
                return addChild(childGameObject, state);
              }), state, childGameObjectArr);
}

function findGameObjectsByName(name, state) {
  return AllGameObjectMainService$Wonderjs.getAllGameObjects(RecordSceneMainService$Wonderjs.getRecord(state)[/* sceneGameObject */1], state).filter((function (gameObject) {
                return NameGameObjectMainService$Wonderjs.getName(gameObject, state) === name;
              }));
}

export {
  getSceneGameObject ,
  setSceneGameObject ,
  addChild ,
  addChildren ,
  findGameObjectsByName ,
  
}
/* RecordSceneMainService-Wonderjs Not a pure module */
