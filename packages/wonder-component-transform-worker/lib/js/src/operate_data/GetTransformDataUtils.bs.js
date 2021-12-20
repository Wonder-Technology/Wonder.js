'use strict';

var Log$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/log/Log.bs.js");
var Exception$OrillusionCommonlib = require("orillusion-commonlib/lib/js/src/structure/Exception.bs.js");
var Index$OrillusionComponentTypeTransformWorker = require("orillusion-component-type-transform-worker/lib/js/index.bs.js");
var ModelMatrixTransformUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");

function getData(state, transform, dataName) {
  if (dataName === Index$OrillusionComponentTypeTransformWorker.dataName.localToWorldMatrix) {
    return ModelMatrixTransformUtils$OrillusionComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

exports.getData = getData;
/* No side effect */
