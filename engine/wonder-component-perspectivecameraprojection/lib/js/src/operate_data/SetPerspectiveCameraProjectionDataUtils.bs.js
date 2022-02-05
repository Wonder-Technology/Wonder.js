'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypePerspectivecameraprojection = require("wonder-component-type-perspectivecameraprojection/lib/js/index.bs.js");
var DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function setData(state, cameraProjection, dataName, dataValue) {
  if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.pMatrix) {
    return DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setPMatrix(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.fovy) {
    return DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setFovy(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.aspect) {
    return DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setAspect(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.far) {
    return DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setFar(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.near) {
    return DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setNear(state, cameraProjection, dataValue), cameraProjection, true);
  } else if (dataName === Index$WonderComponentTypePerspectivecameraprojection.dataName.dirty) {
    return DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(state, cameraProjection, dataValue);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.setData = setData;
/* No side effect */
