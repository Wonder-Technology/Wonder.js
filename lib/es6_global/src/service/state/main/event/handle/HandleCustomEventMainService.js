

import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../../record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _triggerHandleFunc(customEvent, arr, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var customEvent = param[1];
                var state = param[0];
                var match = customEvent[/* isStopPropagation */2];
                if (match) {
                  return /* tuple */[
                          state,
                          customEvent
                        ];
                } else {
                  return param$1[/* handleFunc */1](customEvent, state);
                }
              }), /* tuple */[
              state,
              customEvent
            ], arr);
}

function stopPropagation(customEvent) {
  return /* record */[
          /* name */customEvent[/* name */0],
          /* target */customEvent[/* target */1],
          /* isStopPropagation */true,
          /* phase */customEvent[/* phase */3],
          /* userData */customEvent[/* userData */4]
        ];
}

function triggerGlobalEvent(customEvent, state) {
  var match = MutableHashMapService$WonderCommonlib.get(customEvent[/* name */0], state[/* eventRecord */43][/* customGlobalEventArrMap */4]);
  if (match !== undefined) {
    return _triggerHandleFunc(customEvent, match, state);
  } else {
    return /* tuple */[
            state,
            customEvent
          ];
  }
}

function triggerGameObjectEvent(target, customEvent, state) {
  var match = MutableHashMapService$WonderCommonlib.get(customEvent[/* name */0], state[/* eventRecord */43][/* customGameObjectEventArrMap */5]);
  if (match !== undefined) {
    var match$1 = MutableSparseMapService$WonderCommonlib.get(target, match);
    if (match$1 !== undefined) {
      return _triggerHandleFunc(/* record */[
                  /* name */customEvent[/* name */0],
                  /* target */target,
                  /* isStopPropagation */customEvent[/* isStopPropagation */2],
                  /* phase */customEvent[/* phase */3],
                  /* userData */customEvent[/* userData */4]
                ], match$1, state);
    } else {
      return /* tuple */[
              state,
              customEvent
            ];
    }
  } else {
    return /* tuple */[
            state,
            customEvent
          ];
  }
}

function _broadcastGameObjectEvent(eventName, target, customEvent, state) {
  var match = triggerGameObjectEvent(target, customEvent, state);
  var customEvent$1 = match[1];
  var state$1 = match[0];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state$1);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, child) {
                return _broadcastGameObjectEvent(eventName, child, customEvent$1, state);
              }), state$1, HierachyTransformService$Wonderjs.unsafeGetChildren(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(target, state$1[/* gameObjectRecord */10]), transformRecord));
}

function broadcastGameObjectEvent(target, customEvent, state) {
  return _broadcastGameObjectEvent(customEvent[/* name */0], target, /* record */[
              /* name */customEvent[/* name */0],
              /* target */customEvent[/* target */1],
              /* isStopPropagation */customEvent[/* isStopPropagation */2],
              /* phase *//* Broadcast */0,
              /* userData */customEvent[/* userData */4]
            ], state);
}

function _emitGameObjectEvent(eventName, _target, _customEvent, _state) {
  while(true) {
    var state = _state;
    var customEvent = _customEvent;
    var target = _target;
    var match = triggerGameObjectEvent(target, customEvent, state);
    var state$1 = match[0];
    var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state$1);
    var match$1 = HierachyTransformService$Wonderjs.getParent(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(target, state$1[/* gameObjectRecord */10]), transformRecord);
    if (match$1 !== undefined) {
      _state = state$1;
      _customEvent = match[1];
      _target = match$1;
      continue ;
    } else {
      return state$1;
    }
  };
}

function emitGameObjectEvent(target, customEvent, state) {
  return _emitGameObjectEvent(customEvent[/* name */0], target, /* record */[
              /* name */customEvent[/* name */0],
              /* target */customEvent[/* target */1],
              /* isStopPropagation */customEvent[/* isStopPropagation */2],
              /* phase *//* Emit */1,
              /* userData */customEvent[/* userData */4]
            ], state);
}

function getCustomEventUserData(customEvent) {
  return customEvent[/* userData */4];
}

export {
  _triggerHandleFunc ,
  stopPropagation ,
  triggerGlobalEvent ,
  triggerGameObjectEvent ,
  _broadcastGameObjectEvent ,
  broadcastGameObjectEvent ,
  _emitGameObjectEvent ,
  emitGameObjectEvent ,
  getCustomEventUserData ,
  
}
/* HierachyTransformService-Wonderjs Not a pure module */
