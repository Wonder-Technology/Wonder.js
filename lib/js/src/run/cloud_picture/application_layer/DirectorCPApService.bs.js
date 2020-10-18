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
var POConfigDpRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/dependency/POConfigDpRunAPI.bs.js");
var PipelineCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/PipelineCPRepoDp.bs.js");
var TransformCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/TransformCPRepoDp.bs.js");
var GameObjectCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/GameObjectCPRepoDp.bs.js");
var GlobalTempCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/GlobalTempCPRepoDp.bs.js");
var PictureCPDoService$Wonderjs = require("../domain_layer/domain/picture/picture/service/PictureCPDoService.bs.js");
var PipelineCPDoService$Wonderjs = require("../domain_layer/domain/pipeline/pipeline/service/PipelineCPDoService.bs.js");
var TimeJobRepoDpRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/dependency/TimeJobRepoDpRunAPI.bs.js");
var BSDFMaterialCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/BSDFMaterialCPRepoDp.bs.js");
var CreatePOGeometryCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/geometry/CreatePOGeometryCPRepo.bs.js");
var DirectionLightCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/DirectionLightCPRepoDp.bs.js");
var BasicCameraViewCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/BasicCameraViewCPRepoDp.bs.js");
var CreatePOTransformCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/transform/CreatePOTransformCPRepo.bs.js");
var CreatePOBSDFMaterialCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/bsdf_material/CreatePOBSDFMaterialCPRepo.bs.js");
var CreatePODirectionLightCPRepo$Wonderjs = require("../domain_layer/repo/scene/component/direction_light/CreatePODirectionLightCPRepo.bs.js");
var PerspectiveCameraProjectionCPRepoDp$Wonderjs = require("../infrastructure_layer/dependency/repo/scene/component/PerspectiveCameraProjectionCPRepoDp.bs.js");

function _createAndSetAllComponentPOs(param) {
  return Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.mapSuccess(CreatePOTransformCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setTransform), (function (param) {
                        return Result$Wonderjs.mapSuccess(CreatePOBSDFMaterialCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setBSDFMaterial);
                      })), (function (param) {
                    return Result$Wonderjs.mapSuccess(CreatePOGeometryCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setGeometry);
                  })), (function (param) {
                return Result$Wonderjs.mapSuccess(CreatePODirectionLightCPRepo$Wonderjs.createPO(undefined), CPRepo$Wonderjs.setDirectionLight);
              }));
}

function _setAllBufferCount(transformCount, geometryPointCount, geometryCount, bsdfMaterialCount, directionLightCount) {
  return POConfigDpRunAPI$Wonderjs.set({
              getTransformCount: (function (param) {
                  return transformCount;
                }),
              getBSDFMaterialCount: (function (param) {
                  return bsdfMaterialCount;
                }),
              getGeometryPointCount: (function (param) {
                  return geometryPointCount;
                }),
              getGeometryCount: (function (param) {
                  return geometryCount;
                }),
              getDirectionLightCount: (function (param) {
                  return directionLightCount;
                })
            });
}

function _injectDependencies(transformCount, geometryPointCount, geometryCount, bsdfMaterialCount, directionLightCount) {
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
          addBSDFMaterial: GameObjectCPRepoDp$Wonderjs.addBSDFMaterial,
          getBSDFMaterial: GameObjectCPRepoDp$Wonderjs.getBSDFMaterial,
          hasBSDFMaterial: GameObjectCPRepoDp$Wonderjs.hasBSDFMaterial,
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
          getAllGameObjectBSDFMaterials: GameObjectCPRepoDp$Wonderjs.getAllGameObjectBSDFMaterials
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
        bsdfMaterialRepo: {
          getMaxIndex: BSDFMaterialCPRepoDp$Wonderjs.getMaxIndex,
          setMaxIndex: BSDFMaterialCPRepoDp$Wonderjs.setMaxIndex,
          getGameObjects: BSDFMaterialCPRepoDp$Wonderjs.getGameObjects,
          addGameObject: BSDFMaterialCPRepoDp$Wonderjs.addGameObject,
          getDiffuseColor: BSDFMaterialCPRepoDp$Wonderjs.getDiffuseColor,
          setDiffuseColor: BSDFMaterialCPRepoDp$Wonderjs.setDiffuseColor,
          getSpecular: BSDFMaterialCPRepoDp$Wonderjs.getSpecular,
          setSpecular: BSDFMaterialCPRepoDp$Wonderjs.setSpecular,
          getSpecularColor: BSDFMaterialCPRepoDp$Wonderjs.getSpecularColor,
          setSpecularColor: BSDFMaterialCPRepoDp$Wonderjs.setSpecularColor,
          getRoughness: BSDFMaterialCPRepoDp$Wonderjs.getRoughness,
          setRoughness: BSDFMaterialCPRepoDp$Wonderjs.setRoughness,
          getMetalness: BSDFMaterialCPRepoDp$Wonderjs.getMetalness,
          setMetalness: BSDFMaterialCPRepoDp$Wonderjs.setMetalness,
          getTransmission: BSDFMaterialCPRepoDp$Wonderjs.getTransmission,
          setTransmission: BSDFMaterialCPRepoDp$Wonderjs.setTransmission,
          getIOR: BSDFMaterialCPRepoDp$Wonderjs.getIOR,
          setIOR: BSDFMaterialCPRepoDp$Wonderjs.setIOR,
          getDiffuseMapImageId: BSDFMaterialCPRepoDp$Wonderjs.getDiffuseMapImageId,
          setDiffuseMapImageId: BSDFMaterialCPRepoDp$Wonderjs.setDiffuseMapImageId,
          getChannelRoughnessMetallicMapImageId: BSDFMaterialCPRepoDp$Wonderjs.getChannelRoughnessMetallicMapImageId,
          setChannelRoughnessMetallicMapImageId: BSDFMaterialCPRepoDp$Wonderjs.setChannelRoughnessMetallicMapImageId,
          getEmissionMapImageId: BSDFMaterialCPRepoDp$Wonderjs.getEmissionMapImageId,
          setEmissionMapImageId: BSDFMaterialCPRepoDp$Wonderjs.setEmissionMapImageId,
          getNormalMapImageId: BSDFMaterialCPRepoDp$Wonderjs.getNormalMapImageId,
          setNormalMapImageId: BSDFMaterialCPRepoDp$Wonderjs.setNormalMapImageId,
          getTransmissionMapImageId: BSDFMaterialCPRepoDp$Wonderjs.getTransmissionMapImageId,
          setTransmissionMapImageId: BSDFMaterialCPRepoDp$Wonderjs.setTransmissionMapImageId,
          getSpecularMapImageId: BSDFMaterialCPRepoDp$Wonderjs.getSpecularMapImageId,
          setSpecularMapImageId: BSDFMaterialCPRepoDp$Wonderjs.setSpecularMapImageId
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
        imageRepo: {
          getData: ImageCPRepoDp$Wonderjs.getData,
          setData: ImageCPRepoDp$Wonderjs.setData
        }
      });
  TimeJobRepoDpRunAPI$Wonderjs.set({
        getElapsed: TimeCPRepoDp$Wonderjs.getElapsed,
        start: TimeCPRepoDp$Wonderjs.start
      });
  return _setAllBufferCount(transformCount, geometryPointCount, geometryCount, bsdfMaterialCount, directionLightCount);
}

function prepare(pictureSize, sampleCount, transformCount, geometryPointCount, geometryCount, bsdfMaterialCount, directionLightCount) {
  _injectDependencies(transformCount, geometryPointCount, geometryCount, bsdfMaterialCount, directionLightCount);
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
exports._setAllBufferCount = _setAllBufferCount;
exports._injectDependencies = _injectDependencies;
exports.prepare = prepare;
exports._parseAndSetPipelineStream = _parseAndSetPipelineStream;
exports.init = init;
exports.update = update;
exports.render = render;
/* CPRepo-Wonderjs Not a pure module */
