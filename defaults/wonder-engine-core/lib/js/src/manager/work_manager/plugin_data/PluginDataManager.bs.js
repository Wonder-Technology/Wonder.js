'use strict';

var POContainer$WonderEngineCore = require("../../../data/POContainer.bs.js");

function getIsDebug(param) {
  return POContainer$WonderEngineCore.unsafeGetPO(undefined).pluginData.isDebug;
}

function setIsDebug(isDebug) {
  var po = POContainer$WonderEngineCore.unsafeGetPO(undefined);
  return POContainer$WonderEngineCore.setPO({
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
