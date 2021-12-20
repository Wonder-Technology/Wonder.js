'use strict';

var Log$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/log/Log.bs.js");
var Exception$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$OrillusionComponentTypeDirectionlightWorker = require("orillusion-component-type-directionlight-worker/lib/js/index.bs.js");
var OperateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js");

function getData(state, light, dataName) {
  if (dataName === Index$OrillusionComponentTypeDirectionlightWorker.dataName.color) {
    return OperateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils.getColor(light, state.colors);
  } else if (dataName === Index$OrillusionComponentTypeDirectionlightWorker.dataName.intensity) {
    return OperateTypeArrayDirectionLightUtils$OrillusionComponentWorkerUtils.getIntensity(light, state.intensities);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
