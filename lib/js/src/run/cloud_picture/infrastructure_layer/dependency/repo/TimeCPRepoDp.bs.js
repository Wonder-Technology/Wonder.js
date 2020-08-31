'use strict';

var CPRepo$Wonderjs = require("../../../domain_layer/repo/CPRepo.bs.js");

function start(startTime) {
  return CPRepo$Wonderjs.setTime({
              startTime: startTime,
              elapsed: 0.0
            });
}

function getElapsed(param) {
  return CPRepo$Wonderjs.getTime(undefined).elapsed;
}

exports.start = start;
exports.getElapsed = getElapsed;
/* CPRepo-Wonderjs Not a pure module */
