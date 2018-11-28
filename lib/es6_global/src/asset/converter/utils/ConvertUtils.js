

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function convertComponentType(componentType) {
  var exit = 0;
  var switcher = componentType - 5120 | 0;
  if (switcher > 6 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* BYTE */0;
      case 1 : 
          return /* UNSIGNED_BYTE */1;
      case 2 : 
          return /* SHORT */2;
      case 3 : 
          return /* UNSIGNED_SHORT */3;
      case 4 : 
          exit = 1;
          break;
      case 5 : 
          return /* UNSIGNED_INT */4;
      case 6 : 
          return /* FLOAT */5;
      
    }
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_convertToAccessors", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
  }
  
}

export {
  convertComponentType ,
  
}
/* Log-WonderLog Not a pure module */
