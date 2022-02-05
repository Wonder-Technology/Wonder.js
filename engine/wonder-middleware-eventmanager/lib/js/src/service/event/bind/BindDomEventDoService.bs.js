'use strict';

var Curry = require("rescript/lib/js/curry.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function addToEventArr(eventName, eventData, getPriorityFunc, eventArrMap) {
  var arr = MutableSparseMap$WonderCommonlib.get(eventArrMap, eventName);
  if (arr === undefined) {
    return MutableSparseMap$WonderCommonlib.set(eventArrMap, eventName, [eventData]);
  }
  var __x = ArraySt$WonderCommonlib.push(arr, eventData);
  return MutableSparseMap$WonderCommonlib.set(eventArrMap, eventName, __x.sort(function (eventDataA, eventDataB) {
                  return Curry._1(getPriorityFunc, eventDataB) - Curry._1(getPriorityFunc, eventDataA) | 0;
                }));
}

function removeFromEventArrMapByHandleFunc(eventName, param, eventArrMap) {
  var targetHandleFunc = param[1];
  var getHandleFuncFunc = param[0];
  var arr = MutableSparseMap$WonderCommonlib.get(eventArrMap, eventName);
  if (arr !== undefined) {
    return MutableSparseMap$WonderCommonlib.set(eventArrMap, eventName, arr.filter(function (domEventData) {
                    return Curry._1(getHandleFuncFunc, domEventData) !== targetHandleFunc;
                  }));
  } else {
    return eventArrMap;
  }
}

exports.addToEventArr = addToEventArr;
exports.removeFromEventArrMapByHandleFunc = removeFromEventArrMapByHandleFunc;
/* No side effect */
