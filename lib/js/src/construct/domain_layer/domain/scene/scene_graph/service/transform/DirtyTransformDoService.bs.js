'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");

function mark(transform, isDirty) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setIsDirty, TransformEntity$Wonderjs.value(transform), isDirty);
}

function isDirty(transform) {
  var isDirty$1 = Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getIsDirty, TransformEntity$Wonderjs.value(transform));
  if (isDirty$1 !== undefined) {
    return isDirty$1 === true;
  } else {
    return false;
  }
}

exports.mark = mark;
exports.isDirty = isDirty;
/* No side effect */
