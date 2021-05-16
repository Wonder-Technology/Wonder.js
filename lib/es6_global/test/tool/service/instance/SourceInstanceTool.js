

import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as InstanceTool$Wonderjs from "./InstanceTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as VboBufferTool$Wonderjs from "../vboBuffer/VboBufferTool.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../src/api/SourceInstanceAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectSourceInstanceService$Wonderjs from "../../../../src/service/record/main/instance/sourceInstance/GameObjectSourceInstanceService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../../src/service/primitive/instance/ObjectInstanceCollectionService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../../../../src/service/state/main/instance/RecordSourceInstanceMainService.js";

function createSourceInstanceGameObject(state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var match$1 = InstanceTool$Wonderjs.addSourceInstance(gameObject, match[0]);
  var sourceInstance = match$1[1];
  var match$2 = SourceInstanceAPI$Wonderjs.createObjectInstanceGameObject(sourceInstance, match$1[0]);
  var state$1 = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMap(sourceInstance, match$2[0]);
  return /* tuple */[
          state$1,
          gameObject,
          sourceInstance
        ];
}

function createSourceInstanceGameObjectArr(count, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                var sourceInstanceArr = param[2];
                var sourceInstanceGameObjectArr = param[1];
                var match = createSourceInstanceGameObject(param[0]);
                sourceInstanceArr.push(match[2]);
                sourceInstanceGameObjectArr.push(match[1]);
                return /* tuple */[
                        match[0],
                        sourceInstanceGameObjectArr,
                        sourceInstanceArr
                      ];
              }), /* tuple */[
              state,
              /* array */[],
              /* array */[]
            ], ArrayService$Wonderjs.range(0, count));
}

var getRecord = RecordSourceInstanceMainService$Wonderjs.getRecord;

function getGameObject(sourceInstance, state) {
  return GameObjectSourceInstanceService$Wonderjs.getGameObject(sourceInstance, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
}

function hasObjectInstanceTransform(sourceInstance, state) {
  var match = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  return ObjectInstanceCollectionService$Wonderjs.getObjectInstanceTransformCount(ObjectInstanceCollectionService$Wonderjs.getObjectInstanceTransformIndex(sourceInstance, match[/* objectInstanceTransformIndexMap */1])) > 0;
}

export {
  createSourceInstanceGameObject ,
  createSourceInstanceGameObjectArr ,
  getRecord ,
  getGameObject ,
  hasObjectInstanceTransform ,
  
}
/* ArrayService-Wonderjs Not a pure module */
