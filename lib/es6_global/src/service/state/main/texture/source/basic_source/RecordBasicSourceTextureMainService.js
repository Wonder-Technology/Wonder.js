

import * as Caml_array from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferSizeTextureService$Wonderjs from "../../../../../record/main/texture/BufferSizeTextureService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordSourceTextureMainService$Wonderjs from "../RecordSourceTextureMainService.js";
import * as BufferBasicSourceTextureService$Wonderjs from "../../../../../record/main/texture/source/basic_source/BufferBasicSourceTextureService.js";
import * as CreateTypeArrayAllBasicSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/basic_source/CreateTypeArrayAllBasicSourceTextureService.js";
import * as OperateTypeArrayAllBasicSourceTextureService$Wonderjs from "../../../../../record/all/texture/source/basic_source/OperateTypeArrayAllBasicSourceTextureService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicSourceTextureRecord */18]);
}

function setAllTypeArrDataToDefault(basicSourceTextureCount, param) {
  var defaultWrapS = BufferBasicSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0);
  var defaultWrapT = BufferBasicSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0);
  var defaultMagFilter = BufferBasicSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0);
  var defaultMinFilter = BufferBasicSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0);
  var defaultFormat = BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var defaultType = BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0);
  var defaultIsNeedUpdate = BufferBasicSourceTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
  var defaultFlipY = BufferBasicSourceTextureService$Wonderjs.getDefaultFlipY(/* () */0);
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, indexInTypeArray) {
                return /* tuple */[
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setWrapS(indexInTypeArray, defaultWrapS, param[0]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setWrapT(indexInTypeArray, defaultWrapT, param[1]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setMagFilter(indexInTypeArray, defaultMagFilter, param[2]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setMinFilter(indexInTypeArray, defaultMinFilter, param[3]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setFormat(indexInTypeArray, defaultFormat, param[4]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setType(indexInTypeArray, defaultType, param[5]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setIsNeedUpdate(indexInTypeArray, defaultIsNeedUpdate, param[6]),
                        OperateTypeArrayAllBasicSourceTextureService$Wonderjs.setFlipY(indexInTypeArray, defaultFlipY, param[7])
                      ];
              }), /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3],
              param[4],
              param[5],
              param[6],
              param[7]
            ], ArrayService$WonderCommonlib.range(0, basicSourceTextureCount - 1 | 0));
}

function _initBufferData(basicSourceTextureCount, buffer) {
  var match = CreateTypeArrayAllBasicSourceTextureService$Wonderjs.createTypeArrays(buffer, basicSourceTextureCount);
  return setAllTypeArrDataToDefault(basicSourceTextureCount, /* tuple */[
              match[0],
              match[1],
              match[2],
              match[3],
              match[4],
              match[5],
              match[6],
              match[7]
            ]);
}

function create(state) {
  var basicSourceTextureCount = BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]);
  var match = RecordSourceTextureMainService$Wonderjs.getRecord(state);
  var match$1 = _initBufferData(basicSourceTextureCount, match[/* buffer */0]);
  state[/* basicSourceTextureRecord */18] = /* record */[
    /* index */0,
    /* wrapSs */match$1[0],
    /* wrapTs */match$1[1],
    /* magFilters */match$1[2],
    /* minFilters */match$1[3],
    /* formats */match$1[4],
    /* types */match$1[5],
    /* isNeedUpdates */match$1[6],
    /* flipYs */match$1[7],
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
  newrecord[/* basicSourceTextureRecord */18] = /* record */[
    /* index */index,
    /* wrapSs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), record[/* wrapSs */1]),
    /* wrapTs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), record[/* wrapTs */2]),
    /* magFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), record[/* magFilters */3]),
    /* minFilters */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), record[/* minFilters */4]),
    /* formats */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), record[/* formats */5]),
    /* types */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), record[/* types */6]),
    /* isNeedUpdates */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), record[/* isNeedUpdates */7]),
    /* flipYs */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), record[/* flipYs */8]),
    /* sourceMap */MutableSparseMapService$WonderCommonlib.copy(record[/* sourceMap */9]),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.copy(record[/* glTextureMap */10]),
    /* disposedIndexArray */record[/* disposedIndexArray */11].slice(),
    /* needAddedSourceArray */record[/* needAddedSourceArray */12].slice(),
    /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */13].slice(),
    /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */14].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */15]),
    /* materialsMap */MutableSparseMapService$WonderCommonlib.copy(record[/* materialsMap */16])
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
