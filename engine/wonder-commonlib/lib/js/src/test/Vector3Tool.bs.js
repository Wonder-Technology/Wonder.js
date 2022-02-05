'use strict';

var FloatTool$WonderCommonlib = require("./FloatTool.bs.js");

function truncate(param) {
  return [
          FloatTool$WonderCommonlib.truncateFloatValue(param[0], 5),
          FloatTool$WonderCommonlib.truncateFloatValue(param[1], 5),
          FloatTool$WonderCommonlib.truncateFloatValue(param[2], 5)
        ];
}

exports.truncate = truncate;
/* No side effect */
