

import * as Caml_array from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferSizeTextureService$Wonderjs from "../../../../../record/main/texture/BufferSizeTextureService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordSourceTextureMainService$Wonderjs from "../RecordSourceTextureMainService.js";
import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../../../record/main/texture/source/arrayBufferView_source/BufferArrayBufferViewSourceTextureService.js";
import * as BufferArrayBufferViewSourceSizeTextureService$Wonderjs from "../../../../../record/main/texture/source/arrayBufferView_source/BufferArrayBufferViewSourceSizeTextureService.js";
import * as CreateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/arrayBufferView_source/CreateTypeArrayAllArrayBufferViewSourceTextureService.js";
import * as OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/arrayBufferView_source/OperateTypeArrayAllArrayBufferViewSourceTextureService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* arrayBufferViewSourceTextureRecord */19]);
}

function setAllTypeArrDataToDefault(arrayBufferViewSourceTextureCount, arrayBufferViewSourceTextureIndexOffset, param) {
  var defaultWrapS = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
  var defaultWrapT = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
  var defaultMagFilter = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
  var defaultMinFilter = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
  var defaultFormat = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var defaultType = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultType(/* () */0);
  var defaultIsNeedUpdate = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
  var defaultFlipY = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultFlipY(/* () */0);
  var defaultWidth = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultWidth(/* () */0);
  var defaultHeight = BufferArrayBufferViewSourceTextureService$Wonderjs.getDefaultHeight(/* () */0);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, indexInTypeArray) {
                return /* tuple */[
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setWrapS(indexInTypeArray, defaultWrapS, param[0]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setWrapT(indexInTypeArray, defaultWrapT, param[1]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setMagFilter(indexInTypeArray, defaultMagFilter, param[2]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setMinFilter(indexInTypeArray, defaultMinFilter, param[3]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[4]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[5]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setIsNeedUpdate(indexInTypeArray, defaultIsNeedUpdate, param[6]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setFlipY(indexInTypeArray, defaultFlipY, param[7]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setWidth(indexInTypeArray, defaultWidth, param[8]),
                        OperateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.setHeight(indexInTypeArray, defaultHeight, param[9])
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
              param[9]
            ], ArrayService$Wonderjs.range(0, arrayBufferViewSourceTextureCount - 1 | 0));
}

function _initBufferData(basicSourceTextureCount, arrayBufferViewSourceTextureCount, buffer, arrayBufferViewSourceTextureIndexOffset) {
  var match = CreateTypeArrayAllArrayBufferViewSourceTextureService$Wonderjs.createTypeArrays(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount);
  return setAllTypeArrDataToDefault(arrayBufferViewSourceTextureCount, arrayBufferViewSourceTextureIndexOffset, /* tuple */[
              match[0],
              match[1],
              match[2],
              match[3],
              match[4],
              match[5],
              match[6],
              match[7],
              match[8],
              match[9]
            ]);
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var basicSourceTextureCount = BufferSettingService$Wonderjs.getBasicSourceTextureCount(settingRecord);
  var arrayBufferViewSourceTextureCount = BufferSettingService$Wonderjs.getArrayBufferViewSourceTextureCount(settingRecord);
  var match = RecordSourceTextureMainService$Wonderjs.getRecord(state);
  var match$1 = _initBufferData(basicSourceTextureCount, arrayBufferViewSourceTextureCount, match[/* buffer */0], IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state));
  state[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */0,
    /* wrapSs */match$1[0],
    /* wrapTs */match$1[1],
    /* magFilters */match$1[2],
    /* minFilters */match$1[3],
    /* formats */match$1[4],
    /* types */match$1[5],
    /* isNeedUpdates */match$1[6],
    /* flipYs */match$1[7],
    /* widths */match$1[8],
    /* heights */match$1[9],
    /* sourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* needAddedSourceArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
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
  newrecord[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */index,
    /* wrapSs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), record[/* wrapSs */1]),
    /* wrapTs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), record[/* wrapTs */2]),
    /* magFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), record[/* magFilters */3]),
    /* minFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), record[/* minFilters */4]),
    /* formats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* formats */5]),
    /* types */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* types */6]),
    /* isNeedUpdates */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), record[/* isNeedUpdates */7]),
    /* flipYs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), record[/* flipYs */8]),
    /* widths */CopyTypeArrayService$Wonderjs.copyUint16ArrayWithEndIndex(Caml_int32.imul(index, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0)), record[/* widths */9]),
    /* heights */CopyTypeArrayService$Wonderjs.copyUint16ArrayWithEndIndex(Caml_int32.imul(index, BufferArrayBufferViewSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0)), record[/* heights */10]),
    /* sourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* sourceMap */11]),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.copy(record[/* glTextureMap */12]),
    /* disposedIndexArray */record[/* disposedIndexArray */13].slice(),
    /* needAddedSourceArray */record[/* needAddedSourceArray */14].slice(),
    /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */15].slice(),
    /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */16].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */17]),
    /* materialsMap */MutableSparseMapService$WonderCommonlib.copy(record[/* materialsMap */18])
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
/* ArrayService-Wonderjs Not a pure module */
