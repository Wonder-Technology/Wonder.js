

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as BufferAllBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/BufferAllBasicMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayAllBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/CreateTypeArrayAllBasicMaterialService.js";
import * as OperateTypeArrayAllBasicMaterialService$Wonderjs from "../../../../record/all/material/basic/OperateTypeArrayAllBasicMaterialService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* basicMaterialRecord */15]);
}

function setAllTypeArrDataToDefault(basicMaterialCount, defaultShaderIndex, defaultColor, param) {
  var defaultIsDepthTest = BufferMaterialService$Wonderjs.getDefaultIsDepthTest(/* () */0);
  var defaultAlpha = BufferAllBasicMaterialService$Wonderjs.getDefaultAlpha(/* () */0);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
          return /* tuple */[
                  ShaderIndicesService$Wonderjs.setShaderIndex(index, defaultShaderIndex, param[0]),
                  OperateTypeArrayAllBasicMaterialService$Wonderjs.setColor(index, defaultColor, param[1]),
                  OperateTypeArrayAllBasicMaterialService$Wonderjs.setIsDepthTest(index, defaultIsDepthTest, param[2]),
                  OperateTypeArrayAllBasicMaterialService$Wonderjs.setAlpha(index, defaultAlpha, param[3])
                ];
        }), /* tuple */[
        param[0],
        param[1],
        param[2],
        param[3]
      ], ArrayService$WonderCommonlib.range(0, basicMaterialCount - 1 | 0));
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3]
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

function _initBufferData(basicMaterialCount, defaultShaderIndex, defaultColor) {
  var buffer = BufferAllBasicMaterialService$Wonderjs.createBuffer(basicMaterialCount);
  var match = CreateTypeArrayAllBasicMaterialService$Wonderjs.createTypeArrays(buffer, basicMaterialCount);
  return _setAllTypeArrDataToDefault(basicMaterialCount, defaultShaderIndex, defaultColor, /* tuple */[
              buffer,
              match[0],
              match[1],
              match[2],
              match[3]
            ]);
}

function create(state) {
  var defaultShaderIndex = DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
  var defaultColor = /* array */[
    1,
    1,
    1
  ];
  var match = _initBufferData(BufferSettingService$Wonderjs.getBasicMaterialCount(state[/* settingRecord */0]), defaultShaderIndex, defaultColor);
  var match$1 = match[1];
  state[/* basicMaterialRecord */15] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* shaderIndices */match$1[0],
    /* colors */match$1[1],
    /* isDepthTests */match$1[2],
    /* alphas */match$1[3],
    /* defaultColor */defaultColor,
    /* gameObjectsMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* nameMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* materialArrayForWorkerInit */ArrayService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */10];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* shaderIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllBasicMaterialService$Wonderjs.getShaderIndicesSize(/* () */0)), record[/* shaderIndices */2]),
    /* colors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllBasicMaterialService$Wonderjs.getColorsSize(/* () */0)), record[/* colors */3]),
    /* isDepthTests */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferAllBasicMaterialService$Wonderjs.getIsDepthTestsSize(/* () */0)), record[/* isDepthTests */4]),
    /* alphas */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllBasicMaterialService$Wonderjs.getAlphasSize(/* () */0)), record[/* alphas */5]),
    /* defaultColor */record[/* defaultColor */6],
    /* gameObjectsMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfArray(record[/* gameObjectsMap */7]),
    /* disposedIndexArray */record[/* disposedIndexArray */8].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */9]),
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
