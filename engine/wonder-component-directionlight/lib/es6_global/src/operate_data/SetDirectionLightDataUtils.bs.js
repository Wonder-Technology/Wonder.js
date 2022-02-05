

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$WonderComponentTypeDirectionlight from "../../../../../../node_modules/wonder-component-type-directionlight/lib/es6_global/index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight from "../utils/OperateTypeArrayDirectionLightUtils.bs.js";

function setData(state, param, param$1, param$2) {
  var colors = state.colors;
  var intensities = state.intensities;
  if (param$1 === Index$WonderComponentTypeDirectionlight.dataName.color) {
    OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight.setColor(param, param$2, colors);
  } else if (param$1 === Index$WonderComponentTypeDirectionlight.dataName.intensity) {
    OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight.setIntensity(param, param$2, intensities);
  } else {
    Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + param$1, "", "", ""));
  }
  return state;
}

export {
  setData ,
  
}
/* No side effect */
