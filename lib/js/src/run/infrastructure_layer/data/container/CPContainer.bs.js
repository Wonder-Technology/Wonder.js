'use strict';

var CreateCPRepo$Wonderjs = require("../../../domain_layer/repo/CreateCPRepo.bs.js");

var poContainer = {
  po: CreateCPRepo$Wonderjs.create(undefined)
};

exports.poContainer = poContainer;
/* poContainer Not a pure module */
