'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeTransform = require("wonder-component-type-transform/lib/js/index.bs.js");
var UpdateTransformUtils$WonderComponentTransform = require("./UpdateTransformUtils.bs.js");
var HierachyTransformUtils$WonderComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$WonderComponentTransform = require("./ModelMatrixTransformUtils.bs.js");

function setData(state, transform, dataName, dataValue) {
  if (dataName !== Index$WonderComponentTypeTransform.dataName.parent) {
    if (dataName === Index$WonderComponentTypeTransform.dataName.localPosition) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalPosition(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.localRotation) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalRotation(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.localScale) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalScale(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.localEulerAngles) {
      return ModelMatrixTransformUtils$WonderComponentTransform.setLocalEulerAngles(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.position) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetPosition(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.rotation) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetRotation(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.scale) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetScale(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.eulerAngles) {
      return UpdateTransformUtils$WonderComponentTransform.updateAndSetEulerAngles(state, transform, dataValue);
    } else if (dataName === Index$WonderComponentTypeTransform.dataName.update) {
      return UpdateTransformUtils$WonderComponentTransform.mutableUpdate(state, transform);
    } else {
      return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("setData", "unknown dataName:" + dataName, "", "", ""));
    }
  }
  var parent = OptionSt$WonderCommonlib.fromNullable(dataValue);
  if (parent !== undefined) {
    return HierachyTransformUtils$WonderComponentTransform.setParent(state, parent, transform);
  } else {
    return HierachyTransformUtils$WonderComponentTransform.removeParent(state, transform);
  }
}

exports.setData = setData;
/* No side effect */
