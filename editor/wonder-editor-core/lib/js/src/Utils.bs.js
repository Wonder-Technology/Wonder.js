'use strict';

var UI$WonderEditorCore = require("./UI.bs.js");
var EventManager$WonderEditorCore = require("./EventManager.bs.js");

function buildAPI(param) {
  return {
          ui: UI$WonderEditorCore.buildAPI(undefined),
          eventManager: EventManager$WonderEditorCore.buildAPI(undefined)
        };
}

exports.buildAPI = buildAPI;
/* No side effect */
