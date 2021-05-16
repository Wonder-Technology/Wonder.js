

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RecordAllBrowserDetectService$Wonderjs from "../../../record/all/browserDetect/RecordAllBrowserDetectService.js";
import * as RecordBrowserDetectRenderWorkerService$Wonderjs from "../browserDetect/RecordBrowserDetectRenderWorkerService.js";

function _createImageBitmapForChrome (imageData,config){
        return createImageBitmap(imageData, config)
    };

function _createImageBitmapForFirefox (imageData){
        return createImageBitmap(imageData)
    };

function createImageBitmapFromImageData(param, getFlipYFunc, state) {
  var imageData = new ImageData(new Uint8ClampedArray(param[0]), param[1], param[2]);
  var match = RecordBrowserDetectRenderWorkerService$Wonderjs.getRecord(state);
  var browser = match[/* browser */0];
  if (browser !== 1) {
    if (browser !== 0) {
      return RecordAllBrowserDetectService$Wonderjs.fatalUnknownBrowser("_createImageBitmap", browser);
    } else {
      var match$1 = Curry._1(getFlipYFunc, state) === true;
      return _createImageBitmapForChrome(imageData, {
                  imageOrientation: match$1 ? "flipY" : "none"
                });
    }
  } else {
    return _createImageBitmapForFirefox(imageData);
  }
}

export {
  _createImageBitmapForChrome ,
  _createImageBitmapForFirefox ,
  createImageBitmapFromImageData ,
  
}
/* RecordAllBrowserDetectService-Wonderjs Not a pure module */
