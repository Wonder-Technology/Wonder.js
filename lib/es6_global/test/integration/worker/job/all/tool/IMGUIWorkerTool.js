

import * as Sinon from "./../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ViewTool$Wonderjs from "../../../../../tool/service/device/ViewTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as RenderIMGUITool$WonderImgui from "./../../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as IMGUIRenderWorkerTool$Wonderjs from "../../render_worker/tool/IMGUIRenderWorkerTool.js";
import * as SendRenderDataMainWorkerTool$Wonderjs from "../../main_worker/tool/SendRenderDataMainWorkerTool.js";

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

export {
  buildEmptyCustomData ,
  prepareForTestSendRenderData ,
  prepareForTestInRenderWorkerJob ,
  
}
/* Sinon Not a pure module */
