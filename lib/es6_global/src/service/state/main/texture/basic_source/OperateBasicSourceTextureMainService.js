

import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as ImageDataService$Wonderjs from "../../../../primitive/canvas/ImageDataService.js";
import * as TextureSizeService$Wonderjs from "../../../../primitive/texture/TextureSizeService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as WorkerDetectMainService$Wonderjs from "../../workerDetect/WorkerDetectMainService.js";
import * as BufferSourceTextureService$Wonderjs from "../../../../record/main/texture/BufferSourceTextureService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./RecordBasicSourceTextureMainService.js";
import * as OperateTypeArrayBasicSourceTextureService$Wonderjs from "../../../../record/all/texture/basic_source/OperateTypeArrayBasicSourceTextureService.js";

function unsafeGetSource(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* sourceMap */9]);
}

function setSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* sourceMap */9]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedSourceArray */13]);
    return state;
  } else {
    var match$2 = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* sourceMap */9]);
    return state;
  }
}

function convertNeedAddedSourceArrayToImageDataArr(needAddedSourceArray) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (imageDataArr, param) {
                var match = ImageDataService$Wonderjs.convertImageToImageData(param[1]);
                return ArrayService$Wonderjs.push(/* tuple */[
                            match[0],
                            match[1],
                            match[2],
                            param[0]
                          ], imageDataArr);
              }), /* array */[], needAddedSourceArray.filter((function (param) {
                    return param[1] !== undefined;
                  })));
}

function getWrapS(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getWrapS(texture, match[/* wrapSs */1]);
}

function setWrapS(texture, wrapS, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setWrapS(texture, wrapS, match[/* wrapSs */1]);
  return state;
}

function getWrapT(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getWrapT(texture, match[/* wrapTs */2]);
}

function setWrapT(texture, wrapT, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setWrapT(texture, wrapT, match[/* wrapTs */2]);
  return state;
}

function getMagFilter(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getMagFilter(texture, match[/* magFilters */3]);
}

function setMagFilter(texture, filter, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setMagFilter(texture, filter, match[/* magFilters */3]);
  return state;
}

function getMinFilter(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getMinFilter(texture, match[/* minFilters */4]);
}

function setMinFilter(texture, filter, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setMinFilter(texture, filter, match[/* minFilters */4]);
  return state;
}

function getFormat(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getFormat(texture, match[/* formats */5]);
}

function setFormat(texture, format, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setFormat(texture, format, match[/* formats */5]);
  return state;
}

function getType(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getType(texture, match[/* types */6]);
}

function setType(texture, filter, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setType(texture, filter, match[/* types */6]);
  return state;
}

function getFlipY(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return BufferSourceTextureService$Wonderjs.getFlipYFromTypeArrayValue(OperateTypeArrayBasicSourceTextureService$Wonderjs.getFlipY(texture, match[/* flipYs */8]));
}

function setFlipY(texture, flipY, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setFlipY(texture, BufferSourceTextureService$Wonderjs.getFlipYTypeArrayValue(flipY), match[/* flipYs */8]);
  return state;
}

function getWidth(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var match$1 = TextureSourceMapService$Wonderjs.getSource(texture, match[/* sourceMap */9]);
  if (match$1 !== undefined) {
    return TextureSizeService$Wonderjs.getWidth(Caml_option.valFromOption(match$1));
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getWidth", "source should exist", "", "", ""));
  }
}

function getHeight(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var match$1 = TextureSourceMapService$Wonderjs.getSource(texture, match[/* sourceMap */9]);
  if (match$1 !== undefined) {
    return TextureSizeService$Wonderjs.getHeight(Caml_option.valFromOption(match$1));
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getHeight", "source should exist", "", "", ""));
  }
}

function getIsNeedUpdate(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayBasicSourceTextureService$Wonderjs.getIsNeedUpdate(texture, match[/* isNeedUpdates */7]);
}

function setIsNeedUpdate(texture, isNeedUpdate, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayBasicSourceTextureService$Wonderjs.setIsNeedUpdate(texture, isNeedUpdate, match[/* isNeedUpdates */7]);
  return state;
}

export {
  unsafeGetSource ,
  setSource ,
  convertNeedAddedSourceArrayToImageDataArr ,
  getWrapS ,
  setWrapS ,
  getWrapT ,
  setWrapT ,
  getMagFilter ,
  setMagFilter ,
  getMinFilter ,
  setMinFilter ,
  getFormat ,
  setFormat ,
  getType ,
  setType ,
  getFlipY ,
  setFlipY ,
  getWidth ,
  getHeight ,
  getIsNeedUpdate ,
  setIsNeedUpdate ,
  
}
/* Log-WonderLog Not a pure module */
