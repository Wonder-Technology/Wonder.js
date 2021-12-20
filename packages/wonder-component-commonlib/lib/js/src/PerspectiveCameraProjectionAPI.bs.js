'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var Main$WonderCore = require("wonder-core/lib/js/src/Main.bs.js");
var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Matrix4$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix4.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypePerspectivecameraprojection = require("wonder-component-type-perspectivecameraprojection/lib/js/index.bs.js");
var FrustumPerspectiveCameraProjectionService$WonderComponentCommonlib = require("./perspective_camera_projection/FrustumPerspectiveCameraProjectionService.bs.js");

function _getAspect(data, cameraProjection) {
  return OptionSt$WonderCommonlib.fromNullable(Main$WonderCore.getComponentData(data, cameraProjection, Index$WonderComponentTypePerspectivecameraprojection.dataName.aspect));
}

function _getNear(data, cameraProjection) {
  return OptionSt$WonderCommonlib.fromNullable(Main$WonderCore.getComponentData(data, cameraProjection, Index$WonderComponentTypePerspectivecameraprojection.dataName.near));
}

function _getFar(data, cameraProjection) {
  return OptionSt$WonderCommonlib.fromNullable(Main$WonderCore.getComponentData(data, cameraProjection, Index$WonderComponentTypePerspectivecameraprojection.dataName.far));
}

function _getFovy(data, cameraProjection) {
  return OptionSt$WonderCommonlib.fromNullable(Main$WonderCore.getComponentData(data, cameraProjection, Index$WonderComponentTypePerspectivecameraprojection.dataName.fovy));
}

function _setPMatrix(data, cameraProjection, pMatrix) {
  return Main$WonderCore.setComponentData(data, cameraProjection, Index$WonderComponentTypePerspectivecameraprojection.dataName.pMatrix, pMatrix);
}

function updatePerspectiveCameraProjection(data, isDebug, cameraProjection, canvasSize) {
  var aspect = OptionSt$WonderCommonlib.getWithDefault(_getAspect(data, cameraProjection), FrustumPerspectiveCameraProjectionService$WonderComponentCommonlib.computeAspect(canvasSize));
  var match = _getFovy(data, cameraProjection);
  var match$1 = _getNear(data, cameraProjection);
  var match$2 = _getFar(data, cameraProjection);
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined) {
    return _setPMatrix(data, cameraProjection, Matrix4$WonderCommonlib.buildPerspective(Matrix4$WonderCommonlib.createIdentityMatrix4(undefined), isDebug, [
                    Caml_option.valFromOption(match),
                    aspect,
                    Caml_option.valFromOption(match$1),
                    Caml_option.valFromOption(match$2)
                  ]));
  }
  return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("update", "fovy,near,far should all exist", "", "", "cameraProjection: " + cameraProjection));
}

exports._getAspect = _getAspect;
exports._getNear = _getNear;
exports._getFar = _getFar;
exports._getFovy = _getFovy;
exports._setPMatrix = _setPMatrix;
exports.updatePerspectiveCameraProjection = updatePerspectiveCameraProjection;
/* Main-WonderCore Not a pure module */
