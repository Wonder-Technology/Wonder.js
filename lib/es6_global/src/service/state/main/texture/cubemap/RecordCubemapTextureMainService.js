

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferSizeTextureService$Wonderjs from "../../../../record/main/texture/BufferSizeTextureService.js";
import * as BufferCubemapTextureService$Wonderjs from "../../../../record/main/texture/cubemap/BufferCubemapTextureService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayAllCubemapTextureService$Wonderjs from "../../../../record/all/texture/cubemap/CreateTypeArrayAllCubemapTextureService.js";
import * as OperateTypeArrayAllCubemapTextureService$Wonderjs from "../../../../record/all/texture/cubemap/OperateTypeArrayAllCubemapTextureService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* cubemapTextureRecord */20]);
}

function setAllTypeArrDataToDefault(cubemapTextureCount, param) {
  var defaultWrapS = BufferCubemapTextureService$Wonderjs.getDefaultWrapS(/* () */0);
  var defaultWrapT = BufferCubemapTextureService$Wonderjs.getDefaultWrapT(/* () */0);
  var defaultMagFilter = BufferCubemapTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
  var defaultMinFilter = BufferCubemapTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
  var defaultFormat = BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var defaultType = BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var defaultIsNeedUpdate = BufferCubemapTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
  var defaultFlipY = BufferCubemapTextureService$Wonderjs.getDefaultFlipY(/* () */0);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, indexInTypeArray) {
                return /* tuple */[
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setWrapS(indexInTypeArray, defaultWrapS, param[0]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setWrapT(indexInTypeArray, defaultWrapT, param[1]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setMagFilter(indexInTypeArray, defaultMagFilter, param[2]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setMinFilter(indexInTypeArray, defaultMinFilter, param[3]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[4]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[5]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[6]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[7]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[8]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[9]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[10]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[11]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[12]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[13]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[14]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[15]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setIsNeedUpdate(indexInTypeArray, defaultIsNeedUpdate, param[16]),
                        OperateTypeArrayAllCubemapTextureService$Wonderjs.setFlipY(indexInTypeArray, defaultFlipY, param[17])
                      ];
              }), /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3],
              param[4],
              param[5],
              param[6],
              param[7],
              param[8],
              param[9],
              param[10],
              param[11],
              param[12],
              param[13],
              param[14],
              param[15],
              param[16],
              param[17]
            ], ArrayService$WonderCommonlib.range(0, cubemapTextureCount - 1 | 0));
}

function _initBufferData(cubemapTextureCount) {
  var buffer = BufferCubemapTextureService$Wonderjs.createBuffer(cubemapTextureCount);
  var match = CreateTypeArrayAllCubemapTextureService$Wonderjs.createTypeArrays(buffer, cubemapTextureCount);
  return /* tuple */[
          buffer,
          setAllTypeArrDataToDefault(cubemapTextureCount, /* tuple */[
                match[0],
                match[1],
                match[2],
                match[3],
                match[4],
                match[5],
                match[6],
                match[7],
                match[8],
                match[9],
                match[10],
                match[11],
                match[12],
                match[13],
                match[14],
                match[15],
                match[16],
                match[17]
              ])
        ];
}

function create(state) {
  var cubemapTextureCount = BufferSettingService$Wonderjs.getCubemapTextureCount(state[/* settingRecord */0]);
  var match = _initBufferData(cubemapTextureCount);
  var match$1 = match[1];
  state[/* cubemapTextureRecord */20] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* wrapSs */match$1[0],
    /* wrapTs */match$1[1],
    /* magFilters */match$1[2],
    /* minFilters */match$1[3],
    /* pxFormats */match$1[4],
    /* nxFormats */match$1[5],
    /* pyFormats */match$1[6],
    /* nyFormats */match$1[7],
    /* pzFormats */match$1[8],
    /* nzFormats */match$1[9],
    /* pxTypes */match$1[10],
    /* nxTypes */match$1[11],
    /* pyTypes */match$1[12],
    /* nyTypes */match$1[13],
    /* pzTypes */match$1[14],
    /* nzTypes */match$1[15],
    /* isNeedUpdates */match$1[16],
    /* flipYs */match$1[17],
    /* pxSourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* nxSourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* pySourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* nySourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* pzSourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* nzSourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedPXSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedNXSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedPYSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedNYSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedPZSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedNZSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needInitedTextureIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needDisposedTextureIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* nameMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* materialsMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* cubemapTextureRecord */20] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* wrapSs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), record[/* wrapSs */2]),
    /* wrapTs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), record[/* wrapTs */3]),
    /* magFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), record[/* magFilters */4]),
    /* minFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), record[/* minFilters */5]),
    /* pxFormats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* pxFormats */6]),
    /* nxFormats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* nxFormats */7]),
    /* pyFormats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* pyFormats */8]),
    /* nyFormats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* nyFormats */9]),
    /* pzFormats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* pzFormats */10]),
    /* nzFormats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* nzFormats */11]),
    /* pxTypes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* pxTypes */12]),
    /* nxTypes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* nxTypes */13]),
    /* pyTypes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* pyTypes */14]),
    /* nyTypes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* nyTypes */15]),
    /* pzTypes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* pzTypes */16]),
    /* nzTypes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* nzTypes */17]),
    /* isNeedUpdates */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), record[/* isNeedUpdates */18]),
    /* flipYs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), record[/* flipYs */19]),
    /* pxSourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* pxSourceMap */20]),
    /* nxSourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nxSourceMap */21]),
    /* pySourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* pySourceMap */22]),
    /* nySourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nySourceMap */23]),
    /* pzSourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* pzSourceMap */24]),
    /* nzSourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nzSourceMap */25]),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.copy(record[/* glTextureMap */26]),
    /* disposedIndexArray */record[/* disposedIndexArray */27].slice(),
    /* needAddedPXSourceArray */record[/* needAddedPXSourceArray */28].slice(),
    /* needAddedNXSourceArray */record[/* needAddedNXSourceArray */29].slice(),
    /* needAddedPYSourceArray */record[/* needAddedPYSourceArray */30].slice(),
    /* needAddedNYSourceArray */record[/* needAddedNYSourceArray */31].slice(),
    /* needAddedPZSourceArray */record[/* needAddedPZSourceArray */32].slice(),
    /* needAddedNZSourceArray */record[/* needAddedNZSourceArray */33].slice(),
    /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */34].slice(),
    /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */35].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */36]),
    /* materialsMap */MutableSparseMapService$WonderCommonlib.copy(record[/* materialsMap */37])
  ];
  return newrecord;
}

export {
  getRecord ,
  setAllTypeArrDataToDefault ,
  _initBufferData ,
  create ,
  deepCopyForRestore ,
  
}
/* OptionService-Wonderjs Not a pure module */
