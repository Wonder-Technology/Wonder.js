

import * as Caml_option from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as TextureSizeService$Wonderjs from "../../../../../primitive/texture/TextureSizeService.js";
import * as BufferTextureService$Wonderjs from "../../../../../record/main/texture/BufferTextureService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../../primitive/texture/TextureSourceMapService.js";
import * as WorkerDetectMainService$Wonderjs from "../../../workerDetect/WorkerDetectMainService.js";
import * as OperateTextureMainService$Wonderjs from "../../OperateTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./RecordBasicSourceTextureMainService.js";
import * as OperateTypeArrayAllBasicSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/basic_source/OperateTypeArrayAllBasicSourceTextureService.js";

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
        ], match$1[/* needAddedSourceArray */12]);
    return state;
  } else {
    var match$2 = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* sourceMap */9]);
    return state;
  }
}

function getWrapS(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getWrapS(texture, match[/* wrapSs */1]);
}

function setWrapS(texture, wrapS, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setWrapS(texture, wrapS, match[/* wrapSs */1]);
  return state;
}

function getWrapT(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getWrapT(texture, match[/* wrapTs */2]);
}

function setWrapT(texture, wrapT, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setWrapT(texture, wrapT, match[/* wrapTs */2]);
  return state;
}

function getMagFilter(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getMagFilter(texture, match[/* magFilters */3]);
}

function setMagFilter(texture, filter, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setMagFilter(texture, filter, match[/* magFilters */3]);
  return state;
}

function getMinFilter(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getMinFilter(texture, match[/* minFilters */4]);
}

function setMinFilter(texture, filter, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setMinFilter(texture, filter, match[/* minFilters */4]);
  return state;
}

function getFormat(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getFormat(texture, match[/* formats */5]);
}

function setFormat(texture, format, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setFormat(texture, format, match[/* formats */5]);
  return state;
}

function getType(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getType(texture, match[/* types */6]);
}

function setType(texture, filter, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setType(texture, filter, match[/* types */6]);
  return state;
}

function getFlipY(texture, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  return BufferTextureService$Wonderjs.getFlipYFromTypeArrayValue(OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getFlipY(texture, match[/* flipYs */8]));
}

function setFlipY(texture, flipY, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setFlipY(texture, BufferTextureService$Wonderjs.getFlipYTypeArrayValue(flipY), match[/* flipYs */8]);
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
  return OperateTypeArrayAllBasicSourceTextureService$Wonderjs.getIsNeedUpdate(texture, match[/* isNeedUpdates */7]);
}

function setIsNeedUpdate(texture, isNeedUpdate, state) {
  var match = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setIsNeedUpdate(texture, isNeedUpdate, match[/* isNeedUpdates */7]);
  return state;
}

var convertNeedAddedSourceArrayToImageDataArr = OperateTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr;

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
