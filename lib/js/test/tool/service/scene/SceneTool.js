'use strict';

var OptionService$Wonderjs = require("../../../../src/service/atom/OptionService.js");
var SkyboxSceneMainService$Wonderjs = require("../../../../src/service/state/main/scene/SkyboxSceneMainService.js");

function unsafeGetCubemapTexture(state) {
  return OptionService$Wonderjs.unsafeGet(SkyboxSceneMainService$Wonderjs.getCubemapTexture(state));
}

var getCubemapTexture = SkyboxSceneMainService$Wonderjs.getCubemapTexture;

exports.getCubemapTexture = getCubemapTexture;
exports.unsafeGetCubemapTexture = unsafeGetCubemapTexture;
/* OptionService-Wonderjs Not a pure module */
