'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");

function handleAddComponent(material, gameObject) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetBSDFMaterialRepoDp(undefined).addGameObject, material, gameObject);
}

exports.handleAddComponent = handleAddComponent;
/* No side effect */
