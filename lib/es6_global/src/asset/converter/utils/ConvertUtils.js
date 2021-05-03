

import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function convertComponentType(componentType) {
  var exit = 0;
  switch (componentType) {
    case 5120 : 
        return /* BYTE */0;
    case 5121 : 
        return /* UNSIGNED_BYTE */1;
    case 5122 : 
        return /* SHORT */2;
    case 5123 : 
        return /* UNSIGNED_SHORT */3;
    case 5124 : 
        exit = 1;
        break;
    case 5125 : 
        return /* UNSIGNED_INT */4;
    case 5126 : 
        return /* FLOAT */5;
    default:
      exit = 1;
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertToAccessors", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
  }
  
}

export {
  convertComponentType ,
  
}
/* Log-WonderLog Not a pure module */
