'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Utils$WonderEditorCore = require("../Utils.bs.js");
var ImmutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports.onCustomEvent = onCustomEvent;
exports.trigger = trigger;
exports.init = init;
exports.getData = getData;
/* No side effect */
