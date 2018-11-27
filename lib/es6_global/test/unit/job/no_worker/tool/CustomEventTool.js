

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Js_null_undefined from "../../../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as ManageEventAPI$Wonderjs from "../../../../../src/api/event/ManageEventAPI.js";
import * as NameEventService$Wonderjs from "../../../../../src/service/record/main/event/NameEventService.js";

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

export {
  getPointDownEventName ,
  getPointUpEventName ,
  getPointTapEventName ,
  getPointMoveEventName ,
  getPointScaleEventName ,
  getPointDragEventName ,
  createCustomEvent ,
  
}
/* ManageEventAPI-Wonderjs Not a pure module */
