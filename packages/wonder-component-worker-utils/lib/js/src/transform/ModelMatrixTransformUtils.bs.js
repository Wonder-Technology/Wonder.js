'use strict';

var OperateTypeArrayTransformUtils$WonderComponentWorkerUtils = require("./OperateTypeArrayTransformUtils.bs.js");

function getLocalToWorldMatrix(localToWorldMatrices, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
}

exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
/* No side effect */
