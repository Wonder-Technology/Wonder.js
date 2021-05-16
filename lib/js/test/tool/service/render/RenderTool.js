'use strict';

var RecordRenderMainService$Wonderjs = require("../../../../src/service/state/main/render/RecordRenderMainService.js");
var OperateRenderMainService$Wonderjs = require("../../../../src/service/state/main/render/OperateRenderMainService.js");
var RecordBasicRenderObjectMainService$Wonderjs = require("../../../../src/service/state/main/render/RecordBasicRenderObjectMainService.js");

var getRenderRecord = RecordRenderMainService$Wonderjs.getRecord;

function getBasicRenderObjectRecord(state) {
  return RecordBasicRenderObjectMainService$Wonderjs.getRecord(RecordRenderMainService$Wonderjs.getRecord(state));
}

var unsafeGetCameraRecord = OperateRenderMainService$Wonderjs.unsafeGetCameraRecord;

function getCameraRecord(state) {
  return RecordRenderMainService$Wonderjs.getRecord(state)[/* cameraRecord */2];
}

exports.getRenderRecord = getRenderRecord;
exports.getBasicRenderObjectRecord = getBasicRenderObjectRecord;
exports.unsafeGetCameraRecord = unsafeGetCameraRecord;
exports.getCameraRecord = getCameraRecord;
/* RecordRenderMainService-Wonderjs Not a pure module */
