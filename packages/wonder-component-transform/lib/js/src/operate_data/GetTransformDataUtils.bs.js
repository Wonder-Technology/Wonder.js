'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Tuple2$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/tuple/Tuple2.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$WonderComponentTypeTransform = require("wonder-component-type-transform/lib/js/index.bs.js");
var DirtyTransformUtils$WonderComponentTransform = require("./DirtyTransformUtils.bs.js");
var UpdateTransformUtils$WonderComponentTransform = require("./UpdateTransformUtils.bs.js");
var HierachyTransformUtils$WonderComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$WonderComponentTransform = require("./ModelMatrixTransformUtils.bs.js");
var ModelMatrixTransformUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");

function getData(state, param, param$1) {
  var localToWorldMatrices = state.localToWorldMatrices;
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  var childrenMap = state.childrenMap;
  var parentMap = state.parentMap;
  if (param$1 === Index$WonderComponentTypeTransform.dataName.parent) {
    return HierachyTransformUtils$WonderComponentTransform.getNullableParent(parentMap, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.children) {
    return HierachyTransformUtils$WonderComponentTransform.getNullableChildren(childrenMap, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.localPosition) {
    return ModelMatrixTransformUtils$WonderComponentTransform.getLocalPosition(localPositions, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.localRotation) {
    return ModelMatrixTransformUtils$WonderComponentTransform.getLocalRotation(localRotations, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.localScale) {
    return ModelMatrixTransformUtils$WonderComponentTransform.getLocalScale(localScales, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.position) {
    return Tuple2$WonderCommonlib.getLast(UpdateTransformUtils$WonderComponentTransform.updateAndGetPosition(state, param));
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.rotation) {
    return Tuple2$WonderCommonlib.getLast(UpdateTransformUtils$WonderComponentTransform.updateAndGetRotation(state, param));
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.scale) {
    return Tuple2$WonderCommonlib.getLast(UpdateTransformUtils$WonderComponentTransform.updateAndGetScale(state, param));
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.localEulerAngles) {
    return ModelMatrixTransformUtils$WonderComponentTransform.getLocalEulerAngles(localRotations, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.eulerAngles) {
    return Tuple2$WonderCommonlib.getLast(UpdateTransformUtils$WonderComponentTransform.updateAndGetEulerAngles(state, param));
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.normalMatrix) {
    return ModelMatrixTransformUtils$WonderComponentTransform.getNormalMatrix(state, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.localToWorldMatrix) {
    return ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, param);
  } else if (param$1 === Index$WonderComponentTypeTransform.dataName.dirty) {
    return DirtyTransformUtils$WonderComponentTransform.isDirty(state, param);
  } else {
    return Exception$WonderCommonlib.throwErr(Log$WonderCommonlib.buildFatalMessage("getData", "unknown dataName:" + param$1, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
