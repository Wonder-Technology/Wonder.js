

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";
import * as BufferSourceSizeTextureService$Wonderjs from "../../../../record/main/texture/BufferSourceSizeTextureService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordSourceTextureMainService$Wonderjs from "../RecordSourceTextureMainService.js";
import * as BufferArrayBufferViewSourceTextureService$Wonderjs from "../../../../record/main/texture/BufferArrayBufferViewSourceTextureService.js";
import * as CreateTypeArrayArrayBufferViewSourceTextureService$Wonderjs from "../../../../record/all/texture/arrayBufferView_source/CreateTypeArrayArrayBufferViewSourceTextureService.js";
import * as OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs from "../../../../record/all/texture/arrayBufferView_source/OperateTypeArrayArrayBufferViewSourceTextureService.js";

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
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setWrapS(indexInTypeArray, defaultWrapS, param[0]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setWrapT(indexInTypeArray, defaultWrapT, param[1]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setMagFilter(indexInTypeArray, defaultMagFilter, param[2]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setMinFilter(indexInTypeArray, defaultMinFilter, param[3]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[4]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[5]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setIsNeedUpdate(indexInTypeArray, defaultIsNeedUpdate, param[6]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setFlipY(indexInTypeArray, defaultFlipY, param[7]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setWidth(indexInTypeArray, defaultWidth, param[8]),
                        OperateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.setHeight(indexInTypeArray, defaultHeight, param[9])
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
  var match = CreateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.createTypeArrays(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount);
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
    /* bindTextureUnitCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
    /* wrapSs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), record[/* wrapSs */1]),
    /* wrapTs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), record[/* wrapTs */2]),
    /* magFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), record[/* magFilters */3]),
    /* minFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), record[/* minFilters */4]),
    /* formats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* formats */5]),
    /* types */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* types */6]),
    /* isNeedUpdates */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), record[/* isNeedUpdates */7]),
    /* flipYs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), record[/* flipYs */8]),
    /* widths */CopyTypeArrayService$Wonderjs.copyUint16ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getWidthsSize(/* () */0)), record[/* widths */9]),
    /* heights */CopyTypeArrayService$Wonderjs.copyUint16ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceSizeTextureService$Wonderjs.getHeightsSize(/* () */0)), record[/* heights */10]),
    /* sourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* sourceMap */11]),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.copy(record[/* glTextureMap */12]),
    /* bindTextureUnitCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */record[/* disposedIndexArray */14].slice(),
    /* needAddedSourceArray */record[/* needAddedSourceArray */15].slice(),
    /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */16].slice(),
    /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */17].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */18]),
    /* materialsMap */MutableSparseMapService$WonderCommonlib.copy(record[/* materialsMap */19])
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
