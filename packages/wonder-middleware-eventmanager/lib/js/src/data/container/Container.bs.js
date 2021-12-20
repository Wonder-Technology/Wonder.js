'use strict';

var CreatePO$WonderMiddlewareEventmanager = require("../CreatePO.bs.js");

var poContainer = {
  po: CreatePO$WonderMiddlewareEventmanager.create(undefined)
};

exports.poContainer = poContainer;
/* poContainer Not a pure module */
