

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DefineLightCountInitLightMaterialService$Wonderjs from "./DefineLightCountInitLightMaterialService.js";

function getHandle(recordTuple, name) {
  if (name === "defineLightCount") {
    return DefineLightCountInitLightMaterialService$Wonderjs.execHandle(recordTuple);
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getHandle", "unknown handle name: " + (String(name) + ""), "", "", ""));
  }
}

export {
  getHandle ,
  
}
/* Log-WonderLog Not a pure module */
