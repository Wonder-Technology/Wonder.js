

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function setFlipY(gl, flipY, param) {
  var browser = param[/* browser */0];
  if (browser !== 1) {
    if (browser !== 0) {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("setFlipY", "unknown browser", "", "", ""));
    } else {
      return /* () */0;
    }
  } else {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    return /* () */0;
  }
}

export {
  setFlipY ,
  
}
/* Log-WonderLog Not a pure module */
