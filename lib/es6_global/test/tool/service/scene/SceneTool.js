

import * as OptionService$Wonderjs from "../../../../src/service/atom/OptionService.js";
import * as SkyboxSceneMainService$Wonderjs from "../../../../src/service/state/main/scene/SkyboxSceneMainService.js";

function unsafeGetCubemapTexture(state) {
  return OptionService$Wonderjs.unsafeGet(SkyboxSceneMainService$Wonderjs.getCubemapTexture(state));
}

var getCubemapTexture = SkyboxSceneMainService$Wonderjs.getCubemapTexture;

export {
  getCubemapTexture ,
  unsafeGetCubemapTexture ,
  
}
/* OptionService-Wonderjs Not a pure module */
