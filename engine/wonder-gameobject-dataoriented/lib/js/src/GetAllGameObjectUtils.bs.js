'use strict';

var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");

function getAll(state) {
  return ArraySt$WonderCommonlib.range(0, state.maxUID - 1 | 0);
}

exports.getAll = getAll;
/* No side effect */
