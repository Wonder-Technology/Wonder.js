

import * as CameraTool$Wonderjs from "../../../../../tool/service/camera/CameraTool.js";
import * as InstanceRenderWorkerTool$Wonderjs from "./InstanceRenderWorkerTool.js";
import * as FrontRenderLightHardwareInstanceTool$Wonderjs from "../../../../../tool/render/instance/FrontRenderLightHardwareInstanceTool.js";

function prepare(sandbox, state) {
  InstanceRenderWorkerTool$Wonderjs.setGPUDetectDataAllowHardwareInstance(sandbox);
  var match = FrontRenderLightHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, state);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[1],
          match[2]
        ];
}

export {
  prepare ,
  
}
/* CameraTool-Wonderjs Not a pure module */
