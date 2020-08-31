'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");

function handleAddComponent(transform, gameObject) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setGameObject, transform, gameObject);
}

exports.handleAddComponent = handleAddComponent;
/* No side effect */
