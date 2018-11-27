

import * as Most from "most";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as ImageBitmapRenderWorkerService$Wonderjs from "../ImageBitmapRenderWorkerService.js";
import * as OperateTypeArrayBasicSourceTextureService$Wonderjs from "../../../../record/all/texture/basic_source/OperateTypeArrayBasicSourceTextureService.js";
import * as RecordBasicSourceTextureRenderWorkerService$Wonderjs from "./RecordBasicSourceTextureRenderWorkerService.js";

function _addSource(texture, imageBitmap, state) {
  var match = RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* sourceMap */8]);
  return state;
}

function _getFlipYFunc(texture, state) {
  var match = RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.isFlipY(texture, OptionService$Wonderjs.unsafeGet(match[/* flipYs */7]));
}

function _convertImageArrayBufferDataToImageBitmapStream(imageArrayBufferIndexSizeDataArr, state) {
  return Most.flatMap((function (param) {
                var texture = param[3];
                return Most.map((function (imageBitmap) {
                              return _addSource(texture, imageBitmap, state);
                            }), Most.fromPromise(ImageBitmapRenderWorkerService$Wonderjs.createImageBitmapFromImageData(/* tuple */[
                                    param[0],
                                    param[1],
                                    param[2]
                                  ], (function (param) {
                                      return _getFlipYFunc(texture, param);
                                    }), state)));
              }), Most.from(imageArrayBufferIndexSizeDataArr));
}

var addSourceFromImageDataStream = _convertImageArrayBufferDataToImageBitmapStream;

export {
  _addSource ,
  _getFlipYFunc ,
  _convertImageArrayBufferDataToImageBitmapStream ,
  addSourceFromImageDataStream ,
  
}
/* most Not a pure module */
