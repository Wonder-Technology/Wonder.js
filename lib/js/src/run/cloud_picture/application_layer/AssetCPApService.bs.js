'use strict';

var ListSt$Wonderjs = require("../../../construct/domain_layer/library/structure/ListSt.bs.js");
var AssetRunAPI$Wonderjs = require("../../../construct/external_layer/api/run/domain/AssetRunAPI.bs.js");

function loadImages(imageDataArr) {
  return AssetRunAPI$Wonderjs.loadImages(ListSt$Wonderjs.fromArray(imageDataArr));
}

exports.loadImages = loadImages;
/* AssetRunAPI-Wonderjs Not a pure module */
