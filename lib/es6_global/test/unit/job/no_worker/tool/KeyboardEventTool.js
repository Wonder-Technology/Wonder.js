

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as EventTool$Wonderjs from "./EventTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

function buildKeyboardEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
  var altKey = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var shiftKey = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  var metaKey = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  var keyCode = $staropt$star$4 !== undefined ? $staropt$star$4 : 8;
  return {
          ctrlKey: ctrlKey,
          altKey: altKey,
          shiftKey: shiftKey,
          metaKey: metaKey,
          keyCode: keyCode
        };
}

function prepare(sandbox, $staropt$star, param) {
  var setBrowserFunc = $staropt$star !== undefined ? $staropt$star : BrowserDetectTool$Wonderjs.setChrome;
  var canvasDom = EventTool$Wonderjs.buildFakeCanvas(/* tuple */[
        0,
        0,
        null
      ]);
  var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    }\n]\n        ", undefined, /* () */0), undefined, /* () */0);
  return Curry._1(setBrowserFunc, ViewTool$Wonderjs.setCanvas(canvasDom, state));
}

export {
  buildKeyboardEvent ,
  prepare ,
  
}
/* TestTool-Wonderjs Not a pure module */
