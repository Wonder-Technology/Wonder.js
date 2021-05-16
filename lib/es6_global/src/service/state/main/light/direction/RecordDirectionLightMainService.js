

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as TypeArrayService$Wonderjs from "../../../../primitive/buffer/TypeArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferDirectionLightService$Wonderjs from "../../../../record/main/light/direction/BufferDirectionLightService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayAllDirectionLightService$Wonderjs from "../../../../record/all/light/direction/CreateTypeArrayAllDirectionLightService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* directionLightRecord */21]);
}

function getDefaultColor(param) {
  return /* array */[
          1,
          1,
          1
        ];
}

function getDefaultIntensity(param) {
  return 1;
}

function getColor(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat3(BufferDirectionLightService$Wonderjs.getColorIndex(index), typeArr);
}

function setColor(index, color, typeArr) {
  return TypeArrayService$Wonderjs.setFloat3(BufferDirectionLightService$Wonderjs.getColorIndex(index), color, typeArr);
}

function getIntensity(index, typeArr) {
  return TypeArrayService$Wonderjs.getFloat1(BufferDirectionLightService$Wonderjs.getIntensityIndex(index), typeArr);
}

function setIntensity(index, intensity, typeArr) {
  return TypeArrayService$Wonderjs.setFloat1(BufferDirectionLightService$Wonderjs.getIntensityIndex(index), intensity, typeArr);
}

function setAllTypeArrDataToDefault(count, param) {
  var defaultColor = /* array */[
    1,
    1,
    1
  ];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                return /* tuple */[
                        setColor(index, defaultColor, param[0]),
                        setIntensity(index, 1, param[1])
                      ];
              }), /* tuple */[
              param[0],
              param[1]
            ], ArrayService$WonderCommonlib.range(0, count - 1 | 0));
}

function _setAllTypeArrDataToDefault(count, param) {
  return /* tuple */[
          param[0],
          setAllTypeArrDataToDefault(count, /* tuple */[
                param[1],
                param[2]
              ])
        ];
}

function _initBufferData(count) {
  var buffer = BufferDirectionLightService$Wonderjs.createBuffer(count);
  var match = CreateTypeArrayAllDirectionLightService$Wonderjs.createTypeArrays(buffer, count);
  return _setAllTypeArrDataToDefault(count, /* tuple */[
              buffer,
              match[0],
              match[1]
            ]);
}

function create(state) {
  var lightCount = BufferSettingService$Wonderjs.getDirectionLightCount(state[/* settingRecord */0]);
  var match = _initBufferData(lightCount);
  var match$1 = match[1];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* colors */match$1[0],
    /* intensities */match$1[1],
    /* renderLightArr */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return newrecord;
}

function deepCopyForRestore(state) {
  var directionLightRecord = getRecord(state);
  var index = directionLightRecord[/* index */0];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = /* record */[
    /* index */index,
    /* buffer */directionLightRecord[/* buffer */1],
    /* colors */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferDirectionLightService$Wonderjs.getColorsSize(/* () */0)), directionLightRecord[/* colors */2]),
    /* intensities */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferDirectionLightService$Wonderjs.getIntensitiesSize(/* () */0)), directionLightRecord[/* intensities */3]),
    /* renderLightArr */directionLightRecord[/* renderLightArr */4].slice(),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(directionLightRecord[/* gameObjectMap */5]),
    /* disposedIndexArray */directionLightRecord[/* disposedIndexArray */6].slice()
  ];
  return newrecord;
}

export {
  getRecord ,
  getDefaultColor ,
  getDefaultIntensity ,
  getColor ,
  setColor ,
  getIntensity ,
  setIntensity ,
  setAllTypeArrDataToDefault ,
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  create ,
  deepCopyForRestore ,
  
}
/* OptionService-Wonderjs Not a pure module */
