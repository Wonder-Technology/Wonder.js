

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as SparseMapService$Wonderjs from "../../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BufferBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/BufferBasicMaterialService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as CreateTypeArrayBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/CreateTypeArrayBasicMaterialService.js";
import * as OperateTypeArrayBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/OperateTypeArrayBasicMaterialService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicMaterialRecord */15]);
}

function setAllTypeArrDataToDefault(basicMaterialCount, defaultShaderIndex, defaultColor, param) {
  var defaultUnit = MapUnitService$Wonderjs.getDefaultUnit(/* () */0);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
          return /* tuple */[
                  ShaderIndicesService$Wonderjs.setShaderIndex(index, defaultShaderIndex, param[0]),
                  OperateTypeArrayBasicMaterialService$Wonderjs.setColor(index, defaultColor, param[1]),
                  OperateTypeArrayBasicMaterialService$Wonderjs.setMapUnit(index, defaultUnit, param[2])
                ];
        }), /* tuple */[
        param[0],
        param[1],
        param[3]
      ], ArrayService$WonderCommonlib.range(0, basicMaterialCount - 1 | 0));
  return /* tuple */[
          match[0],
          match[1],
          param[2].fill(0),
          match[2]
        ];
}

function _setAllTypeArrDataToDefault(basicMaterialCount, defaultShaderIndex, defaultColor, param) {
  return /* tuple */[
          param[0],
          setAllTypeArrDataToDefault(basicMaterialCount, defaultShaderIndex, defaultColor, /* tuple */[
                param[1],
                param[2],
                param[3],
                param[4]
              ])
        ];
}

function _initBufferData(basicMaterialCount, textureCountPerMaterial, defaultShaderIndex, defaultColor) {
  var buffer = BufferBasicMaterialService$Wonderjs.createBuffer(basicMaterialCount, textureCountPerMaterial);
  var match = CreateTypeArrayBasicMaterialService$Wonderjs.createTypeArrays(buffer, basicMaterialCount, textureCountPerMaterial);
  return _setAllTypeArrDataToDefault(basicMaterialCount, defaultShaderIndex, defaultColor, /* tuple */[
              buffer,
              match[0],
              match[1],
              match[2],
              match[3]
            ]);
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var defaultShaderIndex = DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
  var defaultColor = /* array */[
    1,
    1,
    1
  ];
  var match = _initBufferData(BufferSettingService$Wonderjs.getBasicMaterialCount(settingRecord), BufferSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord), defaultShaderIndex, defaultColor);
  var match$1 = match[1];
  state[/* basicMaterialRecord */15] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* shaderIndices */match$1[0],
    /* colors */match$1[1],
    /* textureIndices */match$1[2],
    /* mapUnits */match$1[3],
    /* emptyMapUnitArrayMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* defaultColor */defaultColor,
    /* gameObjectsMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* nameMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* materialArrayForWorkerInit */ArrayService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */11];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* shaderIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferBasicMaterialService$Wonderjs.getShaderIndicesSize(/* () */0)), record[/* shaderIndices */2]),
    /* colors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferBasicMaterialService$Wonderjs.getColorsSize(/* () */0)), record[/* colors */3]),
    /* textureIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferMaterialService$Wonderjs.getTextureIndicesSize(BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]))), record[/* textureIndices */4]),
    /* mapUnits */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferBasicMaterialService$Wonderjs.getMapUnitsSize(/* () */0)), record[/* mapUnits */5]),
    /* emptyMapUnitArrayMap */CopyTypeArrayService$Wonderjs.deepCopyArrayArray(record[/* emptyMapUnitArrayMap */6]),
    /* defaultColor */record[/* defaultColor */7],
    /* gameObjectsMap */CopyTypeArrayService$Wonderjs.deepCopyArrayArray(record[/* gameObjectsMap */8]),
    /* disposedIndexArray */record[/* disposedIndexArray */9].slice(),
    /* nameMap */SparseMapService$Wonderjs.copy(record[/* nameMap */10]),
    /* materialArrayForWorkerInit */materialArrayForWorkerInit.slice()
  ];
  return newrecord;
}

export {
  getRecord ,
  setAllTypeArrDataToDefault ,
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  create ,
  deepCopyForRestore ,
  
}
/* OptionService-Wonderjs Not a pure module */
