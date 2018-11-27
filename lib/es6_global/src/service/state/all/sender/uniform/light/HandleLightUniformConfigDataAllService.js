

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as SendPointLightUniformRenderService$Wonderjs from "../../../../render/sender/uniform/light/SendPointLightUniformRenderService.js";
import * as SendAmbientLightUniformRenderService$Wonderjs from "../../../../render/sender/uniform/light/SendAmbientLightUniformRenderService.js";
import * as SendDirectionLightUniformRenderService$Wonderjs from "../../../../render/sender/uniform/light/SendDirectionLightUniformRenderService.js";
import * as HandleUniformShaderCachableFunctionService$Wonderjs from "../../../../../record/render/sender/uniform/HandleUniformShaderCachableFunctionService.js";

function addAmbientLightSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "send") {
    return HandleUniformShaderCachableFunctionService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[2],
                param[3]
              ], sendDataArrTuple, SendAmbientLightUniformRenderService$Wonderjs.send);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addAmbientLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function addDirectionLightSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "send") {
    return HandleUniformShaderCachableFunctionService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[2],
                param[3]
              ], sendDataArrTuple, SendDirectionLightUniformRenderService$Wonderjs.send);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addDirectionLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

function addPointLightSendData(param, sendDataArrTuple) {
  var field = param[0];
  if (field === "send") {
    return HandleUniformShaderCachableFunctionService$Wonderjs.addUniformSendDataByType(/* tuple */[
                param[1],
                param[2],
                param[3]
              ], sendDataArrTuple, SendPointLightUniformRenderService$Wonderjs.send);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_addPointLightSendData", "unknow field:" + (String(field) + ""), "", "", ""));
  }
}

export {
  addAmbientLightSendData ,
  addDirectionLightSendData ,
  addPointLightSendData ,
  
}
/* Log-WonderLog Not a pure module */
