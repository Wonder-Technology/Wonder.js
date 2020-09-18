'use strict';

var CPRepo$Wonderjs = require("../../data/container/CPRepo.bs.js");

function getFloat32Array1(param) {
  return CPRepo$Wonderjs.getGlobalTemp(undefined).float16Array1;
}

function getFloat9Array(param) {
  return CPRepo$Wonderjs.getGlobalTemp(undefined).float9Array;
}

exports.getFloat32Array1 = getFloat32Array1;
exports.getFloat9Array = getFloat9Array;
/* CPRepo-Wonderjs Not a pure module */
