'use strict';

var CPRepo$Wonderjs = require("../infrastructure_layer/data/container/CPRepo.bs.js");
var Result$Wonderjs = require("../../../construct/domain_layer/library/structure/Result.bs.js");
var RepoDpRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/dependency/RepoDpRunAPI.bs.js");
var TimeCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/TimeCPRepoDp.bs.js");
var ImageCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/asset/ImageCPRepoDp.bs.js");
var SceneCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/SceneCPRepoDp.bs.js");
var JobCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/JobCPDoService.bs.js");
var PipelineRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/domain/PipelineRunAPI.bs.js");
var PassCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/PassCPDoService.bs.js");
var GeometryCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/GeometryCPRepoDp.bs.js");
var POConfigCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/POConfigCPRepoDp.bs.js");
var POConfigDpRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/dependency/POConfigDpRunAPI.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");
var TransformCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/TransformCPRepoDp.bs.js");
var GameObjectCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/GameObjectCPRepoDp.bs.js");
var GlobalTempCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/GlobalTempCPRepoDp.bs.js");
var PictureCPDoService$Wonderjs = require("../domain_layer/domain/picture/picture/service/PictureCPDoService.bs.js");
var PBRMaterialCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/PBRMaterialCPRepoDp.bs.js");
var PipelineCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/PipelineCPDoService.bs.js");
var CreatePOGeometryCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/geometry/CreatePOGeometryCPRepo.bs.js");
var DirectionLightCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/DirectionLightCPRepoDp.bs.js");
var BasicCameraViewCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/BasicCameraViewCPRepoDp.bs.js");
var CreatePOTransformCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/transform/CreatePOTransformCPRepo.bs.js");
var CreatePOPBRMaterialCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/pbr_material/CreatePOPBRMaterialCPRepo.bs.js");
var CreatePODirectionLightCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/direction_light/CreatePODirectionLightCPRepo.bs.js");
var PerspectiveCameraProjectionCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/PerspectiveCameraProjectionCPRepoDp.bs.js");

function _createAndSetAllComponentPOs(param) {
  return Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.mapSuccess(CreatePOTransformCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setTransform), (function (param) {
                        return Result$Wonderjs.mapSuccess(CreatePOPBRMaterialCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setPBRMaterial);
                      })), (function (param) {
                    return Result$Wonderjs.mapSuccess(CreatePOGeometryCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setGeometry);
                  })), (function (param) {
                return Result$Wonderjs.mapSuccess(CreatePODirectionLightCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setDirectionLight);
              }));
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
          hasTransform: GameObjectCPRepoDp$Wonderjs.hasTransform,
          addPBRMaterial: GameObjectCPRepoDp$Wonderjs.addPBRMaterial,
          getPBRMaterial: GameObjectCPRepoDp$Wonderjs.getPBRMaterial,
          hasPBRMaterial: GameObjectCPRepoDp$Wonderjs.hasPBRMaterial,
          addGeometry: GameObjectCPRepoDp$Wonderjs.addGeometry,
          getGeometry: GameObjectCPRepoDp$Wonderjs.getGeometry,
          hasGeometry: GameObjectCPRepoDp$Wonderjs.hasGeometry,
          addDirectionLight: GameObjectCPRepoDp$Wonderjs.addDirectionLight,
          getDirectionLight: GameObjectCPRepoDp$Wonderjs.getDirectionLight,
          hasDirectionLight: GameObjectCPRepoDp$Wonderjs.hasDirectionLight,
          addBasicCameraView: GameObjectCPRepoDp$Wonderjs.addBasicCameraView,
          getBasicCameraView: GameObjectCPRepoDp$Wonderjs.getBasicCameraView,
          hasBasicCameraView: GameObjectCPRepoDp$Wonderjs.hasBasicCameraView,
          addPerspectiveCameraProjection: GameObjectCPRepoDp$Wonderjs.addPerspectiveCameraProjection,
          getPerspectiveCameraProjection: GameObjectCPRepoDp$Wonderjs.getPerspectiveCameraProjection,
          hasPerspectiveCameraProjection: GameObjectCPRepoDp$Wonderjs.hasPerspectiveCameraProjection,
          getAllGeometryGameObjects: GameObjectCPRepoDp$Wonderjs.getAllGeometryGameObjects,
          getAllGameObjectGeometries: GameObjectCPRepoDp$Wonderjs.getAllGameObjectGeometries,
          getAllGameObjectPBRMaterials: GameObjectCPRepoDp$Wonderjs.getAllGameObjectPBRMaterials
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
        pbrMaterialRepo: {
          getMaxIndex: PBRMaterialCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: PBRMaterialCPRepoDp$Wonderjs.setMaxIndex,
          getGameObjects: PBRMaterialCPRepoDp$Wonderjs.getGameObjects,
          addGameObject: PBRMaterialCPRepoDp$Wonderjs.addGameObject,
          getDiffuseColor: PBRMaterialCPRepoDp$Wonderjs.getDiffuseColor,
          setDiffuseColor: PBRMaterialCPRepoDp$Wonderjs.setDiffuseColor,
          getSpecular: PBRMaterialCPRepoDp$Wonderjs.getSpecular,
          setSpecular: PBRMaterialCPRepoDp$Wonderjs.setSpecular,
          getRoughness: PBRMaterialCPRepoDp$Wonderjs.getRoughness,
          setRoughness: PBRMaterialCPRepoDp$Wonderjs.setRoughness,
          getMetalness: PBRMaterialCPRepoDp$Wonderjs.getMetalness,
          setMetalness: PBRMaterialCPRepoDp$Wonderjs.setMetalness,
          getDiffuseMapImageId: PBRMaterialCPRepoDp$Wonderjs.getDiffuseMapImageId,
          setDiffuseMapImageId: PBRMaterialCPRepoDp$Wonderjs.setDiffuseMapImageId,
          getChannelRoughnessMetallicMapImageId: PBRMaterialCPRepoDp$Wonderjs.getChannelRoughnessMetallicMapImageId,
          setChannelRoughnessMetallicMapImageId: PBRMaterialCPRepoDp$Wonderjs.setChannelRoughnessMetallicMapImageId,
          getEmissionMapImageId: PBRMaterialCPRepoDp$Wonderjs.getEmissionMapImageId,
          setEmissionMapImageId: PBRMaterialCPRepoDp$Wonderjs.setEmissionMapImageId,
          getNormalMapImageId: PBRMaterialCPRepoDp$Wonderjs.getNormalMapImageId,
          setNormalMapImageId: PBRMaterialCPRepoDp$Wonderjs.setNormalMapImageId
        },
        geometryRepo: {
          getMaxIndex: GeometryCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: GeometryCPRepoDp$Wonderjs.setMaxIndex,
          getGameObjects: GeometryCPRepoDp$Wonderjs.getGameObjects,
          addGameObject: GeometryCPRepoDp$Wonderjs.addGameObject,
          getVertices: GeometryCPRepoDp$Wonderjs.getVertices,
          setVertices: GeometryCPRepoDp$Wonderjs.setVertices,
          getNormals: GeometryCPRepoDp$Wonderjs.getNormals,
          setNormals: GeometryCPRepoDp$Wonderjs.setNormals,
          getTexCoords: GeometryCPRepoDp$Wonderjs.getTexCoords,
          setTexCoords: GeometryCPRepoDp$Wonderjs.setTexCoords,
          getTangents: GeometryCPRepoDp$Wonderjs.getTangents,
          setTangents: GeometryCPRepoDp$Wonderjs.setTangents,
          getIndices: GeometryCPRepoDp$Wonderjs.getIndices,
          setIndices: GeometryCPRepoDp$Wonderjs.setIndices,
          hasVertices: GeometryCPRepoDp$Wonderjs.hasVertices,
          hasNormals: GeometryCPRepoDp$Wonderjs.hasNormals,
          hasTexCoords: GeometryCPRepoDp$Wonderjs.hasTexCoords,
          hasTangents: GeometryCPRepoDp$Wonderjs.hasTangents,
          hasIndices: GeometryCPRepoDp$Wonderjs.hasIndices,
          getIndicesCount: GeometryCPRepoDp$Wonderjs.getIndicesCount
        },
        directionLightRepo: {
          getMaxIndex: DirectionLightCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: DirectionLightCPRepoDp$Wonderjs.setMaxIndex,
          getGameObject: DirectionLightCPRepoDp$Wonderjs.getGameObject,
          setGameObject: DirectionLightCPRepoDp$Wonderjs.setGameObject,
          getColor: DirectionLightCPRepoDp$Wonderjs.getColor,
          setColor: DirectionLightCPRepoDp$Wonderjs.setColor,
          getIntensity: DirectionLightCPRepoDp$Wonderjs.getIntensity,
          setIntensity: DirectionLightCPRepoDp$Wonderjs.setIntensity
        },
        basicCameraViewRepo: {
          getMaxIndex: BasicCameraViewCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: BasicCameraViewCPRepoDp$Wonderjs.setMaxIndex,
          getGameObject: BasicCameraViewCPRepoDp$Wonderjs.getGameObject,
          setGameObject: BasicCameraViewCPRepoDp$Wonderjs.setGameObject,
          isActive: BasicCameraViewCPRepoDp$Wonderjs.isActive,
          setAllNotActive: BasicCameraViewCPRepoDp$Wonderjs.setAllNotActive,
          setActive: BasicCameraViewCPRepoDp$Wonderjs.setActive,
          getActiveBasicCameraViews: BasicCameraViewCPRepoDp$Wonderjs.getActiveBasicCameraViews
        },
        perspectiveCameraProjectionRepo: {
          getMaxIndex: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setMaxIndex,
          getGameObject: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getGameObject,
          setGameObject: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setGameObject,
          getPMatrix: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getPMatrix,
          setPMatrix: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setPMatrix,
          addToDirtyList: PerspectiveCameraProjectionCPRepoDp$Wonderjs.addToDirtyList,
          getDirtyList: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getDirtyList,
          clearDirtyList: PerspectiveCameraProjectionCPRepoDp$Wonderjs.clearDirtyList,
          getFovy: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getFovy,
          setFovy: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setFovy,
          getAspect: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getAspect,
          setAspect: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setAspect,
          getNear: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getNear,
          setNear: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setNear,
          getFar: PerspectiveCameraProjectionCPRepoDp$Wonderjs.getFar,
          setFar: PerspectiveCameraProjectionCPRepoDp$Wonderjs.setFar,
          markDirty: PerspectiveCameraProjectionCPRepoDp$Wonderjs.markDirty,
          markNotDirty: PerspectiveCameraProjectionCPRepoDp$Wonderjs.markNotDirty
        },
        globalTempRepo: {
          getFloat32Array1: GlobalTempCPRepoDp$Wonderjs.getFloat32Array1,
          getFloat9Array: GlobalTempCPRepoDp$Wonderjs.getFloat9Array
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
        },
        imageRepo: {
          getData: ImageCPRepoDp$Wonderjs.getData,
          setData: ImageCPRepoDp$Wonderjs.setData
        }
      });
  return POConfigDpRunAPI$Wonderjs.set({
              getTransformCount: POConfigCPRepoDp$Wonderjs.getTransformCount,
              getPBRMaterialCount: POConfigCPRepoDp$Wonderjs.getPBRMaterialCount,
              getGeometryPointCount: POConfigCPRepoDp$Wonderjs.getGeometryPointCount,
              getGeometryCount: POConfigCPRepoDp$Wonderjs.getGeometryCount,
              getDirectionLightCount: POConfigCPRepoDp$Wonderjs.getDirectionLightCount
            });
}

function prepare(pictureSize, sampleCount) {
  _injectDependencies(undefined);
  return Result$Wonderjs.mapSuccess(_createAndSetAllComponentPOs(undefined), (function (param) {
                PictureCPDoService$Wonderjs.setSize(pictureSize);
                return PassCPDoService$Wonderjs.setSampleCount(sampleCount);
              }));
}

var _parseAndSetPipelineStream = PipelineRunAPI$Wonderjs.parsePipelineData;

function init(param) {
  JobCPDoService$Wonderjs.registerAllJobs(undefined);
  return PipelineRunAPI$Wonderjs.parsePipelineData(PipelineCPDoService$Wonderjs.getInitPipelineData(undefined));
}

function update(param) {
  return PipelineRunAPI$Wonderjs.parsePipelineData(PipelineCPDoService$Wonderjs.getUpdatePipelineData(undefined));
}

function render(param) {
  return PipelineRunAPI$Wonderjs.parsePipelineData(PipelineCPDoService$Wonderjs.getRenderPipelineData(undefined));
}

exports._createAndSetAllComponentPOs = _createAndSetAllComponentPOs;
exports._injectDependencies = _injectDependencies;
exports.prepare = prepare;
exports._parseAndSetPipelineStream = _parseAndSetPipelineStream;
exports.init = init;
exports.update = update;
exports.render = render;
/* CPRepo-Wonderjs Not a pure module */
