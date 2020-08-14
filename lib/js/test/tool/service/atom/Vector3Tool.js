'use strict';

var FloatTool$Wonderjs = require("./FloatTool.js");

function truncate(digit, param) {
  return /* tuple */[
          FloatTool$Wonderjs.truncateFloatValue(param[0], digit),
          FloatTool$Wonderjs.truncateFloatValue(param[1], digit),
          FloatTool$Wonderjs.truncateFloatValue(param[2], digit)
        ];
}

exports.truncate = truncate;
/* No side effect */
