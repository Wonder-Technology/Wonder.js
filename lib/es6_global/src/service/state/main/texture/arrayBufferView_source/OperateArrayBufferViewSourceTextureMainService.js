

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as WorkerDetectMainService$Wonderjs from "../../workerDetect/WorkerDetectMainService.js";
import * as IndexSourceTextureService$Wonderjs from "../../../../record/all/texture/IndexSourceTextureService.js";
import * as BufferSourceTextureService$Wonderjs from "../../../../record/main/texture/BufferSourceTextureService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./RecordArrayBufferViewSourceTextureMainService.js";
import * as OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs from "../../../../record/all/texture/arrayBufferView_source/OperateTypeArrayArrayBufferViewSourceTextureService.js";

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
        ], match$1[/* needAddedSourceArray */15]);
    return state;
  } else {
    var match$2 = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* sourceMap */11]);
    return state;
  }
}

function getWrapS(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getWrapS(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* wrapSs */1]);
}

function setWrapS(texture, wrapS, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setWrapS(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), wrapS, match[/* wrapSs */1]);
  return state;
}

function getWrapT(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getWrapT(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* wrapTs */2]);
}

function setWrapT(texture, wrapT, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setWrapT(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), wrapT, match[/* wrapTs */2]);
  return state;
}

function getMagFilter(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getMagFilter(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* magFilters */3]);
}

function setMagFilter(texture, filter, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setMagFilter(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), filter, match[/* magFilters */3]);
  return state;
}

function getMinFilter(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getMinFilter(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* minFilters */4]);
}

function setMinFilter(texture, filter, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setMinFilter(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), filter, match[/* minFilters */4]);
  return state;
}

function getFormat(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getFormat(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* formats */5]);
}

function setFormat(texture, format, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setFormat(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), format, match[/* formats */5]);
  return state;
}

function getType(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getType(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* types */6]);
}

function setType(texture, type_, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setType(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), type_, match[/* types */6]);
  return state;
}

function getFlipY(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return BufferSourceTextureService$Wonderjs.getFlipYFromTypeArrayValue(OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getFlipY(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* flipYs */8]));
}

function setFlipY(texture, flipY, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setFlipY(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), BufferSourceTextureService$Wonderjs.getFlipYTypeArrayValue(flipY), match[/* flipYs */8]);
  return state;
}

function getWidth(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getWidth(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* widths */9]);
}

function setWidth(texture, width, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setWidth(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), width, match[/* widths */9]);
  return state;
}

function getHeight(texture, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.getHeight(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), match[/* heights */10]);
}

function setHeight(texture, height, state) {
  var match = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setHeight(IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexInTypeArray(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)), height, match[/* heights */10]);
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
