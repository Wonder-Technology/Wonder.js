

import * as InstanceTool$Wonderjs from "./InstanceTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as VboBufferTool$Wonderjs from "../vboBuffer/VboBufferTool.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../src/api/SourceInstanceAPI.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function createObjectInstanceGameObject(state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var match$1 = InstanceTool$Wonderjs.addSourceInstance(gameObject, match[0]);
  var sourceInstance = match$1[1];
  var state$1 = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMap(sourceInstance, match$1[0]);
  var match$2 = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, state$1);
  var objectInstanceGameObject = match$2[1];
  var state$2 = match$2[0];
  return /* tuple */[
          state$2,
          gameObject,
          sourceInstance,
          objectInstanceGameObject,
          GameObjectAPI$Wonderjs.unsafeGetGameObjectObjectInstanceComponent(objectInstanceGameObject, state$2)
        ];
}

function createObjectInstanceGameObjectArr(count, state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var match$1 = InstanceTool$Wonderjs.addSourceInstance(gameObject, match[0]);
  var sourceInstance = match$1[1];
  var state$1 = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMap(sourceInstance, match$1[0]);
  var objectInstanceGameObjectArr = /* array */[];
  for(var i = 0 ,i_finish = count - 1 | 0; i <= i_finish; ++i){
    var match$2 = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, state$1);
    objectInstanceGameObjectArr.push(match$2[1]);
  }
  return /* tuple */[
          state$1,
          gameObject,
          sourceInstance,
          objectInstanceGameObjectArr,
          objectInstanceGameObjectArr.map((function (objectInstanceGameObject) {
                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectObjectInstanceComponent(objectInstanceGameObject, state$1);
                }))
        ];
}

function getObjectInstanceRecord(state) {
  return state[/* objectInstanceRecord */7];
}

function isDisposed(objectInstance, state) {
  var match = state[/* objectInstanceRecord */7];
  return !MutableSparseMapService$WonderCommonlib.has(objectInstance, match[/* sourceInstanceMap */1]);
}

export {
  createObjectInstanceGameObject ,
  createObjectInstanceGameObjectArr ,
  getObjectInstanceRecord ,
  isDisposed ,
  
}
/* InstanceTool-Wonderjs Not a pure module */
