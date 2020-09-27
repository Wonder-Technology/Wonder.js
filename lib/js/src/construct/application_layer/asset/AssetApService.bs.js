'use strict';

var ListSt$Wonderjs = require("../../domain_layer/library/structure/ListSt.bs.js");
var ImageIdVO$Wonderjs = require("../../domain_layer/domain/asset/image/value_object/ImageIdVO.bs.js");
var LoadImageDoService$Wonderjs = require("../../domain_layer/domain/asset/image/service/LoadImageDoService.bs.js");
var OperateImageDoService$Wonderjs = require("../../domain_layer/domain/asset/image/service/OperateImageDoService.bs.js");

function loadImages(imageDataList) {
  return LoadImageDoService$Wonderjs.loadImages(ListSt$Wonderjs.map(imageDataList, (function (param) {
                    return [
                            ImageIdVO$Wonderjs.create(param[0]),
                            param[1]
                          ];
                  })));
}

var getImageData = OperateImageDoService$Wonderjs.getData;

exports.loadImages = loadImages;
exports.getImageData = getImageData;
/* LoadImageDoService-Wonderjs Not a pure module */
