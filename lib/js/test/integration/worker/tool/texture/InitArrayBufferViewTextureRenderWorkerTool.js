'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var WorkerJobTool$Wonderjs = require("../../../../tool/service/workerJob/WorkerJobTool.js");
var SettingWorkerTool$Wonderjs = require("../SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../job/main_worker/tool/TestMainWorkerTool.js");

function _buildFakeCanvas(sandbox) {
  return Curry._1(SettingWorkerTool$Wonderjs.addTransferControlToOffscreen, {
              width: 0,
              height: 0,
              style: {
                left: "",
                top: "",
                width: "",
                height: "",
                position: "static"
              }
            });
}

function prepareState(sandbox) {
  SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox));
  return TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
}

exports._buildFakeCanvas = _buildFakeCanvas;
exports.prepareState = prepareState;
/* SettingTool-Wonderjs Not a pure module */
