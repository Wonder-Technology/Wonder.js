'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypePerspectivecameraprojection = require("wonder-component-type-perspectivecameraprojection/lib/js/index.bs.js");
var DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function getData(state, cameraProjection, dataName) {
  if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.pMatrix) {
    return OptionSt$WonderCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.getPMatrix(state, cameraProjection));
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.fovy) {
    return OptionSt$WonderCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.getFovy(state, cameraProjection));
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.aspect) {
    return OptionSt$WonderCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.getAspect(state, cameraProjection));
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.far) {
    return OptionSt$WonderCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.getFar(state, cameraProjection));
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.near) {
    return OptionSt$WonderCommonlib.toNullable(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.getNear(state, cameraProjection));
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.dirty) {
    return OptionSt$WonderCommonlib.toNullable(DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.isDirty(state, cameraProjection));
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
