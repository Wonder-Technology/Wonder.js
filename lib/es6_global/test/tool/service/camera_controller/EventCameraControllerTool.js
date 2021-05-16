

import * as TestTool$Wonderjs from "../../TestTool.js";
import * as MouseEventTool$Wonderjs from "../../../unit/job/no_worker/tool/MouseEventTool.js";
import * as TouchEventTool$Wonderjs from "../../../unit/job/no_worker/tool/TouchEventTool.js";
import * as KeyboardEventTool$Wonderjs from "../../../unit/job/no_worker/tool/KeyboardEventTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../noWorkerJob/NoWorkerJobConfigTool.js";

function prepareMouseEvent(sandbox) {
  var state = MouseEventTool$Wonderjs.prepareWithState(sandbox, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        },\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    },\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", undefined, /* () */0), undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
  MouseEventTool$Wonderjs.setPointerLocked();
  return state;
}

function prepareTouchEvent(sandbox) {
  return TouchEventTool$Wonderjs.prepareWithState(sandbox, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_event\"\n        },\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n          \"name\": \"init_event\"\n    },\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", undefined, /* () */0), undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
}

function prepareKeyboardEvent(sandbox) {
  return KeyboardEventTool$Wonderjs.prepare(sandbox, undefined, /* () */0);
}

export {
  prepareMouseEvent ,
  prepareTouchEvent ,
  prepareKeyboardEvent ,
  
}
/* TestTool-Wonderjs Not a pure module */
