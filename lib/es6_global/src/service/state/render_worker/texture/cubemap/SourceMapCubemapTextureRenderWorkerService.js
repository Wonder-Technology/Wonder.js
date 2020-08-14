

import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as ImageBitmapRenderWorkerService$Wonderjs from "../ImageBitmapRenderWorkerService.js";
import * as RecordCubemapTextureRenderWorkerService$Wonderjs from "./RecordCubemapTextureRenderWorkerService.js";
import * as OperateTypeArrayAllCubemapTextureService$Wonderjs from "../../../../record/all/texture/cubemap/OperateTypeArrayAllCubemapTextureService.js";

function _addPXSource(texture, imageBitmap, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* pxSourceMap */18]);
  return state;
}

function _addNXSource(texture, imageBitmap, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* nxSourceMap */19]);
  return state;
}

function _addPYSource(texture, imageBitmap, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* pySourceMap */20]);
  return state;
}

function _addNYSource(texture, imageBitmap, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* nySourceMap */21]);
  return state;
}

function _addPZSource(texture, imageBitmap, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* pzSourceMap */22]);
  return state;
}

function _addNZSource(texture, imageBitmap, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  TextureSourceMapService$Wonderjs.addSource(texture, imageBitmap, match[/* nzSourceMap */23]);
  return state;
}

function _getFlipYFunc(texture, state) {
  var match = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.isFlipY(texture, OptionService$Wonderjs.unsafeGet(match[/* flipYs */17]));
}

function _convertImageArrayBufferDataToImageBitmapStream(imageArrayBufferIndexSizeDataArr, addSourceFunc, state) {
  return Most.flatMap((function (param) {
                var texture = param[3];
                return Most.map((function (imageBitmap) {
                              return Curry._3(addSourceFunc, texture, imageBitmap, state);
                            }), Most.fromPromise(ImageBitmapRenderWorkerService$Wonderjs.createImageBitmapFromImageData(/* tuple */[
                                    param[0],
                                    param[1],
                                    param[2]
                                  ], (function (param) {
                                      return _getFlipYFunc(texture, param);
                                    }), state)));
              }), Most.from(imageArrayBufferIndexSizeDataArr));
}

function _convertAllImageArrayBufferDataToImageBitmapStream(param, state) {
  return Most.mergeArray(/* array */[
              _convertImageArrayBufferDataToImageBitmapStream(param[0], _addPXSource, state),
              _convertImageArrayBufferDataToImageBitmapStream(param[1], _addNXSource, state),
              _convertImageArrayBufferDataToImageBitmapStream(param[2], _addPYSource, state),
              _convertImageArrayBufferDataToImageBitmapStream(param[3], _addNYSource, state),
              _convertImageArrayBufferDataToImageBitmapStream(param[4], _addPZSource, state),
              _convertImageArrayBufferDataToImageBitmapStream(param[5], _addNZSource, state)
            ]);
}

var addSourceFromImageDataStream = _convertAllImageArrayBufferDataToImageBitmapStream;

export {
  _addPXSource ,
  _addNXSource ,
  _addPYSource ,
  _addNYSource ,
  _addPZSource ,
  _addNZSource ,
  _getFlipYFunc ,
  _convertImageArrayBufferDataToImageBitmapStream ,
  _convertAllImageArrayBufferDataToImageBitmapStream ,
  addSourceFromImageDataStream ,
  
}
/* most Not a pure module */
