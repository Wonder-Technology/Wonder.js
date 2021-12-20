'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var BufferTransformUtils$WonderComponentWorkerUtils = require("./BufferTransformUtils.bs.js");

function getLocalToWorldMatrixTypeArray(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat16TypeArray(BufferTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrixIndex(index), typeArr);
}

exports.getLocalToWorldMatrixTypeArray = getLocalToWorldMatrixTypeArray;
/* No side effect */
