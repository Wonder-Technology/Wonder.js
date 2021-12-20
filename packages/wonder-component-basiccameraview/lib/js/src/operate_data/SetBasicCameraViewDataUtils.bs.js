'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeBasiccameraview = require("wonder-component-type-basiccameraview/lib/js/index.bs.js");
var OperateBasicCameraViewUtils$WonderComponentBasiccameraview = require("../utils/OperateBasicCameraViewUtils.bs.js");

function setData(state, cameraView, dataName, dataValue) {
  if (dataName === Index$WonderComponentTypeBasiccameraview.dataName.active) {
    return OperateBasicCameraViewUtils$WonderComponentBasiccameraview.setIsActive(state, cameraView, dataValue);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.setData = setData;
/* No side effect */
