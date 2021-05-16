

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as BufferTextureService$Wonderjs from "../../../../record/main/texture/BufferTextureService.js";
import * as TextureSourceMapService$Wonderjs from "../../../../primitive/texture/TextureSourceMapService.js";
import * as WorkerDetectMainService$Wonderjs from "../../workerDetect/WorkerDetectMainService.js";
import * as OperateTextureMainService$Wonderjs from "../OperateTextureMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "./RecordCubemapTextureMainService.js";
import * as OperateTypeArrayAllCubemapTextureService$Wonderjs from "../../../../record/all/texture/cubemap/OperateTypeArrayAllCubemapTextureService.js";

function unsafeGetPXSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* pxSourceMap */20]);
}

function unsafeGetNXSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* nxSourceMap */21]);
}

function unsafeGetPYSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* pySourceMap */22]);
}

function unsafeGetNYSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* nySourceMap */23]);
}

function unsafeGetPZSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* pzSourceMap */24]);
}

function unsafeGetNZSource(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, match[/* nzSourceMap */25]);
}

function setPXSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* pxSourceMap */20]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedPXSourceArray */28]);
    return state;
  } else {
    var match$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* pxSourceMap */20]);
    return state;
  }
}

function setNXSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* nxSourceMap */21]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedNXSourceArray */29]);
    return state;
  } else {
    var match$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* nxSourceMap */21]);
    return state;
  }
}

function setPYSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* pySourceMap */22]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedPYSourceArray */30]);
    return state;
  } else {
    var match$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* pySourceMap */22]);
    return state;
  }
}

function setNYSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* nySourceMap */23]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedNYSourceArray */31]);
    return state;
  } else {
    var match$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* nySourceMap */23]);
    return state;
  }
}

function setPZSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* pzSourceMap */24]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedPZSourceArray */32]);
    return state;
  } else {
    var match$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* pzSourceMap */24]);
    return state;
  }
}

function setNZSource(texture, source, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    var match$1 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$1[/* nzSourceMap */25]);
    ArrayService$Wonderjs.push(/* tuple */[
          texture,
          source
        ], match$1[/* needAddedNZSourceArray */33]);
    return state;
  } else {
    var match$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
    TextureSourceMapService$Wonderjs.setSource(texture, source, match$2[/* nzSourceMap */25]);
    return state;
  }
}

function getWrapS(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getWrapS(texture, match[/* wrapSs */2]);
}

function setWrapS(texture, wrapS, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setWrapS(texture, wrapS, match[/* wrapSs */2]);
  return state;
}

function getWrapT(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getWrapT(texture, match[/* wrapTs */3]);
}

function setWrapT(texture, wrapT, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setWrapT(texture, wrapT, match[/* wrapTs */3]);
  return state;
}

function getMagFilter(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getMagFilter(texture, match[/* magFilters */4]);
}

function setMagFilter(texture, filter, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setMagFilter(texture, filter, match[/* magFilters */4]);
  return state;
}

function getMinFilter(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getMinFilter(texture, match[/* minFilters */5]);
}

function setMinFilter(texture, filter, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setMinFilter(texture, filter, match[/* minFilters */5]);
  return state;
}

function getPXFormat(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, match[/* pxFormats */6]);
}

function setPXFormat(texture, format, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(texture, format, match[/* pxFormats */6]);
  return state;
}

function getNXFormat(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, match[/* nxFormats */7]);
}

function setNXFormat(texture, format, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(texture, format, match[/* nxFormats */7]);
  return state;
}

function getPYFormat(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, match[/* pyFormats */8]);
}

function setPYFormat(texture, format, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(texture, format, match[/* pyFormats */8]);
  return state;
}

function getNYFormat(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, match[/* nyFormats */9]);
}

function setNYFormat(texture, format, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(texture, format, match[/* nyFormats */9]);
  return state;
}

function getPZFormat(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, match[/* pzFormats */10]);
}

function setPZFormat(texture, format, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(texture, format, match[/* pzFormats */10]);
  return state;
}

function getNZFormat(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getFormat(texture, match[/* nzFormats */11]);
}

function setNZFormat(texture, format, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(texture, format, match[/* nzFormats */11]);
  return state;
}

function getPXType(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, match[/* pxTypes */12]);
}

function setPXType(texture, type_, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(texture, type_, match[/* pxTypes */12]);
  return state;
}

function getNXType(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, match[/* nxTypes */13]);
}

function setNXType(texture, type_, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(texture, type_, match[/* nxTypes */13]);
  return state;
}

function getPYType(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, match[/* pyTypes */14]);
}

function setPYType(texture, type_, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(texture, type_, match[/* pyTypes */14]);
  return state;
}

function getNYType(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, match[/* nyTypes */15]);
}

function setNYType(texture, type_, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(texture, type_, match[/* nyTypes */15]);
  return state;
}

function getPZType(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, match[/* pzTypes */16]);
}

function setPZType(texture, type_, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(texture, type_, match[/* pzTypes */16]);
  return state;
}

function getNZType(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getType(texture, match[/* nzTypes */17]);
}

function setNZType(texture, type_, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(texture, type_, match[/* nzTypes */17]);
  return state;
}

function getFlipY(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return BufferTextureService$Wonderjs.getFlipYFromTypeArrayValue(OperateTypeArrayAllCubemapTextureService$Wonderjs.getFlipY(texture, match[/* flipYs */19]));
}

function setFlipY(texture, flipY, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setFlipY(texture, BufferTextureService$Wonderjs.getFlipYTypeArrayValue(flipY), match[/* flipYs */19]);
  return state;
}

function getIsNeedUpdate(texture, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  return OperateTypeArrayAllCubemapTextureService$Wonderjs.getIsNeedUpdate(texture, match[/* isNeedUpdates */18]);
}

function setIsNeedUpdate(texture, isNeedUpdate, state) {
  var match = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  OperateTypeArrayAllCubemapTextureService$Wonderjs.setIsNeedUpdate(texture, isNeedUpdate, match[/* isNeedUpdates */18]);
  return state;
}

function clearNeedAddedSourceArr(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(RecordCubemapTextureMainService$Wonderjs.getRecord(state));
  newrecord[/* cubemapTextureRecord */20] = (newrecord$1[/* needAddedPXSourceArray */28] = /* array */[], newrecord$1[/* needAddedNXSourceArray */29] = /* array */[], newrecord$1[/* needAddedPYSourceArray */30] = /* array */[], newrecord$1[/* needAddedNYSourceArray */31] = /* array */[], newrecord$1[/* needAddedPZSourceArray */32] = /* array */[], newrecord$1[/* needAddedNZSourceArray */33] = /* array */[], newrecord$1);
  return newrecord;
}

var convertNeedAddedSourceArrayToImageDataArr = OperateTextureMainService$Wonderjs.convertNeedAddedSourceArrayToImageDataArr;

export {
  unsafeGetPXSource ,
  unsafeGetNXSource ,
  unsafeGetPYSource ,
  unsafeGetNYSource ,
  unsafeGetPZSource ,
  unsafeGetNZSource ,
  setPXSource ,
  setNXSource ,
  setPYSource ,
  setNYSource ,
  setPZSource ,
  setNZSource ,
  convertNeedAddedSourceArrayToImageDataArr ,
  getWrapS ,
  setWrapS ,
  getWrapT ,
  setWrapT ,
  getMagFilter ,
  setMagFilter ,
  getMinFilter ,
  setMinFilter ,
  getPXFormat ,
  setPXFormat ,
  getNXFormat ,
  setNXFormat ,
  getPYFormat ,
  setPYFormat ,
  getNYFormat ,
  setNYFormat ,
  getPZFormat ,
  setPZFormat ,
  getNZFormat ,
  setNZFormat ,
  getPXType ,
  setPXType ,
  getNXType ,
  setNXType ,
  getPYType ,
  setPYType ,
  getNYType ,
  setNYType ,
  getPZType ,
  setPZType ,
  getNZType ,
  setNZType ,
  getFlipY ,
  setFlipY ,
  getIsNeedUpdate ,
  setIsNeedUpdate ,
  clearNeedAddedSourceArr ,
  
}
/* ArrayService-Wonderjs Not a pure module */
