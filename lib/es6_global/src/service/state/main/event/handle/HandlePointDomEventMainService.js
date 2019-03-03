

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ViewService$Wonderjs from "../../../../record/main/device/ViewService.js";
import * as HandleDomEventMainService$Wonderjs from "./HandleDomEventMainService.js";

function getLocationInView(domEvent, getLocationFunc, state) {
  var viewRecord = state[/* viewRecord */8];
  var match = ViewService$Wonderjs.getCanvas(viewRecord);
  if (match !== undefined) {
    var match$1 = ViewService$Wonderjs.getOffset(ViewService$Wonderjs.unsafeGetCanvas(viewRecord));
    var match$2 = Curry._2(getLocationFunc, domEvent, state);
    return /* tuple */[
            match$2[0] - match$1[0] | 0,
            match$2[1] - match$1[1] | 0
          ];
  } else {
    return /* tuple */[
            0,
            0
          ];
  }
}

function getMovementDelta($$location, lastXYTuple, state) {
  var match = lastXYTuple[0];
  var exit = 0;
  if (match !== undefined) {
    var match$1 = lastXYTuple[1];
    if (match$1 !== undefined) {
      return /* tuple */[
              $$location[0] - match | 0,
              $$location[1] - match$1 | 0
            ];
    } else {
      exit = 1;
    }
  } else if (lastXYTuple[1] !== undefined) {
    exit = 1;
  } else {
    return /* tuple */[
            0,
            0
          ];
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getMovementDelta", "lastX, lastY should all be None or all be Some", "", "", ""));
  }
  
}

var preventDefault = HandleDomEventMainService$Wonderjs.preventDefault;

export {
  getLocationInView ,
  getMovementDelta ,
  preventDefault ,
  
}
/* Log-WonderLog Not a pure module */
