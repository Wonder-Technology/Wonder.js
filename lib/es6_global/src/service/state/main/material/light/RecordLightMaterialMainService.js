

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as MapUnitService$Wonderjs from "../../../../primitive/material/MapUnitService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as BufferLightMaterialService$Wonderjs from "../../../../record/all/material/light/BufferLightMaterialService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayLightMaterialService$Wonderjs from "../../../../record/all/material/light/CreateTypeArrayLightMaterialService.js";
import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../../../record/all/material/light/OperateTypeArrayLightMaterialService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* lightMaterialRecord */16]);
}

function setAllTypeArrDataToDefault(lightMaterialCount, param, param$1) {
  var defaultShininess = param[3];
  var defaultSpecularColor = param[2];
  var defaultDiffuseColor = param[1];
  var defaultShaderIndex = param[0];
  var defaultUnit = MapUnitService$Wonderjs.getDefaultUnit(/* () */0);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
          return /* tuple */[
                  ShaderIndicesService$Wonderjs.setShaderIndex(index, defaultShaderIndex, param[0]),
                  OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseColor(index, defaultDiffuseColor, param[1]),
                  OperateTypeArrayLightMaterialService$Wonderjs.setSpecularColor(index, defaultSpecularColor, param[2]),
                  OperateTypeArrayLightMaterialService$Wonderjs.setShininess(index, defaultShininess, param[3]),
                  OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit(index, defaultUnit, param[4]),
                  OperateTypeArrayLightMaterialService$Wonderjs.setSpecularMapUnit(index, defaultUnit, param[5])
                ];
        }), /* tuple */[
        param$1[0],
        param$1[1],
        param$1[2],
        param$1[3],
        param$1[5],
        param$1[6]
      ], ArrayService$WonderCommonlib.range(0, lightMaterialCount - 1 | 0));
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3],
          param$1[4].fill(0),
          match[4],
          match[5]
        ];
}

function _setAllTypeArrDataToDefault(lightMaterialCount, param, param$1) {
  return /* tuple */[
          param$1[0],
          setAllTypeArrDataToDefault(lightMaterialCount, /* tuple */[
                param[0],
                param[1],
                param[2],
                param[3]
              ], /* tuple */[
                param$1[1],
                param$1[2],
                param$1[3],
                param$1[4],
                param$1[5],
                param$1[6],
                param$1[7]
              ])
        ];
}

function _initBufferData(lightMaterialCount, textureCountPerMaterial, param) {
  var buffer = BufferLightMaterialService$Wonderjs.createBuffer(lightMaterialCount, textureCountPerMaterial);
  var match = CreateTypeArrayLightMaterialService$Wonderjs.createTypeArrays(buffer, lightMaterialCount, textureCountPerMaterial);
  return _setAllTypeArrDataToDefault(lightMaterialCount, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3]
            ], /* tuple */[
              buffer,
              match[0],
              match[1],
              match[2],
              match[3],
              match[4],
              match[5],
              match[6]
            ]);
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var defaultShaderIndex = DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
  var defaultDiffuseColor = /* array */[
    1,
    1,
    1
  ];
  var defaultSpecularColor = /* array */[
    1,
    1,
    1
  ];
  var match = _initBufferData(BufferSettingService$Wonderjs.getLightMaterialCount(settingRecord), BufferSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord), /* tuple */[
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        32.0
      ]);
  var match$1 = match[1];
  state[/* lightMaterialRecord */16] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* shaderIndices */match$1[0],
    /* diffuseColors */match$1[1],
    /* specularColors */match$1[2],
    /* shininess */match$1[3],
    /* textureIndices */match$1[4],
    /* diffuseMapUnits */match$1[5],
    /* specularMapUnits */match$1[6],
    /* emptyMapUnitArrayMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* defaultDiffuseColor */defaultDiffuseColor,
    /* defaultSpecularColor */defaultSpecularColor,
    /* defaultShininess */32.0,
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
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */16];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* shaderIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferLightMaterialService$Wonderjs.getShaderIndicesSize(/* () */0)), record[/* shaderIndices */2]),
    /* diffuseColors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferLightMaterialService$Wonderjs.getDiffuseColorsSize(/* () */0)), record[/* diffuseColors */3]),
    /* specularColors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferLightMaterialService$Wonderjs.getSpecularColorsSize(/* () */0)), record[/* specularColors */4]),
    /* shininess */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferLightMaterialService$Wonderjs.getShininessSize(/* () */0)), record[/* shininess */5]),
    /* textureIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferMaterialService$Wonderjs.getTextureIndicesSize(BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]))), record[/* textureIndices */6]),
    /* diffuseMapUnits */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferLightMaterialService$Wonderjs.getMapUnitsSize(/* () */0)), record[/* diffuseMapUnits */7]),
    /* specularMapUnits */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferLightMaterialService$Wonderjs.getMapUnitsSize(/* () */0)), record[/* specularMapUnits */8]),
    /* emptyMapUnitArrayMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfArray(record[/* emptyMapUnitArrayMap */9]),
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */record[/* defaultSpecularColor */11],
    /* defaultShininess */record[/* defaultShininess */12],
    /* gameObjectsMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfArray(record[/* gameObjectsMap */13]),
    /* disposedIndexArray */record[/* disposedIndexArray */14].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */15]),
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
