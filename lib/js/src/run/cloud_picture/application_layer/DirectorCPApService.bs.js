'use strict';

var CPRepo$Wonderjs = require("../domain_layer/repo/CPRepo.bs.js");
var Result$Wonderjs = require("../../../construct/domain_layer/library/structure/Result.bs.js");
var RepoDpRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/dependency/RepoDpRunAPI.bs.js");
var TimeCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/TimeCPRepoDp.bs.js");
var SceneCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/SceneCPRepoDp.bs.js");
var JobCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/JobCPDoService.bs.js");
var PipelineRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/PipelineRunAPI.bs.js");
var POConfigCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/POConfigCPRepoDp.bs.js");
var POConfigDpRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/dependency/POConfigDpRunAPI.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");
var TransformCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/transform/TransformCPRepoDp.bs.js");
var GameObjectCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/GameObjectCPRepoDp.bs.js");
var GlobalTempCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/GlobalTempCPRepoDp.bs.js");
var PipelineCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/PipelineCPDoService.bs.js");
var CreatePOTransformCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/transform/CreatePOTransformCPRepo.bs.js");

function _createAndSetAllComponentPOs(param) {
  return Result$Wonderjs.mapSuccess(CreatePOTransformCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setTransform);
}

function prepare(param) {
  return _createAndSetAllComponentPOs(undefined);
}

function _injectDependencies(param) {
  RepoDpRunAPI$Wonderjs.set({
        sceneRepo: {
          getSceneGameObject: SceneCPRepoDp$Wonderjs.getSceneGameObject,
          setSceneGameObject: SceneCPRepoDp$Wonderjs.setSceneGameObject
        },
        gameObjectRepo: {
          getMaxUID: GameObjectCPRepoDp$Wonderjs.getMaxUID,
          setMaxUID: GameObjectCPRepoDp$Wonderjs.setMaxUID,
          addTransform: GameObjectCPRepoDp$Wonderjs.addTransform,
          getTransform: GameObjectCPRepoDp$Wonderjs.getTransform,
          hasTransform: GameObjectCPRepoDp$Wonderjs.hasTransform
        },
        transformRepo: {
          getMaxIndex: TransformCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: TransformCPRepoDp$Wonderjs.setMaxIndex,
          getIsDirty: TransformCPRepoDp$Wonderjs.getIsDirty,
          setIsDirty: TransformCPRepoDp$Wonderjs.setIsDirty,
          setGameObject: TransformCPRepoDp$Wonderjs.setGameObject,
          getGameObject: TransformCPRepoDp$Wonderjs.getGameObject,
          hasParent: TransformCPRepoDp$Wonderjs.hasParent,
          getParent: TransformCPRepoDp$Wonderjs.getParent,
          setParent: TransformCPRepoDp$Wonderjs.setParent,
          removeParent: TransformCPRepoDp$Wonderjs.removeParent,
          getChildren: TransformCPRepoDp$Wonderjs.getChildren,
          setChildren: TransformCPRepoDp$Wonderjs.setChildren,
          addChild: TransformCPRepoDp$Wonderjs.addChild,
          removeChild: TransformCPRepoDp$Wonderjs.removeChild,
          getLocalToWorldMatrix: TransformCPRepoDp$Wonderjs.getLocalToWorldMatrix,
          getLocalPosition: TransformCPRepoDp$Wonderjs.getLocalPosition,
          setLocalPosition: TransformCPRepoDp$Wonderjs.setLocalPosition,
          getLocalRotation: TransformCPRepoDp$Wonderjs.getLocalRotation,
          setLocalRotation: TransformCPRepoDp$Wonderjs.setLocalRotation,
          getLocalScale: TransformCPRepoDp$Wonderjs.getLocalScale,
          setLocalScale: TransformCPRepoDp$Wonderjs.setLocalScale
        },
        globalTempRepo: {
          getFloat32Array1: GlobalTempCPRepoDp$Wonderjs.getFloat32Array1
        },
        pipelineRepo: {
          getJobExecFunc: PipelineCPRepoDp$Wonderjs.getJobExecFunc,
          setJobExecFunc: PipelineCPRepoDp$Wonderjs.setJobExecFunc,
          getPipelineStream: PipelineCPRepoDp$Wonderjs.getPipelineStream,
          setPipelineStream: PipelineCPRepoDp$Wonderjs.setPipelineStream
        },
        timeRepo: {
          getElapsed: TimeCPRepoDp$Wonderjs.getElapsed,
          start: TimeCPRepoDp$Wonderjs.start
        }
      });
  return POConfigDpRunAPI$Wonderjs.set({
              getTransformCount: POConfigCPRepoDp$Wonderjs.getTransformCount
            });
}

var _parseAndSetPipelineStream = PipelineRunAPI$Wonderjs.parsePipelineData;

function init(param) {
  _injectDependencies(undefined);
  JobCPDoService$Wonderjs.registerAllJobs(undefined);
  return PipelineRunAPI$Wonderjs.parsePipelineData(PipelineCPDoService$Wonderjs.getInitPipelineData(undefined));
}

function run(param) {
  return PipelineRunAPI$Wonderjs.parsePipelineData(PipelineCPDoService$Wonderjs.getRunPipelineData(undefined));
}

exports._createAndSetAllComponentPOs = _createAndSetAllComponentPOs;
exports.prepare = prepare;
exports._injectDependencies = _injectDependencies;
exports._parseAndSetPipelineStream = _parseAndSetPipelineStream;
exports.init = init;
exports.run = run;
/* CPRepo-Wonderjs Not a pure module */
