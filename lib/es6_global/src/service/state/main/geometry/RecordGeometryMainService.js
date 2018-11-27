

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as CreateTypeArrayGeometryService$Wonderjs from "../../../record/all/geometry/CreateTypeArrayGeometryService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* geometryRecord */22]);
}

function setAllInfosDataToDefault(geometryCount, param) {
  return /* tuple */[
          param[0].fill(0, 0, Caml_int32.imul(geometryCount, BufferGeometryService$Wonderjs.getInfoSize(/* () */0))),
          param[1].fill(0, 0, Caml_int32.imul(geometryCount, BufferGeometryService$Wonderjs.getInfoSize(/* () */0))),
          param[2].fill(0, 0, Caml_int32.imul(geometryCount, BufferGeometryService$Wonderjs.getInfoSize(/* () */0))),
          param[3].fill(0, 0, Caml_int32.imul(geometryCount, BufferGeometryService$Wonderjs.getInfoSize(/* () */0)))
        ];
}

function _initBufferData(geometryPointCount, geometryCount) {
  var buffer = BufferGeometryService$Wonderjs.createBuffer(geometryPointCount, geometryCount);
  var match = CreateTypeArrayGeometryService$Wonderjs.createTypeArrays(buffer, geometryPointCount, geometryCount);
  return /* tuple */[
          buffer,
          match[0],
          match[1],
          match[2],
          match[3],
          match[4],
          match[5],
          match[6],
          match[7],
          match[8]
        ];
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var geometryPointCount = BufferSettingService$Wonderjs.getGeometryPointCount(settingRecord);
  var geometryCount = BufferSettingService$Wonderjs.getGeometryCount(settingRecord);
  var match = _initBufferData(geometryPointCount, geometryCount);
  state[/* geometryRecord */22] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* vertices */match[1],
    /* texCoords */match[2],
    /* normals */match[3],
    /* indices */match[4],
    /* indices32 */match[5],
    /* verticesInfos */match[6],
    /* texCoordsInfos */match[7],
    /* normalsInfos */match[8],
    /* indicesInfos */match[9],
    /* verticesOffset */0,
    /* texCoordsOffset */0,
    /* normalsOffset */0,
    /* indicesOffset */0,
    /* indices32Offset */0,
    /* disposeCount */0,
    /* indicesTypeMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* gameObjectsMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* nameMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var disposeCount = record[/* disposeCount */16];
  var indicesTypeMap = record[/* indicesTypeMap */17];
  var disposedIndexArray = record[/* disposedIndexArray */19];
  var infosEndIndex = Caml_int32.imul(index, BufferGeometryService$Wonderjs.getInfoSize(/* () */0));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */22] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* vertices */record[/* vertices */2],
    /* texCoords */record[/* texCoords */3],
    /* normals */record[/* normals */4],
    /* indices */record[/* indices */5],
    /* indices32 */record[/* indices32 */6],
    /* verticesInfos */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(infosEndIndex, record[/* verticesInfos */7]),
    /* texCoordsInfos */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(infosEndIndex, record[/* texCoordsInfos */8]),
    /* normalsInfos */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(infosEndIndex, record[/* normalsInfos */9]),
    /* indicesInfos */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(infosEndIndex, record[/* indicesInfos */10]),
    /* verticesOffset */record[/* verticesOffset */11],
    /* texCoordsOffset */record[/* texCoordsOffset */12],
    /* normalsOffset */record[/* normalsOffset */13],
    /* indicesOffset */record[/* indicesOffset */14],
    /* indices32Offset */record[/* indices32Offset */15],
    /* disposeCount */disposeCount,
    /* indicesTypeMap */SparseMapService$Wonderjs.copy(indicesTypeMap),
    /* gameObjectsMap */CopyTypeArrayService$Wonderjs.deepCopyArrayArray(record[/* gameObjectsMap */18]),
    /* disposedIndexArray */disposedIndexArray.slice(),
    /* nameMap */SparseMapService$Wonderjs.copy(record[/* nameMap */20])
  ];
  return newrecord;
}

export {
  getRecord ,
  setAllInfosDataToDefault ,
  _initBufferData ,
  create ,
  deepCopyForRestore ,
  
}
/* OptionService-Wonderjs Not a pure module */
