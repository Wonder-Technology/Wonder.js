'use strict';

var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var InstanceTool$Wonderjs = require("./InstanceTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var VboBufferTool$Wonderjs = require("../vboBuffer/VboBufferTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../src/api/SourceInstanceAPI.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var GameObjectSourceInstanceService$Wonderjs = require("../../../../src/service/record/main/instance/sourceInstance/GameObjectSourceInstanceService.js");
var ObjectInstanceCollectionService$Wonderjs = require("../../../../src/service/primitive/instance/ObjectInstanceCollectionService.js");
var RecordSourceInstanceMainService$Wonderjs = require("../../../../src/service/state/main/instance/RecordSourceInstanceMainService.js");

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

exports.createSourceInstanceGameObject = createSourceInstanceGameObject;
exports.createSourceInstanceGameObjectArr = createSourceInstanceGameObjectArr;
exports.getRecord = getRecord;
exports.getGameObject = getGameObject;
exports.hasObjectInstanceTransform = hasObjectInstanceTransform;
/* ArrayService-Wonderjs Not a pure module */
