'use strict';

var BrowserDoService$WonderMiddlewareEventmanager = require("../service/browser/BrowserDoService.bs.js");
var ContainerManager$WonderMiddlewareEventmanager = require("../data/ContainerManager.bs.js");

function setBrowser(browser) {
  return ContainerManager$WonderMiddlewareEventmanager.setPO(BrowserDoService$WonderMiddlewareEventmanager.setBrowser(ContainerManager$WonderMiddlewareEventmanager.getPO(undefined), browser));
}

exports.setBrowser = setBrowser;
/* ContainerManager-WonderMiddlewareEventmanager Not a pure module */
