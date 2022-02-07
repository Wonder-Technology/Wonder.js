'use strict';

var Curry = require("rescript/lib/js/curry.js");
var MiddlewareManager$WonderEditorCore = require("./MiddlewareManager.bs.js");

function buildAPI(param) {
  var eventManager = MiddlewareManager$WonderEditorCore.unsafeGet("EventManager");
  var ui = MiddlewareManager$WonderEditorCore.unsafeGet("UI");
  return {
          ui: Curry._1(ui.buildAPI, undefined),
          eventManager: Curry._1(eventManager.buildAPI, undefined)
        };
}

exports.buildAPI = buildAPI;
/* No side effect */
