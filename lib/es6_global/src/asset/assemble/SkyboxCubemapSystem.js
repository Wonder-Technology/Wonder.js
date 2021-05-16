

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as SkyboxSceneMainService$Wonderjs from "../../service/state/main/scene/SkyboxSceneMainService.js";

function getSkyboxCubemap(wd, cubemapTextureArr, state) {
  var scene = wd[/* scene */1];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(scene[/* skybox */3]);
  if (match) {
    return undefined;
  } else {
    var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(scene[/* skybox */3]);
    return ArrayService$Wonderjs.getNth(match$1[/* cubemap */0], cubemapTextureArr);
  }
}

function setSkyboxCubemap(cubemapTextureOpt, state) {
  if (cubemapTextureOpt !== undefined) {
    return SkyboxSceneMainService$Wonderjs.setCubemapTexture(cubemapTextureOpt, state);
  } else {
    return state;
  }
}

export {
  getSkyboxCubemap ,
  setSkyboxCubemap ,
  
}
/* ArrayService-Wonderjs Not a pure module */
