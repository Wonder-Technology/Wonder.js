'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var GeometryEntity$Wonderjs = require("../../entity/GeometryEntity.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var PBRMaterialEntity$Wonderjs = require("../../entity/PBRMaterialEntity.bs.js");
var AddGeometryDoService$Wonderjs = require("../geometry/AddGeometryDoService.bs.js");
var DirectionLightEntity$Wonderjs = require("../../entity/DirectionLightEntity.bs.js");
var AddTransformDoService$Wonderjs = require("../transform/AddTransformDoService.bs.js");
var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");
var AddPBRMaterialDoService$Wonderjs = require("../pbr_material/AddPBRMaterialDoService.bs.js");
var AddDirectionLightDoService$Wonderjs = require("../direction_light/AddDirectionLightDoService.bs.js");
var AddBasicCameraViewDoService$Wonderjs = require("../basic_camera_view/AddBasicCameraViewDoService.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");
var AddPerspectiveCameraProjectionDoService$Wonderjs = require("../perspective_camera_projection/AddPerspectiveCameraProjectionDoService.bs.js");

function _check(hasComponentFunc, gameObject) {
  return Contract$Wonderjs.requireCheck((function (param) {
                return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("this type of the component shouldn\'t be added before", "not"), (function (param) {
                              return Contract$Wonderjs.assertFalse(Curry._1(hasComponentFunc, gameObject));
                            }));
              }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined));
}

function _addComponent(param, param$1) {
  var component = param$1[1];
  var gameObject = param$1[0];
  var handleAddComponentFunc = param[2];
  var addComponentFunc = param[1];
  return Result$Wonderjs.mapSuccess(_check(param[0], gameObject), (function (param) {
                Curry._2(addComponentFunc, gameObject, component);
                handleAddComponentFunc(component, gameObject);
                return GameObjectEntity$Wonderjs.create(gameObject);
              }));
}

function addTransform(gameObject, transform) {
  return _addComponent([
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasTransform,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addTransform,
              AddTransformDoService$Wonderjs.handleAddComponent
            ], [
              GameObjectEntity$Wonderjs.value(gameObject),
              TransformEntity$Wonderjs.value(transform)
            ]);
}

function addPBRMaterial(gameObject, material) {
  return _addComponent([
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasPBRMaterial,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addPBRMaterial,
              AddPBRMaterialDoService$Wonderjs.handleAddComponent
            ], [
              GameObjectEntity$Wonderjs.value(gameObject),
              PBRMaterialEntity$Wonderjs.value(material)
            ]);
}

function addGeometry(gameObject, geometry) {
  return _addComponent([
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasGeometry,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addGeometry,
              AddGeometryDoService$Wonderjs.handleAddComponent
            ], [
              GameObjectEntity$Wonderjs.value(gameObject),
              GeometryEntity$Wonderjs.value(geometry)
            ]);
}

function addDirectionLight(gameObject, light) {
  return _addComponent([
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasDirectionLight,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addDirectionLight,
              AddDirectionLightDoService$Wonderjs.handleAddComponent
            ], [
              GameObjectEntity$Wonderjs.value(gameObject),
              DirectionLightEntity$Wonderjs.value(light)
            ]);
}

function addBasicCameraView(gameObject, cameraView) {
  return _addComponent([
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasBasicCameraView,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addBasicCameraView,
              AddBasicCameraViewDoService$Wonderjs.handleAddComponent
            ], [
              GameObjectEntity$Wonderjs.value(gameObject),
              BasicCameraViewEntity$Wonderjs.value(cameraView)
            ]);
}

function addPerspectiveCameraProjection(gameObject, cameraProjection) {
  return _addComponent([
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasPerspectiveCameraProjection,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addPerspectiveCameraProjection,
              AddPerspectiveCameraProjectionDoService$Wonderjs.handleAddComponent
            ], [
              GameObjectEntity$Wonderjs.value(gameObject),
              PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)
            ]);
}

exports._check = _check;
exports._addComponent = _addComponent;
exports.addTransform = addTransform;
exports.addPBRMaterial = addPBRMaterial;
exports.addGeometry = addGeometry;
exports.addDirectionLight = addDirectionLight;
exports.addBasicCameraView = addBasicCameraView;
exports.addPerspectiveCameraProjection = addPerspectiveCameraProjection;
/* No side effect */
