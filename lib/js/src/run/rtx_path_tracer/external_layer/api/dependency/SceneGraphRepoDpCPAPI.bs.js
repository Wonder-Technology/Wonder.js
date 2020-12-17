'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var OptionSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var SceneGraphRepoDpRunAPI$Wonderjs = require("../../../../../construct/external_layer/api/dependency/SceneGraphRepoDpRunAPI.bs.js");

function set(param) {
  var geometryRepo = param.geometryRepo;
  var getIndices = geometryRepo.getIndices;
  var getTangents = geometryRepo.getTangents;
  var getTexCoords = geometryRepo.getTexCoords;
  var getNormals = geometryRepo.getNormals;
  var bsdfMaterialRepo = param.bsdfMaterialRepo;
  var getSpecularMapImageWrapData = bsdfMaterialRepo.getSpecularMapImageWrapData;
  var getTransmissionMapImageWrapData = bsdfMaterialRepo.getTransmissionMapImageWrapData;
  var getNormalMapImageWrapData = bsdfMaterialRepo.getNormalMapImageWrapData;
  var getEmissionMapImageWrapData = bsdfMaterialRepo.getEmissionMapImageWrapData;
  var getChannelRoughnessMetallicMapImageWrapData = bsdfMaterialRepo.getChannelRoughnessMetallicMapImageWrapData;
  var getDiffuseMapImageWrapData = bsdfMaterialRepo.getDiffuseMapImageWrapData;
  var getSpecularMapImageId = bsdfMaterialRepo.getSpecularMapImageId;
  var getTransmissionMapImageId = bsdfMaterialRepo.getTransmissionMapImageId;
  var getNormalMapImageId = bsdfMaterialRepo.getNormalMapImageId;
  var getEmissionMapImageId = bsdfMaterialRepo.getEmissionMapImageId;
  var getChannelRoughnessMetallicMapImageId = bsdfMaterialRepo.getChannelRoughnessMetallicMapImageId;
  var getDiffuseMapImageId = bsdfMaterialRepo.getDiffuseMapImageId;
  var basicCameraViewRepo = param.basicCameraViewRepo;
  var getActiveBasicCameraView = basicCameraViewRepo.getActiveBasicCameraView;
  var directionLightRepo = param.directionLightRepo;
  var getAllLights = directionLightRepo.getAllLights;
  var gameObjectRepo = param.gameObjectRepo;
  var getAllGameObjectBSDFMaterials = gameObjectRepo.getAllGameObjectBSDFMaterials;
  var getAllGameObjectGeometries = gameObjectRepo.getAllGameObjectGeometries;
  var getAllGeometryGameObjects = gameObjectRepo.getAllGeometryGameObjects;
  var getGeometry = gameObjectRepo.getGeometry;
  var getBSDFMaterial = gameObjectRepo.getBSDFMaterial;
  var getPerspectiveCameraProjection = gameObjectRepo.getPerspectiveCameraProjection;
  var getBasicCameraView = gameObjectRepo.getBasicCameraView;
  var getDirectionLight = gameObjectRepo.getDirectionLight;
  var getTransform = gameObjectRepo.getTransform;
  return SceneGraphRepoDpRunAPI$Wonderjs.set({
              sceneRepo: param.sceneRepo,
              transformRepo: param.transformRepo,
              directionLightRepo: {
                getColor: directionLightRepo.getColor,
                getIntensity: directionLightRepo.getIntensity,
                getDirection: directionLightRepo.getDirection,
                getAllLights: (function (sceneGameObject) {
                    return ListSt$Wonderjs.fromArray(Curry._1(getAllLights, sceneGameObject));
                  })
              },
              basicCameraViewRepo: {
                getGameObject: basicCameraViewRepo.getGameObject,
                getViewWorldToCameraMatrix: basicCameraViewRepo.getViewWorldToCameraMatrix,
                getActiveBasicCameraView: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getActiveBasicCameraView, gameObject));
                  })
              },
              perspectiveCameraProjectionRepo: param.perspectiveCameraProjectionRepo,
              bsdfMaterialRepo: {
                getDiffuseColor: bsdfMaterialRepo.getDiffuseColor,
                getEmissionColor: bsdfMaterialRepo.getEmissionColor,
                getSpecular: bsdfMaterialRepo.getSpecular,
                getSpecularColor: bsdfMaterialRepo.getSpecularColor,
                getRoughness: bsdfMaterialRepo.getRoughness,
                getMetalness: bsdfMaterialRepo.getMetalness,
                getTransmission: bsdfMaterialRepo.getTransmission,
                getIOR: bsdfMaterialRepo.getIOR,
                getDiffuseMapImageId: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getDiffuseMapImageId, bsdfMaterial));
                  }),
                getChannelRoughnessMetallicMapImageId: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getChannelRoughnessMetallicMapImageId, bsdfMaterial));
                  }),
                getEmissionMapImageId: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getEmissionMapImageId, bsdfMaterial));
                  }),
                getNormalMapImageId: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getNormalMapImageId, bsdfMaterial));
                  }),
                getTransmissionMapImageId: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getTransmissionMapImageId, bsdfMaterial));
                  }),
                getSpecularMapImageId: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getSpecularMapImageId, bsdfMaterial));
                  }),
                getAlphaCutoff: bsdfMaterialRepo.getAlphaCutoff,
                isSame: bsdfMaterialRepo.isSame,
                getId: bsdfMaterialRepo.getId,
                getDiffuseMapImageWrapData: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getDiffuseMapImageWrapData, bsdfMaterial));
                  }),
                getChannelRoughnessMetallicMapImageWrapData: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getChannelRoughnessMetallicMapImageWrapData, bsdfMaterial));
                  }),
                getEmissionMapImageWrapData: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getEmissionMapImageWrapData, bsdfMaterial));
                  }),
                getNormalMapImageWrapData: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getNormalMapImageWrapData, bsdfMaterial));
                  }),
                getTransmissionMapImageWrapData: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getTransmissionMapImageWrapData, bsdfMaterial));
                  }),
                getSpecularMapImageWrapData: (function (bsdfMaterial) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getSpecularMapImageWrapData, bsdfMaterial));
                  }),
                isDoubleSide: bsdfMaterialRepo.isDoubleSide
              },
              geometryRepo: {
                getVertices: geometryRepo.getVertices,
                getNormals: (function (geometry) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getNormals, geometry));
                  }),
                getTexCoords: (function (geometry) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getTexCoords, geometry));
                  }),
                getTangents: (function (geometry) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getTangents, geometry));
                  }),
                getIndices: (function (geometry) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getIndices, geometry));
                  }),
                isFlipTexCoordY: geometryRepo.isFlipTexCoordY,
                isSame: geometryRepo.isSame,
                getId: geometryRepo.getId
              },
              gameObjectRepo: {
                getTransform: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getTransform, gameObject));
                  }),
                getBSDFMaterial: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getBSDFMaterial, gameObject));
                  }),
                getGeometry: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getGeometry, gameObject));
                  }),
                getDirectionLight: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getDirectionLight, gameObject));
                  }),
                getBasicCameraView: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getBasicCameraView, gameObject));
                  }),
                getPerspectiveCameraProjection: (function (gameObject) {
                    return OptionSt$Wonderjs.fromNullable(Curry._1(getPerspectiveCameraProjection, gameObject));
                  }),
                getAllGeometryGameObjects: (function (sceneGameObject) {
                    return ListSt$Wonderjs.fromArray(Curry._1(getAllGeometryGameObjects, sceneGameObject));
                  }),
                getAllGameObjectGeometries: (function (sceneGameObject) {
                    return ListSt$Wonderjs.fromArray(Curry._1(getAllGameObjectGeometries, sceneGameObject));
                  }),
                getAllGameObjectBSDFMaterials: (function (sceneGameObject) {
                    return ListSt$Wonderjs.fromArray(Curry._1(getAllGameObjectBSDFMaterials, sceneGameObject));
                  })
              }
            });
}

exports.set = set;
/* No side effect */
