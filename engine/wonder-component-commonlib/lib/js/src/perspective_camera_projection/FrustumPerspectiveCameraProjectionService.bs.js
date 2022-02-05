'use strict';

var NumberUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/NumberUtils.bs.js");

function computeAspect(param) {
  return NumberUtils$WonderCommonlib.dividInt(param[0], param[1]);
}

exports.computeAspect = computeAspect;
/* No side effect */
