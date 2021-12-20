'use strict';

var POContainer$WonderCore = require("../../../data/POContainer.bs.js");

function getIsDebug(param) {
  return POContainer$WonderCore.unsafeGetPO(undefined).pluginData.isDebug;
}

function setIsDebug(isDebug) {
  var po = POContainer$WonderCore.unsafeGetPO(undefined);
  return POContainer$WonderCore.setPO({
              allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
              states: po.states,
              pluginData: {
                isDebug: isDebug
              },
              componentData: po.componentData,
              gameObjectData: po.gameObjectData,
              usedGameObjectData: po.usedGameObjectData
            });
}

exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
/* No side effect */
