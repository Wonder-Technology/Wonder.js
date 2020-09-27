'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../library/structure/Result.bs.js");
var ImageIdVO$Wonderjs = require("../value_object/ImageIdVO.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function loadImages(imageDataList) {
  return Result$Wonderjs.mapSuccess(ListSt$Wonderjs.traverseResultM(imageDataList, (function (param) {
                    var id = param[0];
                    return Result$Wonderjs.mapSuccess(Curry._1(DpContainer$Wonderjs.unsafeGetNetworkDp(undefined).readImageFile, param[1]), (function (stream) {
                                  return Most.map((function (imageData) {
                                                Curry._2(DpContainer$Wonderjs.unsafeGetImageRepoDp(undefined).setData, ImageIdVO$Wonderjs.value(id), imageData);
                                                
                                              }), stream);
                                }));
                  })), (function (streamList) {
                return Most.mergeArray(ListSt$Wonderjs.toArray(streamList));
              }));
}

exports.loadImages = loadImages;
/* most Not a pure module */
