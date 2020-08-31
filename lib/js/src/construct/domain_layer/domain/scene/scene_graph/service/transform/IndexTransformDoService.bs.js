'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");

function getMaxIndex(param) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getMaxIndex, undefined);
}

function setMaxIndex(maxIndex) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setMaxIndex, maxIndex);
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
/* No side effect */
