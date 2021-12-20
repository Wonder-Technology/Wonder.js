

import * as Log$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$OrillusionComponentTypeDirectionlightWorker from "../../../../../../node_modules/orillusion-component-type-directionlight-worker/lib/es6_global/index.bs.js";
import * as OperateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js";

function getData(state, light, dataName) {
  if (dataName === Index$OrillusionComponentTypeDirectionlightWorker.dataName.color) {
    return OperateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils.getColor(light, state.colors);
  } else if (dataName === Index$OrillusionComponentTypeDirectionlightWorker.dataName.intensity) {
    return OperateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils.getIntensity(light, state.intensities);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
