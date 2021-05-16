'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var WorkerJobTool$Wonderjs = require("../../../../tool/service/workerJob/WorkerJobTool.js");
var SettingWorkerTool$Wonderjs = require("../SettingWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../../job/main_worker/tool/TestMainWorkerTool.js");

function _buildFakeContext(sandbox, param) {
  var getImageData = Sinon.returns({
        data: {
          buffer: param[3]
        }
      }, Sinon.onCall(3, Sinon.returns({
                data: {
                  buffer: param[2]
                }
              }, Sinon.onCall(2, Sinon.returns({
                        data: {
                          buffer: param[1]
                        }
                      }, Sinon.onCall(1, Sinon.returns({
                                data: {
                                  buffer: param[0]
                                }
                              }, Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)))))))));
  return {
          drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox),
          getImageData: getImageData
        };
}

function _buildFakeCanvas(sandbox, context) {
  return Curry._1(SettingWorkerTool$Wonderjs.addTransferControlToOffscreen, {
              width: 0,
              height: 0,
              style: {
                left: "",
                top: "",
                width: "",
                height: "",
                position: "static"
              },
              getContext: Sinon.returns(context, Sinon.createEmptyStubWithJsObjSandbox(sandbox))
            });
}

function prepareState(sandbox, param) {
  var context = _buildFakeContext(sandbox, /* tuple */[
        param[0],
        param[1],
        param[2],
        param[3]
      ]);
  SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox, context));
  var state = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
  return /* tuple */[
          state,
          context
        ];
}

exports._buildFakeContext = _buildFakeContext;
exports._buildFakeCanvas = _buildFakeCanvas;
exports.prepareState = prepareState;
/* Sinon Not a pure module */
