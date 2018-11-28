

import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_obj from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ViewTool$Wonderjs from "../../../../../tool/service/device/ViewTool.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as IMGUIRenderWorkerTool$Wonderjs from "../../render_worker/tool/IMGUIRenderWorkerTool.js";
import * as RecordIMGUIService$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/RecordIMGUIService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../../../src/service/state/main/imgui/RecordIMGUIMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as SendRenderDataMainWorkerTool$Wonderjs from "../../main_worker/tool/SendRenderDataMainWorkerTool.js";

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

export {
  buildEmptyCustomData ,
  buildControlData ,
  buildControlDataAfterRenderIMGUI ,
  isRenderWorkerControlDataEqualMainWorkerControlData ,
  getMainWorkerControlData ,
  prepareForTestSendRenderData ,
  prepareForTestInRenderWorkerJob ,
  
}
/* Sinon Not a pure module */
