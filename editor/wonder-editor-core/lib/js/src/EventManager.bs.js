'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ImmutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports._createStateContainer = _createStateContainer;
exports.stateContainer = stateContainer;
exports.setState = setState;
exports.unsafeGetState = unsafeGetState;
exports.onCustomEvent = onCustomEvent;
exports.trigger = trigger;
exports.buildAPI = buildAPI;
exports.init = init;
/* No side effect */
