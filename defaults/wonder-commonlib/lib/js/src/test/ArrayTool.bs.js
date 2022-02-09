'use strict';

var FloatTool$WonderCommonlib = require("./FloatTool.bs.js");

function truncate(arr) {
  return arr.map(function (__x) {
              return FloatTool$WonderCommonlib.truncateFloatValue(__x, 5);
            });
}

exports.truncate = truncate;
/* No side effect */
