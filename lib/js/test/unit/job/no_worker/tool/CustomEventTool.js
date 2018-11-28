'use strict';

var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
var ManageEventAPI$Wonderjs = require("../../../../../src/api/event/ManageEventAPI.js");
var NameEventService$Wonderjs = require("../../../../../src/service/record/main/event/NameEventService.js");

function createCustomEvent(eventName, $staropt$star, _) {
  var userData = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  return ManageEventAPI$Wonderjs.createCustomEvent(eventName, Js_null_undefined.fromOption(userData));
}

var getPointDownEventName = NameEventService$Wonderjs.getPointDownEventName;

var getPointUpEventName = NameEventService$Wonderjs.getPointUpEventName;

var getPointTapEventName = NameEventService$Wonderjs.getPointTapEventName;

var getPointMoveEventName = NameEventService$Wonderjs.getPointMoveEventName;

var getPointScaleEventName = NameEventService$Wonderjs.getPointScaleEventName;

var getPointDragEventName = NameEventService$Wonderjs.getPointDragEventName;

exports.getPointDownEventName = getPointDownEventName;
exports.getPointUpEventName = getPointUpEventName;
exports.getPointTapEventName = getPointTapEventName;
exports.getPointMoveEventName = getPointMoveEventName;
exports.getPointScaleEventName = getPointScaleEventName;
exports.getPointDragEventName = getPointDragEventName;
exports.createCustomEvent = createCustomEvent;
/* ManageEventAPI-Wonderjs Not a pure module */
