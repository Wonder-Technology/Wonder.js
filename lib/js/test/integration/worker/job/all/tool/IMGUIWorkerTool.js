'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ViewTool$Wonderjs = require("../../../../../tool/service/device/ViewTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../../tool/service/browserDetect/BrowserDetectTool.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var IMGUIRenderWorkerTool$Wonderjs = require("../../render_worker/tool/IMGUIRenderWorkerTool.js");
var SendRenderDataMainWorkerTool$Wonderjs = require("../../main_worker/tool/SendRenderDataMainWorkerTool.js");

function buildEmptyCustomData(param) {
  return -1;
}

var prepareForTestSendRenderData = SendRenderDataMainWorkerTool$Wonderjs.prepareForTestSendRenderData;

function prepareForTestInRenderWorkerJob(sandbox) {
  var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
  var state = ViewTool$Wonderjs.setCanvas({
        width: 100,
        height: 200
      }, match[0]);
  var getExtension = RenderIMGUITool$WonderImgui.buildNoVAOExtension(sandbox);
  var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
  var state$2 = BrowserDetectTool$Wonderjs.setChrome(state$1);
  return /* tuple */[
          state$2,
          bufferData
        ];
}

exports.buildEmptyCustomData = buildEmptyCustomData;
exports.prepareForTestSendRenderData = prepareForTestSendRenderData;
exports.prepareForTestInRenderWorkerJob = prepareForTestInRenderWorkerJob;
/* Sinon Not a pure module */
