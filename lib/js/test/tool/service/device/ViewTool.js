'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ViewService$Wonderjs = require("../../../../src/service/record/main/device/ViewService.js");
var OperateSettingService$Wonderjs = require("../../../../src/service/record/main/setting/OperateSettingService.js");

function unsafeGetCanvas(state) {
  return ViewService$Wonderjs.unsafeGetCanvas(state[/* viewRecord */8]);
}

function setCanvas(canvas, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* viewRecord */8] = ViewService$Wonderjs.setCanvas(canvas, state[/* viewRecord */8]);
  return newrecord;
}

function unsafeGetContext(state) {
  return OperateSettingService$Wonderjs.unsafeGetContext(state[/* settingRecord */0]);
}

exports.unsafeGetCanvas = unsafeGetCanvas;
exports.setCanvas = setCanvas;
exports.unsafeGetContext = unsafeGetContext;
/* ViewService-Wonderjs Not a pure module */
