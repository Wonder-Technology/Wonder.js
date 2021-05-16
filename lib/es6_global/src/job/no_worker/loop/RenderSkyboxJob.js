

import * as RenderSkyboxJobUtils$Wonderjs from "../../utils/RenderSkyboxJobUtils.js";
import * as SkyboxSceneMainService$Wonderjs from "../../../service/state/main/scene/SkyboxSceneMainService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../service/state/main/render/CreateRenderStateMainService.js";

function execJob(flags, mainState) {
  RenderSkyboxJobUtils$Wonderjs.exec(AllDeviceManagerService$Wonderjs.unsafeGetGl(mainState[/* deviceManagerRecord */9]), SkyboxSceneMainService$Wonderjs.getCubemapTexture(mainState), RenderSkyboxJobUtils$Wonderjs.getRenderData(mainState), CreateRenderStateMainService$Wonderjs.createRenderState(mainState));
  return mainState;
}

export {
  execJob ,
  
}
/* RenderSkyboxJobUtils-Wonderjs Not a pure module */
