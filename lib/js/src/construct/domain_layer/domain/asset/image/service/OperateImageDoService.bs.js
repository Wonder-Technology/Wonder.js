'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ImageIdVO$Wonderjs = require("../value_object/ImageIdVO.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function getData(id) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetImageRepoDp(undefined).getData, ImageIdVO$Wonderjs.value(id));
}

exports.getData = getData;
/* No side effect */
