'use strict';

var TestTool$Wonderjs = require("../../TestTool.js");
var MouseEventTool$Wonderjs = require("../../../unit/job/no_worker/tool/MouseEventTool.js");
var TouchEventTool$Wonderjs = require("../../../unit/job/no_worker/tool/TouchEventTool.js");
var KeyboardEventTool$Wonderjs = require("../../../unit/job/no_worker/tool/KeyboardEventTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../noWorkerJob/NoWorkerJobConfigTool.js");

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

exports.prepareMouseEvent = prepareMouseEvent;
exports.prepareTouchEvent = prepareTouchEvent;
exports.prepareKeyboardEvent = prepareKeyboardEvent;
/* TestTool-Wonderjs Not a pure module */
