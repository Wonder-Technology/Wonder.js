'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");

function handleAddComponent(light, gameObject) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetDirectionLightRepoDp(undefined).setGameObject, light, gameObject);
}

exports.handleAddComponent = handleAddComponent;
/* No side effect */
