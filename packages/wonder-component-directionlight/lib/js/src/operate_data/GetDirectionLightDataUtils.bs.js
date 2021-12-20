'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeDirectionlight = require("wonder-component-type-directionlight/lib/js/index.bs.js");
var OperateTypeArrayDirectionLightUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/directionlight/OperateTypeArrayDirectionLightUtils.bs.js");

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

exports.getData = getData;
/* No side effect */
