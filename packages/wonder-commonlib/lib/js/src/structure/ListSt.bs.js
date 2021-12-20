'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Belt_List = require("rescript/lib/js/belt_List.js");
var Result$WonderCommonlib = require("./Result.bs.js");
var MutableHashMap$WonderCommonlib = require("./hash_map/MutableHashMap.bs.js");

function traverseResultM(list, f) {
  if (!list) {
    return Result$WonderCommonlib.succeed(/* [] */0);
  }
  var tail = list.tl;
  return Result$WonderCommonlib.bind(Curry._1(f, list.hd), (function (h) {
                return Result$WonderCommonlib.bind(traverseResultM(tail, f), (function (t) {
                              return Result$WonderCommonlib.succeed({
                                          hd: h,
                                          tl: t
                                        });
                            }));
              }));
}

function traverseResultMi(list, f) {
  var _traverse = function (list, i, f) {
    if (!list) {
      return Result$WonderCommonlib.succeed(/* [] */0);
    }
    var tail = list.tl;
    return Result$WonderCommonlib.bind(Curry._2(f, i, list.hd), (function (h) {
                  return Result$WonderCommonlib.bind(_traverse(tail, i + 1 | 0, f), (function (t) {
                                return Result$WonderCommonlib.succeed({
                                            hd: h,
                                            tl: t
                                          });
                              }));
                }));
  };
  return _traverse(list, 0, f);
}

function traverseReduceResultM(list, param, f) {
  if (!list) {
    return Result$WonderCommonlib.succeed(param);
  }
  var tail = list.tl;
  return Result$WonderCommonlib.bind(Curry._2(f, param, list.hd), (function (h) {
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
  return Result$WonderCommonlib.mapSuccess(traverseResult, (function (param) {
                
              }));
}

function range(start, end_) {
  return Belt_List.makeBy(end_ - start | 0, (function (i) {
                return i + start | 0;
              }));
}

var map = Belt_List.map;

var mapi = Belt_List.mapWithIndex;

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

function getLast(list) {
  return Belt_List.get(list, Belt_List.length(list) - 1 | 0);
}

function removeDuplicateItemsU(list, buildKeyFunc) {
  var arr = Belt_List.toArray(list);
  var resultArr = [];
  var map = MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined);
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var item = arr[i];
    var key = Curry._1(buildKeyFunc, item);
    var match = MutableHashMap$WonderCommonlib.get(map, key);
    if (match !== undefined) {
      
    } else {
      resultArr.push(item);
      MutableHashMap$WonderCommonlib.set(map, key, item);
    }
  }
  return Belt_List.fromArray(resultArr);
}

function removeDuplicateItems(list) {
  return removeDuplicateItemsU(list, (function (prim) {
                return prim.toString();
              }));
}

function find(list, func) {
  return Belt_List.head(Belt_List.filter(list, func));
}

var addInReduce = push;

var getBy = Belt_List.getBy;

var reduce = Belt_List.reduce;

var reducei = Belt_List.reduceWithIndex;

var forEach = Belt_List.forEach;

var forEachi = Belt_List.forEachWithIndex;

var concat = Belt_List.concat;

var toArray = Belt_List.toArray;

var fromArray = Belt_List.fromArray;

var filter = Belt_List.filter;

var length = Belt_List.length;

var head = Belt_List.head;

var nth = Belt_List.get;

var reverse = Belt_List.reverse;

var zip = Belt_List.zip;

var zipBy = Belt_List.zipBy;

var splitAt = Belt_List.splitAt;

exports.traverseResultM = traverseResultM;
exports.traverseResultMi = traverseResultMi;
exports.traverseReduceResultM = traverseReduceResultM;
exports._id = _id;
exports.sequenceResultM = sequenceResultM;
exports.ignoreTraverseResultValue = ignoreTraverseResultValue;
exports.range = range;
exports.map = map;
exports.mapi = mapi;
exports._eq = _eq;
exports.includes = includes;
exports.getBy = getBy;
exports.reduce = reduce;
exports.reducei = reducei;
exports.forEach = forEach;
exports.forEachi = forEachi;
exports.concat = concat;
exports.push = push;
exports.toArray = toArray;
exports.fromArray = fromArray;
exports.remove = remove;
exports.filter = filter;
exports.length = length;
exports.head = head;
exports.nth = nth;
exports.getLast = getLast;
exports.removeDuplicateItemsU = removeDuplicateItemsU;
exports.removeDuplicateItems = removeDuplicateItems;
exports.reverse = reverse;
exports.zip = zip;
exports.zipBy = zipBy;
exports.splitAt = splitAt;
exports.find = find;
exports.addInReduce = addInReduce;
/* No side effect */
