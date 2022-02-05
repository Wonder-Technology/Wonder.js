

import * as Curry from "../../../../../node_modules/rescript/lib/es6/curry.js";
import * as ImmutableHashMap$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _createStateContainer(param) {
  return {
          state: undefined
        };
}

var stateContainer = {
  state: undefined
};

function setState(state) {
  stateContainer.state = state;
  
}

function unsafeGetState(param) {
  return stateContainer.state;
}

function onCustomEvent(eventName, eventHandler) {
  return setState({
              eventHandlerMap: ImmutableHashMap$WonderCommonlib.set(stateContainer.state.eventHandlerMap, eventName, eventHandler)
            });
}

function trigger(eventName, data) {
  var eventHandler = ImmutableHashMap$WonderCommonlib.unsafeGet(stateContainer.state.eventHandlerMap, eventName);
  return Curry._1(eventHandler, data);
}

function buildAPI(param) {
  return {
          trigger: trigger,
          onCustomEvent: onCustomEvent
        };
}

function init(param) {
  return setState({
              eventHandlerMap: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
            });
}

export {
  _createStateContainer ,
  stateContainer ,
  setState ,
  unsafeGetState ,
  onCustomEvent ,
  trigger ,
  buildAPI ,
  init ,
  
}
/* No side effect */
