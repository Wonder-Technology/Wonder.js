

import * as DirectorTool$Wonderjs from "../../../core/DirectorTool.js";
import * as PregetGLSLDataTool$Wonderjs from "../loop/PregetGLSLDataTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../service/noWorkerJob/NoWorkerJobConfigTool.js";

function exec(state) {
  return DirectorTool$Wonderjs.init(DirectorTool$Wonderjs.prepare(PregetGLSLDataTool$Wonderjs.preparePrecision(state)));
}

function buildNoWorkerJobConfig(param) {
  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitPipelineConfigWithoutInitMain(/* () */0), undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), undefined, /* () */0);
}

export {
  exec ,
  buildNoWorkerJobConfig ,
  
}
/* DirectorTool-Wonderjs Not a pure module */
