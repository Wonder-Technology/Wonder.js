'use strict';

var CPRepo$Wonderjs = require("../../infrastructure_layer/data/container/CPRepo.bs.js");

function getSize(param) {
  return CPRepo$Wonderjs.getPicture(undefined).size;
}

function setSize(size) {
  return CPRepo$Wonderjs.setPicture({
              size: size
            });
}

exports.getSize = getSize;
exports.setSize = setSize;
/* CPRepo-Wonderjs Not a pure module */
