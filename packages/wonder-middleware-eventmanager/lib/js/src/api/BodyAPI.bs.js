'use strict';

var BodyDoService$WonderMiddlewareEventmanager = require("../service/dom/BodyDoService.bs.js");
var ContainerManager$WonderMiddlewareEventmanager = require("../data/ContainerManager.bs.js");

function getBodyExn(param) {
  return BodyDoService$WonderMiddlewareEventmanager.getBodyExn(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined));
}

function setBody(body) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(BodyDoService$WonderMiddlewareEventmanager.setBody(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), body));
}

exports.getBodyExn = getBodyExn;
exports.setBody = setBody;
/* ContainerManager-WonderMiddlewareEventmanager Not a pure module */
