'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Result$Wonderjs = require("./Result.bs.js");
var MutableHashMap$Wonderjs = require("./hash_map/MutableHashMap.bs.js");

function traverseResultM(list, f) {
  return Result$Wonderjs.mapSuccess(Belt_List.reduce(list, Result$Wonderjs.succeed(/* [] */0), (function (newListResult, value) {
                    return Result$Wonderjs.bind(Curry._1(f, value), (function (h) {
                                  return Result$Wonderjs.bind(newListResult, (function (newList) {
                                                return Result$Wonderjs.succeed({
                                                            hd: h,
                                                            tl: newList
                                                          });
                                              }));
                                }));
                  })), Belt_List.reverse);
}

function traverseReduceResultM(list, param, f) {
  return Belt_List.reduce(list, Result$Wonderjs.succeed(param), (function (paramResult, value) {
                return Result$Wonderjs.bind(paramResult, (function (param) {
                              return Curry._2(f, param, value);
                            }));
              }));
}

function traverseReduceResultMi(list, param, f) {
  return Result$Wonderjs.bind(Belt_List.reduce(list, Result$Wonderjs.succeed([
                      0,
                      param
                    ]), (function (resultData, value) {
                    return Result$Wonderjs.bind(resultData, (function (param) {
                                  var index = param[0];
                                  return Result$Wonderjs.bind(Curry._2(f, param[1], [
                                                  index,
                                                  value
                                                ]), (function (param) {
                                                return Result$Wonderjs.succeed([
                                                            index + 1 | 0,
                                                            param
                                                          ]);
                                              }));
                                }));
                  })), (function (param) {
                return Result$Wonderjs.succeed(param[1]);
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
  var map = MutableHashMap$Wonderjs.createEmpty(undefined, undefined);
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var item = arr[i];
    var key = Curry._1(buildKeyFunc, item);
    var match = MutableHashMap$Wonderjs.get(map, key);
    if (match !== undefined) {
      
    } else {
      resultArr.push(item);
      MutableHashMap$Wonderjs.set(map, key, item);
    }
  }
  return Belt_List.fromArray(resultArr);
}

function removeDuplicateItems(list) {
  return removeDuplicateItemsU(list, (function (prim) {
                return prim.toString();
              }));
}

var getBy = Belt_List.getBy;

var reduce = Belt_List.reduce;

var reducei = Belt_List.reduceWithIndex;

var forEach = Belt_List.forEach;

var forEachi = Belt_List.forEachWithIndex;

var toArray = Belt_List.toArray;

var fromArray = Belt_List.fromArray;

var filter = Belt_List.filter;

var length = Belt_List.length;

var head = Belt_List.head;

var nth = Belt_List.get;

var reverse = Belt_List.reverse;

var zip = Belt_List.zip;

var zipBy = Belt_List.zipBy;

exports.traverseResultM = traverseResultM;
exports.traverseReduceResultM = traverseReduceResultM;
exports.traverseReduceResultMi = traverseReduceResultMi;
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
/* No side effect */
