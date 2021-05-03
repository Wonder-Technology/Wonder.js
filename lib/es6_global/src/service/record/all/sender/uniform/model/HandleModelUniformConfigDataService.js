

import * as Log$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as SendGLSLDataService$Wonderjs from "../../SendGLSLDataService.js";
import * as GetTransformDataGetRenderDataService$Wonderjs from "../../../../../state/render/sub/get_render_data/transform/GetTransformDataGetRenderDataService.js";
import * as HandleUniformRenderObjectModelService$Wonderjs from "../HandleUniformRenderObjectModelService.js";
import * as HandleUniformInstanceNoCachableService$Wonderjs from "../HandleUniformInstanceNoCachableService.js";

function addModelSendData(param, sendDataArrTuple) {
  var type_ = param[3];
  var pos = param[1];
  var field = param[0];
  switch (field) {
    case "instance_mMatrix" : 
        return HandleUniformInstanceNoCachableService$Wonderjs.addUniformSendDataByType(pos, sendDataArrTuple, /* tuple */[
                    GetTransformDataGetRenderDataService$Wonderjs.getLocalToWorldMatrixTypeArray,
                    SendGLSLDataService$Wonderjs.sendMatrix4
                  ]);
    case "instance_normalMatrix" : 
        return HandleUniformInstanceNoCachableService$Wonderjs.addUniformSendDataByType(pos, sendDataArrTuple, /* tuple */[
                    GetTransformDataGetRenderDataService$Wonderjs.getNormalMatrixTypeArray,
                    SendGLSLDataService$Wonderjs.sendMatrix3
                  ]);
    case "mMatrix" : 
        return HandleUniformRenderObjectModelService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    pos,
                    type_
                  ], sendDataArrTuple, GetTransformDataGetRenderDataService$Wonderjs.getLocalToWorldMatrixTypeArray);
    case "normalMatrix" : 
        return HandleUniformRenderObjectModelService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    pos,
                    type_
                  ], sendDataArrTuple, GetTransformDataGetRenderDataService$Wonderjs.getNormalMatrixTypeArray);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addModelSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

export {
  addModelSendData ,
  
}
/* Log-WonderLog Not a pure module */
