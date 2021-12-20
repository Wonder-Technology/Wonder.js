

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeDirectionlight from "../../../../../../node_modules/wonder-component-type-directionlight/lib/es6_global/index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js";

function getData(state, param, param$1) {
  var colors = state.colors;
  var intensities = state.intensities;
  if (param$1 === Index$WonderComponentTypeDirectionlight.dataName.color) {
    return OperateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils.getColor(param, colors);
  } else if (param$1 === Index$WonderComponentTypeDirectionlight.dataName.intensity) {
    return OperateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils.getIntensity(param, intensities);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
