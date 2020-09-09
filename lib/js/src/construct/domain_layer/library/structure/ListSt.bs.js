'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Result$Wonderjs = require("./Result.bs.js");

function traverseResultM(list, f) {
  if (!list) {
    return Result$Wonderjs.succeed(/* [] */0);
  }
  var tail = list.tl;
  return Result$Wonderjs.bind(Curry._1(f, list.hd), (function (h) {
                return Result$Wonderjs.bind(traverseResultM(tail, f), (function (t) {
                              return Result$Wonderjs.succeed({
                                          hd: h,
                                          tl: t
                                        });
                            }));
              }));
}

function traverseReduceResultM(list, param, f) {
  if (!list) {
    return Result$Wonderjs.succeed(param);
  }
  var tail = list.tl;
  return Result$Wonderjs.bind(Curry._2(f, param, list.hd), (function (h) {
                return traverseReduceResultM(tail, h, f);
              }));
}

function _id(value) {
  return value;
}

function sequenceResultM(list) {
  return traverseResultM(list, _id);
}

function ignoreTraverseResultValue(traverseResult) {
  return Result$Wonderjs.mapSuccess(traverseResult, (function (param) {
                
              }));
}

function range(start, end_) {
  return Belt_List.makeBy((end_ - start | 0) + 1 | 0, (function (i) {
                return i + start | 0;
              }));
}

var map = Belt_List.map;

function _eq(source, target) {
  return source === target;
}

function includes(list, value) {
  return Belt_List.has(list, value, _eq);
}

function push(list, value) {
  return Belt_List.concat(list, {
              hd: value,
              tl: /* [] */0
            });
}

function remove(list, value) {
  return Belt_List.filter(list, (function (v) {
                return v !== value;
              }));
}

var getBy = Belt_List.getBy;

var reduce = Belt_List.reduce;

var forEach = Belt_List.forEach;

var toArray = Belt_List.toArray;

var fromArray = Belt_List.fromArray;

var length = Belt_List.length;

var head = Belt_List.head;

exports.traverseResultM = traverseResultM;
exports.traverseReduceResultM = traverseReduceResultM;
exports._id = _id;
exports.sequenceResultM = sequenceResultM;
exports.ignoreTraverseResultValue = ignoreTraverseResultValue;
exports.range = range;
exports.map = map;
exports._eq = _eq;
exports.includes = includes;
exports.getBy = getBy;
exports.reduce = reduce;
exports.forEach = forEach;
exports.push = push;
exports.toArray = toArray;
exports.fromArray = fromArray;
exports.remove = remove;
exports.length = length;
exports.head = head;
/* No side effect */
