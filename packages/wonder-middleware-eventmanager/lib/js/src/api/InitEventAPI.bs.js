'use strict';

var ContainerManager$WonderMiddlewareEventmanager = require("../data/ContainerManager.bs.js");
var InitEventDoService$WonderMiddlewareEventmanager = require("../service/init_event/InitEventDoService.bs.js");

function initEvent(param) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(InitEventDoService$WonderMiddlewareEventmanager.initEvent(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined)));
}

exports.initEvent = initEvent;
/* ContainerManager-WonderMiddlewareEventmanager Not a pure module */
