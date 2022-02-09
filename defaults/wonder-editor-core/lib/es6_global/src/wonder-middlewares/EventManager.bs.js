

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Utils$WonderEditorCore from "../Utils.bs.js";
import * as ImmutableHashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function onCustomEvent(state, eventName, eventHandler) {
  return {
          eventHandlerMap: ImmutableHashMap$WonderCommonlib.set(state.eventHandlerMap, eventName, eventHandler)
        };
}

function trigger(states, state, eventName, data) {
  var eventHandler = ImmutableHashMap$WonderCommonlib.unsafeGet(state.eventHandlerMap, eventName);
  return Curry._3(eventHandler, states, Utils$WonderEditorCore.buildAPI(undefined), data);
}

function init(param) {
  return {
          eventHandlerMap: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
        };
}

function getData(param) {
  return {
          init: init,
          trigger: trigger,
          onCustomEvent: onCustomEvent
        };
}

export {
  onCustomEvent ,
  trigger ,
  init ,
  getData ,
  
}
/* No side effect */
