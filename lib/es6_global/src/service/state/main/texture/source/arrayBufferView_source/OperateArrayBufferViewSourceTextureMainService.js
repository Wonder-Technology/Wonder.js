

import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as BufferTextureService$Wonderjs from "../../../../../record/main/texture/BufferTextureService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../../primitive/texture/TextureSourceMapService.js";
import * as WorkerDetectMainService$Wonderjs from "../../../workerDetect/WorkerDetectMainService.js";
import * as IndexAllSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/IndexAllSourceTextureService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./RecordArrayBufferViewSourceTextureMainService.js";
import * as OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/arrayBufferView_source/OperateTypeArrayAllArrayBufferViewSourceTextureService.js";

function unsafeGetSource(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* sourceMap */11]);
}

function setSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* sourceMap */11]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedSourceArray */14]);
    return state;
  } else {
    var match$2 = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* sourceMap */11]);
    return state;
  }
}

function getWrapS(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getWrapS(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* wrapSs */1]);
}

function setWrapS(texture, wrapS, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setWrapS(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), wrapS, match[/* wrapSs */1]);
  return state;
}

function getWrapT(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getWrapT(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* wrapTs */2]);
}

function setWrapT(texture, wrapT, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setWrapT(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), wrapT, match[/* wrapTs */2]);
  return state;
}

function getMagFilter(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getMagFilter(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* magFilters */3]);
}

function setMagFilter(texture, filter, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setMagFilter(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), filter, match[/* magFilters */3]);
  return state;
}

function getMinFilter(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getMinFilter(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* minFilters */4]);
}

function setMinFilter(texture, filter, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setMinFilter(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), filter, match[/* minFilters */4]);
  return state;
}

function getFormat(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getFormat(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* formats */5]);
}

function setFormat(texture, format, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setFormat(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), format, match[/* formats */5]);
  return state;
}

function getType(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getType(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* types */6]);
}

function setType(texture, type_, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setType(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), type_, match[/* types */6]);
  return state;
}

function getFlipY(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return BufferTextureService$Wonderjs.getFlipYFromTypeArrayValue(OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getFlipY(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* flipYs */8]));
}

function setFlipY(texture, flipY, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setFlipY(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), BufferTextureService$Wonderjs.getFlipYTypeArrayValue(flipY), match[/* flipYs */8]);
  return state;
}

function getWidth(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getWidth(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* widths */9]);
}

function setWidth(texture, width, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setWidth(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), width, match[/* widths */9]);
  return state;
}

function getHeight(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.getHeight(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* heights */10]);
}

function setHeight(texture, height, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setHeight(IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), height, match[/* heights */10]);
  return state;
}

export {
  unsafeGetSource ,
  setSource ,
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
  setWidth ,
  getHeight ,
  setHeight ,
  
}
/* ArrayService-Wonderjs Not a pure module */
