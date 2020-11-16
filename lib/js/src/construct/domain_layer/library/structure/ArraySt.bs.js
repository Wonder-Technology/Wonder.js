'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

var reduceOneParam = Belt_Array.reduceU;

function reduceOneParami(arr, param, func) {
  var mutableParam = param;
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    mutableParam = func(mutableParam, arr[i], i);
  }
  return mutableParam;
}

function includes(arr, value) {
  return arr.includes(value);
}

function sliceFrom(arr, index) {
  return arr.slice(index);
}

function unsafeGetFirst(arr) {
  return arr[0];
}

function push(arr, value) {
  arr.push(value);
  return arr;
}

function forEach(arr, func) {
  arr.forEach(Curry.__1(func));
  
}

exports.reduceOneParam = reduceOneParam;
exports.reduceOneParami = reduceOneParami;
exports.includes = includes;
exports.sliceFrom = sliceFrom;
exports.unsafeGetFirst = unsafeGetFirst;
exports.push = push;
exports.forEach = forEach;
/* No side effect */
