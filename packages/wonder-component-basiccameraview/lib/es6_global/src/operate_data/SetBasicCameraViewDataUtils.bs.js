

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeBasiccameraview from "../../../../../../node_modules/wonder-component-type-basiccameraview/lib/es6_global/index.bs.js";
import * as OperateBasicCameraViewUtils$WonderComponentBasiccameraview from "../utils/OperateBasicCameraViewUtils.bs.js";

function setData(state, cameraView, dataName, dataValue) {
  if (dataName === Index$WonderComponentTypeBasiccameraview.dataName.active) {
    return OperateBasicCameraViewUtils$WonderComponentBasiccameraview.setIsActive(state, cameraView, dataValue);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  setData ,
  
}
/* No side effect */
