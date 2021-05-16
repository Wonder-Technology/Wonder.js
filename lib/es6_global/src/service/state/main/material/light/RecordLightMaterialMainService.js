

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TextureIndexService$Wonderjs from "../../../../primitive/material/TextureIndexService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as ShaderIndicesService$Wonderjs from "../../../../primitive/material/ShaderIndicesService.js";
import * as BufferMaterialService$Wonderjs from "../../../../record/main/material/BufferMaterialService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as BufferAllLightMaterialService$Wonderjs from "../../../../record/all/material/light/BufferAllLightMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayAllLightMaterialService$Wonderjs from "../../../../record/all/material/light/CreateTypeArrayAllLightMaterialService.js";
import * as OperateTypeArrayAllLightMaterialService$Wonderjs from "../../../../record/all/material/light/OperateTypeArrayAllLightMaterialService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* lightMaterialRecord */16]);
}

function setAllTypeArrDataToDefault(lightMaterialCount, param, param$1) {
  var defaultTextureIndex = param[4];
  var defaultShininess = param[3];
  var defaultSpecularColor = param[2];
  var defaultDiffuseColor = param[1];
  var defaultShaderIndex = param[0];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
          return /* tuple */[
                  ShaderIndicesService$Wonderjs.setShaderIndex(index, defaultShaderIndex, param[0]),
                  OperateTypeArrayAllLightMaterialService$Wonderjs.setDiffuseColor(index, defaultDiffuseColor, param[1]),
                  OperateTypeArrayAllLightMaterialService$Wonderjs.setSpecularColor(index, defaultSpecularColor, param[2]),
                  OperateTypeArrayAllLightMaterialService$Wonderjs.setShininess(index, defaultShininess, param[3]),
                  OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex(index, defaultTextureIndex, param[4]),
                  OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex(index, defaultTextureIndex, param[5])
                ];
        }), /* tuple */[
        param$1[0],
        param$1[1],
        param$1[2],
        param$1[3],
        param$1[4],
        param$1[5]
      ], ArrayService$WonderCommonlib.range(0, lightMaterialCount - 1 | 0));
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3],
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
                param[3],
                param[4]
              ], /* tuple */[
                param$1[1],
                param$1[2],
                param$1[3],
                param$1[4],
                param$1[5],
                param$1[6]
              ])
        ];
}

function _initBufferData(lightMaterialCount, param) {
  var buffer = BufferAllLightMaterialService$Wonderjs.createBuffer(lightMaterialCount);
  var match = CreateTypeArrayAllLightMaterialService$Wonderjs.createTypeArrays(buffer, lightMaterialCount);
  return _setAllTypeArrDataToDefault(lightMaterialCount, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3],
              param[4]
            ], /* tuple */[
              buffer,
              match[0],
              match[1],
              match[2],
              match[3],
              match[4],
              match[5]
            ]);
}

function create(state) {
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
  var defaultTextureIndex = TextureIndexService$Wonderjs.getDefaultTextureIndex(/* () */0);
  var match = _initBufferData(BufferSettingService$Wonderjs.getLightMaterialCount(state[/* settingRecord */0]), /* tuple */[
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        32.0,
        defaultTextureIndex
      ]);
  var match$1 = match[1];
  state[/* lightMaterialRecord */16] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* shaderIndices */match$1[0],
    /* diffuseColors */match$1[1],
    /* specularColors */match$1[2],
    /* shininess */match$1[3],
    /* diffuseTextureIndices */match$1[4],
    /* specularTextureIndices */match$1[5],
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
  var materialArrayForWorkerInit = record[/* materialArrayForWorkerInit */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* shaderIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllLightMaterialService$Wonderjs.getShaderIndicesSize(/* () */0)), record[/* shaderIndices */2]),
    /* diffuseColors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllLightMaterialService$Wonderjs.getDiffuseColorsSize(/* () */0)), record[/* diffuseColors */3]),
    /* specularColors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllLightMaterialService$Wonderjs.getSpecularColorsSize(/* () */0)), record[/* specularColors */4]),
    /* shininess */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferAllLightMaterialService$Wonderjs.getShininessSize(/* () */0)), record[/* shininess */5]),
    /* diffuseTextureIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferMaterialService$Wonderjs.getTextureIndicesSize(/* () */0)), record[/* diffuseTextureIndices */6]),
    /* specularTextureIndices */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferMaterialService$Wonderjs.getTextureIndicesSize(/* () */0)), record[/* specularTextureIndices */7]),
    /* defaultDiffuseColor */record[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */record[/* defaultSpecularColor */9],
    /* defaultShininess */record[/* defaultShininess */10],
    /* gameObjectsMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfArray(record[/* gameObjectsMap */11]),
    /* disposedIndexArray */record[/* disposedIndexArray */12].slice(),
    /* nameMap */MutableSparseMapService$WonderCommonlib.copy(record[/* nameMap */13]),
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
