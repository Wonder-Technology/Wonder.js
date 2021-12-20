'use strict';

var CanvasDoService$WonderMiddlewareEventmanager = require("../service/dom/CanvasDoService.bs.js");
var ContainerManager$WonderMiddlewareEventmanager = require("../data/ContainerManager.bs.js");

function setCanvas(canvas) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(CanvasDoService$WonderMiddlewareEventmanager.setCanvas(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), canvas));
}

exports.setCanvas = setCanvas;
/* ContainerManager-WonderMiddlewareEventmanager Not a pure module */
