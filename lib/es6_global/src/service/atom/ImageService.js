

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function getMimeTypeByExtname(extname) {
  if (extname !== undefined) {
    switch (extname) {
      case ".jpeg" : 
      case ".jpg" : 
          return "image/jpeg";
      case ".png" : 
          return "image/png";
      default:
        return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getMimeTypeByExtname", "unknown image mimeType: " + (String(extname) + ""), "", "", ""));
    }
  } else {
    return "image/png";
  }
}

export {
  getMimeTypeByExtname ,
  
}
/* Log-WonderLog Not a pure module */
