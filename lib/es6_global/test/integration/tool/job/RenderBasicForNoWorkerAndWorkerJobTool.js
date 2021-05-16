

import * as CameraTool$Wonderjs from "../../../tool/service/camera/CameraTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../tool/job/render_basic/RenderBasicJobTool.js";

function prepareForUseProgramCase(sandbox, state) {
  var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
}

export {
  prepareForUseProgramCase ,
  
}
/* CameraTool-Wonderjs Not a pure module */
