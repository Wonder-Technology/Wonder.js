

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypePerspectivecameraprojection from "../../../../../../node_modules/wonder-component-type-perspectivecameraprojection/lib/es6_global/index.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

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

export {
  setData ,
  
}
/* No side effect */
