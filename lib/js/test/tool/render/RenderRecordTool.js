'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var RenderTool$Wonderjs = require("../service/render/RenderTool.js");
var OperateRenderMainService$Wonderjs = require("../../../src/service/state/main/render/OperateRenderMainService.js");

function isCameraRecordExist(state) {
  return Js_option.isSome(RenderTool$Wonderjs.getRenderRecord(state)[/* cameraRecord */2]);
}

var setCameraRecord = OperateRenderMainService$Wonderjs.setCameraRecord;

exports.isCameraRecordExist = isCameraRecordExist;
exports.setCameraRecord = setCameraRecord;
/* RenderTool-Wonderjs Not a pure module */
