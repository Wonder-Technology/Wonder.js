'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeDirectionlight = require("wonder-component-type-directionlight/lib/js/index.bs.js");
var OperateTypeArrayDirectionLightUtils$WonderComponentDirectionlight = require("../utils/OperateTypeArrayDirectionLightUtils.bs.js");

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

exports.setData = setData;
/* No side effect */
