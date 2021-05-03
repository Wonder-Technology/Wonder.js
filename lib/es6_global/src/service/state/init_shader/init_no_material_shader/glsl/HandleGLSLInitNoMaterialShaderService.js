

import * as Log$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function getHandle(name) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getHandle", "unknown handle name: " + (String(name) + ""), "", "", ""));
}

export {
  getHandle ,
  
}
/* Log-WonderLog Not a pure module */
