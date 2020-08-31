'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function start(param) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetTimeRepoDp(undefined).start, Curry._1(DpContainer$Wonderjs.unsafeGetTimeDp(undefined).getNow, undefined));
}

function getElapsed(param) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetTimeRepoDp(undefined).getElapsed, undefined);
}

exports.start = start;
exports.getElapsed = getElapsed;
/* No side effect */
