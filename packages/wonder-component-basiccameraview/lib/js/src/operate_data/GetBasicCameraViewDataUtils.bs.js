'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeBasiccameraview = require("wonder-component-type-basiccameraview/lib/js/index.bs.js");
var OperateBasicCameraViewUtils$WonderComponentBasiccameraview = require("../utils/OperateBasicCameraViewUtils.bs.js");

function getData(state, cameraView, dataName) {
  if (dataName === Index$WonderComponentTypeBasiccameraview.dataName.active) {
    return OperateBasicCameraViewUtils$WonderComponentBasiccameraview.getIsActive(state, cameraView);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
