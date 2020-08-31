'use strict';

var CPContainer$Wonderjs = require("./container/CPContainer.bs.js");

function getPO(param) {
  return CPContainer$Wonderjs.poContainer.po;
}

function setPO(po) {
  CPContainer$Wonderjs.poContainer.po = po;
  
}

exports.getPO = getPO;
exports.setPO = setPO;
/* CPContainer-Wonderjs Not a pure module */
