

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function create(param) {
  return /* record */[/* browser : Unknown */4];
}

function fatalUnknownBrowser(title, browser) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage(title, "unknown browser", "", "", "browser: " + (String(browser) + "")));
}

export {
  create ,
  fatalUnknownBrowser ,
  
}
/* Log-WonderLog Not a pure module */
