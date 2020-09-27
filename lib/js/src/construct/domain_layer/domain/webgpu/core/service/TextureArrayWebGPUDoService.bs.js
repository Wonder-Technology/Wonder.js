'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function getTextureArrayLayerSize(param) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).capacity.getTextureArrayLayerSize, undefined);
}

exports.getTextureArrayLayerSize = getTextureArrayLayerSize;
/* No side effect */
