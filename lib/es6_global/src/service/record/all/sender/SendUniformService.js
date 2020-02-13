

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as SendGLSLDataService$Wonderjs from "./SendGLSLDataService.js";

function getSendNoCachableDataByType(type_) {
  switch (type_) {
    case "mat3" : 
        return SendGLSLDataService$Wonderjs.sendMatrix3;
    case "mat4" : 
        return SendGLSLDataService$Wonderjs.sendMatrix4;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getSendNoCachableDataByType", "unknown type:" + (String(type_) + ""), "", "", ""));
  }
}

function getSendCachableDataByType(type_) {
  switch (type_) {
    case "float" : 
        return SendGLSLDataService$Wonderjs.sendFloat;
    case "float3" : 
        return SendGLSLDataService$Wonderjs.sendFloat3;
    case "sampler2D" : 
    case "samplerCube" : 
        return SendGLSLDataService$Wonderjs.sendInt;
    case "vec3" : 
        return SendGLSLDataService$Wonderjs.sendVec3;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getSendCachableDataByType", "unknown type:" + (String(type_) + ""), "", "", ""));
  }
}

export {
  getSendNoCachableDataByType ,
  getSendCachableDataByType ,
  
}
/* Log-WonderLog Not a pure module */
