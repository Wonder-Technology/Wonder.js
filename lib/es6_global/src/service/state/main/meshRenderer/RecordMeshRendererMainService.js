

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/BufferMeshRendererService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayAllMeshRendererService$Wonderjs from "../../../record/all/meshRenderer/CreateTypeArrayAllMeshRendererService.js";
import * as OperateTypeArrayAllMeshRendererService$Wonderjs from "../../../record/all/meshRenderer/OperateTypeArrayAllMeshRendererService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* meshRendererRecord */24]);
}

function setAllTypeArrDataToDefault(meshRendererCount, param, param$1) {
  var defaultIsRender = param[1];
  var defaultDrawMode = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                return /* tuple */[
                        OperateTypeArrayAllMeshRendererService$Wonderjs.setDrawMode(index, defaultDrawMode, param[0]),
                        OperateTypeArrayAllMeshRendererService$Wonderjs.setIsRender(index, defaultIsRender, param[1])
                      ];
              }), /* tuple */[
              param$1[0],
              param$1[1]
            ], ArrayService$WonderCommonlib.range(0, meshRendererCount - 1 | 0));
}

function _setAllTypeArrDataToDefault(meshRendererCount, defaultDrawMode, defaultIsRender, param) {
  return /* tuple */[
          param[0],
          setAllTypeArrDataToDefault(meshRendererCount, /* tuple */[
                defaultDrawMode,
                defaultIsRender
              ], /* tuple */[
                param[1],
                param[2]
              ])
        ];
}

function _initBufferData(meshRendererCount, defaultDrawMode, defaultIsRender) {
  var buffer = BufferMeshRendererService$Wonderjs.createBuffer(meshRendererCount);
  var match = CreateTypeArrayAllMeshRendererService$Wonderjs.createTypeArrays(buffer, meshRendererCount);
  return _setAllTypeArrDataToDefault(meshRendererCount, defaultDrawMode, defaultIsRender, /* tuple */[
              buffer,
              match[0],
              match[1]
            ]);
}

function create(state) {
  DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
  var defaultDrawMode = BufferMeshRendererService$Wonderjs.getDefaultDrawMode(/* () */0);
  var defaultIsRender = BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0);
  var match = _initBufferData(BufferSettingService$Wonderjs.getMeshRendererCount(state[/* settingRecord */0]), defaultDrawMode, defaultIsRender);
  var match$1 = match[1];
  state[/* meshRendererRecord */24] = /* record */[
    /* index */0,
    /* buffer */match[0],
    /* drawModes */match$1[0],
    /* isRenders */match$1[1],
    /* basicMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* lightMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* meshRendererRecord */24] = /* record */[
    /* index */index,
    /* buffer */record[/* buffer */1],
    /* drawModes */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferMeshRendererService$Wonderjs.getDrawModesSize(/* () */0)), record[/* drawModes */2]),
    /* isRenders */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferMeshRendererService$Wonderjs.getIsRendersSize(/* () */0)), record[/* isRenders */3]),
    /* basicMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.copy(record[/* basicMaterialRenderGameObjectMap */4]),
    /* lightMaterialRenderGameObjectMap */MutableSparseMapService$WonderCommonlib.copy(record[/* lightMaterialRenderGameObjectMap */5]),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(record[/* gameObjectMap */6]),
    /* disposedIndexArray */record[/* disposedIndexArray */7].slice()
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
