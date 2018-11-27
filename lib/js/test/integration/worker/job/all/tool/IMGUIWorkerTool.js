'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var ViewTool$Wonderjs = require("../../../../../tool/service/device/ViewTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../../tool/service/browserDetect/BrowserDetectTool.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var HashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/HashMapService.js");
var IMGUIRenderWorkerTool$Wonderjs = require("../../render_worker/tool/IMGUIRenderWorkerTool.js");
var RecordIMGUIService$WonderImgui = require("wonder-imgui/lib/js/src/service/record/RecordIMGUIService.js");
var RecordIMGUIMainService$Wonderjs = require("../../../../../../src/service/state/main/imgui/RecordIMGUIMainService.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var SendRenderDataMainWorkerTool$Wonderjs = require("../../main_worker/tool/SendRenderDataMainWorkerTool.js");

function buildEmptyCustomData() {
  return -1;
}

function buildControlData() {
  return /* record */[
          /* radioButtonData : record */[/* isSelectedMap */HashMapService$WonderCommonlib.createEmpty(/* () */0)],
          /* checkboxData : record */[
            /* index */1,
            /* isSelectedMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
          /* sliderData : record */[
            /* index */3,
            /* valueMap */SparseMapService$WonderCommonlib.set(1, 2, SparseMapService$WonderCommonlib.createEmpty(/* () */0))
          ]
        ];
}

function buildControlDataAfterRenderIMGUI() {
  return /* record */[
          /* radioButtonData : record */[/* isSelectedMap */HashMapService$WonderCommonlib.createEmpty(/* () */0)],
          /* checkboxData : record */[
            /* index */0,
            /* isSelectedMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
          ],
          /* sliderData : record */[
            /* index */0,
            /* valueMap */SparseMapService$WonderCommonlib.set(1, 2, SparseMapService$WonderCommonlib.createEmpty(/* () */0))
          ]
        ];
}

function isRenderWorkerControlDataEqualMainWorkerControlData(renderWorkerControlData, mainWorkerControlData) {
  return Caml_obj.caml_equal(renderWorkerControlData, buildControlDataAfterRenderIMGUI(mainWorkerControlData));
}

function getMainWorkerControlData(state) {
  return RecordIMGUIService$WonderImgui.getControlData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(state));
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
  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
  MainStateTool$Wonderjs.setState(state$1);
  BrowserDetectTool$Wonderjs.setChrome(/* () */0);
  return /* tuple */[
          state$1,
          bufferData
        ];
}

exports.buildEmptyCustomData = buildEmptyCustomData;
exports.buildControlData = buildControlData;
exports.buildControlDataAfterRenderIMGUI = buildControlDataAfterRenderIMGUI;
exports.isRenderWorkerControlDataEqualMainWorkerControlData = isRenderWorkerControlDataEqualMainWorkerControlData;
exports.getMainWorkerControlData = getMainWorkerControlData;
exports.prepareForTestSendRenderData = prepareForTestSendRenderData;
exports.prepareForTestInRenderWorkerJob = prepareForTestInRenderWorkerJob;
/* Sinon Not a pure module */
