

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeBasiccameraview from "../../../../../../node_modules/wonder-component-type-basiccameraview/lib/es6_global/index.bs.js";
import * as OperateBasicCameraViewUtils$WonderComponentBasiccameraview from "../utils/OperateBasicCameraViewUtils.bs.js";

function getData(state, cameraView, dataName) {
  if (dataName === Index$WonderComponentTypeBasiccameraview.dataName.active) {
    return OperateBasicCameraViewUtils$WonderComponentBasiccameraview.getIsActive(state, cameraView);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
