

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addToEventArr(eventName, eventData, getPriorityFunc, eventArrMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(eventName, eventArrMap);
  if (match !== undefined) {
    return MutableSparseMapService$WonderCommonlib.set(eventName, ArrayService$Wonderjs.push(eventData, match).sort((function (eventDataA, eventDataB) {
                      return Curry._1(getPriorityFunc, eventDataB) - Curry._1(getPriorityFunc, eventDataA) | 0;
                    })), eventArrMap);
  } else {
    return MutableSparseMapService$WonderCommonlib.set(eventName, /* array */[eventData], eventArrMap);
  }
}

function removeFromEventArrMapByHandleFunc(eventName, param, eventArrMap) {
  var targetHandleFunc = param[1];
  var getHandleFuncFunc = param[0];
  var match = MutableSparseMapService$WonderCommonlib.get(eventName, eventArrMap);
  if (match !== undefined) {
    return MutableSparseMapService$WonderCommonlib.set(eventName, match.filter((function (domEventData) {
                      return Curry._1(getHandleFuncFunc, domEventData) !== targetHandleFunc;
                    })), eventArrMap);
  } else {
    return eventArrMap;
  }
}

export {
  addToEventArr ,
  removeFromEventArrMapByHandleFunc ,
  
}
/* ArrayService-Wonderjs Not a pure module */
