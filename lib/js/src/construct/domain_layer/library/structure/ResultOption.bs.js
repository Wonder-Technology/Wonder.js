'use strict';

var Result$Wonderjs = require("./Result.bs.js");
var OptionSt$Wonderjs = require("./OptionSt.bs.js");

function openInverse(resultOptionData) {
  return Result$Wonderjs.bind(resultOptionData, OptionSt$Wonderjs.get);
}

exports.openInverse = openInverse;
/* No side effect */
