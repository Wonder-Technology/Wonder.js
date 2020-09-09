'use strict';

var PictureCPRepo$Wonderjs = require("../../../../repo/PictureCPRepo.bs.js");

function getSize(param) {
  return PictureCPRepo$Wonderjs.getSize(undefined);
}

var setSize = PictureCPRepo$Wonderjs.setSize;

exports.getSize = getSize;
exports.setSize = setSize;
/* PictureCPRepo-Wonderjs Not a pure module */
