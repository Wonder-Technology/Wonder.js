

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function getFormatByMimeType(mimeType) {
  switch (mimeType) {
    case "image/jpeg" : 
        return /* Rgb */0;
    case "image/png" : 
        return /* Rgba */1;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getFormatByMimeType", "unknown mimeType", "", "", "mimeType: " + (String(mimeType) + "")));
  }
}

function getGlFormat(gl, format) {
  switch (format) {
    case 0 : 
        return gl.RGB;
    case 1 : 
        return gl.RGBA;
    case 2 : 
        return gl.ALPHA;
    case 3 : 
        return gl.LUMINANCE;
    case 4 : 
        return gl.LUMINANCE_ALPHA;
    case 5 : 
        return gl.RGB_S3TC_DXT1;
    case 6 : 
        return gl.RGBA_S3TC_DXT1;
    case 7 : 
        return gl.RGBA_S3TC_DXT3;
    case 8 : 
        return gl.RGBA_S3TC_DXT5;
    
  }
}

export {
  getFormatByMimeType ,
  getGlFormat ,
  
}
/* Log-WonderLog Not a pure module */
