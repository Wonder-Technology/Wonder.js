

import * as Caml_option from "../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Main$WonderCore from "../../../../../node_modules/wonder-core/lib/es6_global/src/Main.bs.js";
import * as Log$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Matrix4$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypePerspectivecameraprojection from "../../../../../node_modules/wonder-component-type-perspectivecameraprojection/lib/es6_global/index.bs.js";
import * as FrustumPerspectiveCameraProjectionService$WonderComponentCommonlib from "./perspective_camera_projection/FrustumPerspectiveCameraProjectionService.bs.js";

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

export {
  _getAspect ,
  _getNear ,
  _getFar ,
  _getFovy ,
  _setPMatrix ,
  updatePerspectiveCameraProjection ,
  
}
/* Main-WonderCore Not a pure module */
