

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as GetTransformDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/transform/GetTransformDataGetRenderDataService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../HandleUniformRenderObjectModelService.js";
import * as GetOutlineDataTransformDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/no_material_shader/outline/GetOutlineDataTransformDataGetRenderDataService.js";

function addModelSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "mMatrix") {
    return HandleUniformRenderObjectModelService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[3]
              ], sendDataArrTuple, GetTransformDataGetRenderDataService$Wonderjs.getLocalToWorldMatrixTypeArray);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addModelSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function addExpandModelSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "mMatrix") {
    return HandleUniformRenderObjectModelService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[3]
              ], sendDataArrTuple, GetOutlineDataTransformDataGetRenderDataService$Wonderjs.getScaledLocalToWorldMatrixTypeArray);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addModelSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

export {
  addModelSendData ,
  addExpandModelSendData ,
  
}
/* Log-WonderLog Not a pure module */
