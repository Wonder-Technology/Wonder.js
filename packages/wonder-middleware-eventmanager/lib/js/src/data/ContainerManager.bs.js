'use strict';

var Container$WonderMiddlewareEventmanager = require("./container/Container.bs.js");

function getPO(param) {
  return Container$WonderMiddlewareEventmanager.poContainer.po;
}

function setPO(po) {
  Container$WonderMiddlewareEventmanager.poContainer.po = po;
  
}

exports.getPO = getPO;
exports.setPO = setPO;
/* Container-WonderMiddlewareEventmanager Not a pure module */
