'use strict';

var Main$WonderMiddlewareWebgpuRenderer = require("./Main.bs.js");

function getAllMaterialData(param) {
  return 1;
}

function initJobExec(states) {
  Main$WonderMiddlewareWebgpuRenderer.createRenderPipelinesWithMaterial(1);
  return states;
}

exports.getAllMaterialData = getAllMaterialData;
exports.initJobExec = initJobExec;
/* No side effect */
