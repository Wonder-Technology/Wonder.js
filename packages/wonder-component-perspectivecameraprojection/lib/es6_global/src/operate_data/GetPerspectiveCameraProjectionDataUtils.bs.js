

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypePerspectivecameraprojection from "../../../../../../node_modules/wonder-component-type-perspectivecameraprojection/lib/es6_global/index.bs.js";
import * as DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "../utils/DirtyPerspectiveCameraProjectionUtils.bs.js";
import * as OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection from "../utils/OperatePerspectiveCameraProjectionUtils.bs.js";

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

export {
  getData ,
  
}
/* No side effect */
