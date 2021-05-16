

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Js_null_undefined from "../../../../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as ManageEventAPI$Wonderjs from "../../../../../src/api/event/ManageEventAPI.js";
import * as NameEventService$Wonderjs from "../../../../../src/service/record/main/event/NameEventService.js";

function createCustomEvent(eventName, $staropt$star, param) {
  var userData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  return ManageEventAPI$Wonderjs.createCustomEvent(eventName, Js_null_undefined.fromOption(userData));
}

var getPointDownEventName = NameEventService$Wonderjs.getPointDownEventName;

var getPointUpEventName = NameEventService$Wonderjs.getPointUpEventName;

var getPointTapEventName = NameEventService$Wonderjs.getPointTapEventName;

var getPointMoveEventName = NameEventService$Wonderjs.getPointMoveEventName;

var getPointScaleEventName = NameEventService$Wonderjs.getPointScaleEventName;

var getPointDragStartEventName = NameEventService$Wonderjs.getPointDragStartEventName;

var getPointDragOverEventName = NameEventService$Wonderjs.getPointDragOverEventName;

var getPointDragDropEventName = NameEventService$Wonderjs.getPointDragDropEventName;

export {
  getPointDownEventName ,
  getPointUpEventName ,
  getPointTapEventName ,
  getPointMoveEventName ,
  getPointScaleEventName ,
  getPointDragStartEventName ,
  getPointDragOverEventName ,
  getPointDragDropEventName ,
  createCustomEvent ,
  
}
/* ManageEventAPI-Wonderjs Not a pure module */
