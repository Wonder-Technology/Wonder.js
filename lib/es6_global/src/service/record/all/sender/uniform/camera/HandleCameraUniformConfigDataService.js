

import * as Log$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as HandleUniformShaderCachableService$Wonderjs from "../HandleUniformShaderCachableService.js";
import * as GetCameraDataGetRenderDataSubService$Wonderjs from "../../../../../state/render/sub/get_render_data/camera/GetCameraDataGetRenderDataSubService.js";
import * as HandleUniformShaderNoCachableService$Wonderjs from "../HandleUniformShaderNoCachableService.js";

function addCameraSendData(param, sendDataArrTuple) {
  var type_ = param[3];
  var pos = param[1];
  var field = param[0];
  switch (field) {
    case "pMatrix" : 
        return HandleUniformShaderNoCachableService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    type_,
                    pos
                  ], sendDataArrTuple, GetCameraDataGetRenderDataSubService$Wonderjs.getCameraPMatrixData);
    case "position" : 
        return HandleUniformShaderCachableService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    param[4],
                    param[2],
                    pos,
                    type_
                  ], sendDataArrTuple, GetCameraDataGetRenderDataSubService$Wonderjs.getCameraPositionData);
    case "vMatrix" : 
        return HandleUniformShaderNoCachableService$Wonderjs.addUniformSendDataByType(/* tuple */[
                    type_,
                    pos
                  ], sendDataArrTuple, GetCameraDataGetRenderDataSubService$Wonderjs.getCameraVMatrixData);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addCameraSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

export {
  addCameraSendData ,
  
}
/* Log-WonderLog Not a pure module */
