'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../library/log/Log.bs.js");
var FarVO$Wonderjs = require("../../value_object/FarVO.bs.js");
var FovyVO$Wonderjs = require("../../value_object/FovyVO.bs.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var NearVO$Wonderjs = require("../../value_object/NearVO.bs.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Matrix4$Wonderjs = require("../../../../../library/structure/matrix/Matrix4.bs.js");
var AspectVO$Wonderjs = require("../../value_object/AspectVO.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var PictureCPDoService$Wonderjs = require("../../../../../../../run/cloud_picture/domain_layer/domain/picture/picture/service/PictureCPDoService.bs.js");
var ProjectionMatrixVO$Wonderjs = require("../../value_object/ProjectionMatrixVO.bs.js");
var DirtyPerspectiveCameraProjectionDoService$Wonderjs = require("./DirtyPerspectiveCameraProjectionDoService.bs.js");
var FrustumPerspectiveCameraProjectionDoService$Wonderjs = require("./FrustumPerspectiveCameraProjectionDoService.bs.js");
var PMatrixPerspectiveCameraProjectionDoService$Wonderjs = require("./PMatrixPerspectiveCameraProjectionDoService.bs.js");

function updateCameraProjection(cameraProjection) {
  var aspect = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getAspect(cameraProjection);
  return Result$Wonderjs.bind(aspect !== undefined ? Result$Wonderjs.succeed(aspect) : Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(PictureCPDoService$Wonderjs.getSize(undefined)), FrustumPerspectiveCameraProjectionDoService$Wonderjs.computeAspect), (function (aspect) {
                var match = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getFovy(cameraProjection);
                var match$1 = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getNear(cameraProjection);
                var match$2 = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getFar(cameraProjection);
                if (match !== undefined && match$1 !== undefined && match$2 !== undefined) {
                  return Result$Wonderjs.mapSuccess(Matrix4$Wonderjs.buildPerspective(Matrix4$Wonderjs.createIdentityMatrix4(undefined), [
                                  FovyVO$Wonderjs.value(match),
                                  AspectVO$Wonderjs.value(aspect),
                                  NearVO$Wonderjs.value(match$1),
                                  FarVO$Wonderjs.value(match$2)
                                ]), (function (pMatrix) {
                                return PMatrixPerspectiveCameraProjectionDoService$Wonderjs.setPMatrix(cameraProjection, ProjectionMatrixVO$Wonderjs.create(pMatrix));
                              }));
                }
                return Result$Wonderjs.failWith(Log$Wonderjs.buildFatalMessage("update", "fovy,near,far should all exist", "", "", "cameraProjection: " + cameraProjection));
              }));
}

function update(param) {
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseResultM(DirtyPerspectiveCameraProjectionDoService$Wonderjs.getUniqueDirtyList(undefined), updateCameraProjection), (function (param) {
                Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).clearDirtyList, undefined);
                
              }));
}

exports.updateCameraProjection = updateCameraProjection;
exports.update = update;
/* PictureCPDoService-Wonderjs Not a pure module */
