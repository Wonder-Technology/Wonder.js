

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ImageService$Wonderjs from "../../../service/atom/ImageService.js";
import * as FileNameService$Wonderjs from "../../../service/atom/FileNameService.js";
import * as TextureSizeService$Wonderjs from "../../../service/primitive/texture/TextureSizeService.js";

function getWrapData(wrap) {
  switch (wrap) {
    case 0 : 
        return 33071;
    case 1 : 
        return 33648;
    case 2 : 
        return 10497;
    
  }
}

function getFilterData(filter) {
  switch (filter) {
    case 0 : 
        return 9728;
    case 1 : 
        return 9729;
    case 2 : 
        return 9984;
    case 3 : 
        return 9985;
    case 4 : 
        return 9986;
    case 5 : 
        return 9987;
    
  }
}

function _convertImageToBase64 (width,height,mimeType,image){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var dataURL = null;
    canvas.height = width;
    canvas.width = height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL(mimeType);
    };

function convertBase64MimeTypeToWDBMimeType(mimeType) {
  switch (mimeType) {
    case "image/jpeg" : 
    case "image/png" : 
        return mimeType;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("convertBase64MimeTypeToWDBMimeType", "unknown mimeType: " + (String(mimeType) + ""), "", "", ""));
  }
}

function _getImageMimeType(source) {
  return ImageService$Wonderjs.getMimeTypeByExtname(FileNameService$Wonderjs.getFileExtName(source.name));
}

function getImageBase64(source) {
  return _convertImageToBase64(TextureSizeService$Wonderjs.getWidth(source), TextureSizeService$Wonderjs.getHeight(source), ImageService$Wonderjs.getMimeTypeByExtname(FileNameService$Wonderjs.getFileExtName(source.name)), source);
}

export {
  getWrapData ,
  getFilterData ,
  _convertImageToBase64 ,
  convertBase64MimeTypeToWDBMimeType ,
  _getImageMimeType ,
  getImageBase64 ,
  
}
/* Log-WonderLog Not a pure module */
