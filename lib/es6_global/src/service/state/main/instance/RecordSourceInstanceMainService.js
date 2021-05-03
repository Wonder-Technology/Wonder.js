

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as StaticTransformService$Wonderjs from "../../../primitive/instance/StaticTransformService.js";
import * as BufferSourceInstanceService$Wonderjs from "../../../record/main/instance/sourceInstance/BufferSourceInstanceService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayAllSourceInstanceService$Wonderjs from "../../../record/all/instance/CreateTypeArrayAllSourceInstanceService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* sourceInstanceRecord */6]);
}

function setAllTypeArrDataToDefault(sourceInstanceCount, defaultIsTransformStatic, param) {
  return /* tuple */[
          param[0].fill(0),
          ArrayService$WonderCommonlib.reduceOneParam((function (isTransformStatics, index) {
                  return StaticTransformService$Wonderjs.setModelMatrixIsStatic(index, defaultIsTransformStatic, isTransformStatics);
                }), param[1], ArrayService$WonderCommonlib.range(0, sourceInstanceCount - 1 | 0))
        ];
}

function _setAllTypeArrDataToDefault(sourceInstanceCount, defaultIsTransformStatic, param) {
  return /* tuple */[
          param[0],
          setAllTypeArrDataToDefault(sourceInstanceCount, defaultIsTransformStatic, /* tuple */[
                param[1],
                param[2]
              ])
        ];
}

function _initBufferData(sourceInstanceCount, objectInstanceCountPerSourceInstance, defaultIsTransformStatic) {
  var buffer = BufferSourceInstanceService$Wonderjs.createBuffer(sourceInstanceCount, objectInstanceCountPerSourceInstance);
  var match = CreateTypeArrayAllSourceInstanceService$Wonderjs.createTypeArrays(buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance);
  return _setAllTypeArrDataToDefault(sourceInstanceCount, defaultIsTransformStatic, /* tuple */[
              buffer,
              match[0],
              match[1]
            ]);
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var sourceInstanceCount = BufferSettingService$Wonderjs.getSourceInstanceCount(settingRecord);
  var objectInstanceCountPerSourceInstance = BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(settingRecord);
  var defaultIsTransformStatic = StaticTransformService$Wonderjs.getDefault(/* () */0);
  var match = _initBufferData(sourceInstanceCount, objectInstanceCountPerSourceInstance, defaultIsTransformStatic);
  var match$1 = match[1];
  state[/* sourceInstanceRecord */6] = /* record */[
    /* index */0,
    /* objectInstanceTransformIndexMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* buffer */match[0],
    /* isTransformStatics */match$1[1],
    /* objectInstanceTransformCollections */match$1[0],
    /* matrixInstanceBufferCapacityMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* matrixFloat32ArrayMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* isSendTransformMatrixDataMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* sourceInstanceRecord */6] = /* record */[
    /* index */index,
    /* objectInstanceTransformIndexMap */MutableSparseMapService$WonderCommonlib.copy(record[/* objectInstanceTransformIndexMap */1]),
    /* buffer */record[/* buffer */2],
    /* isTransformStatics */CopyTypeArrayService$Wonderjs.copyUint8ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceInstanceService$Wonderjs.getIsTransformStaticsSize(/* () */0)), record[/* isTransformStatics */3]),
    /* objectInstanceTransformCollections */CopyTypeArrayService$Wonderjs.copyUint32ArrayWithEndIndex(Caml_int32.imul(index, BufferSourceInstanceService$Wonderjs.getObjectInstanceTransformCollectionsSize(BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(state[/* settingRecord */0]))), record[/* objectInstanceTransformCollections */4]),
    /* matrixInstanceBufferCapacityMap */MutableSparseMapService$WonderCommonlib.copy(record[/* matrixInstanceBufferCapacityMap */5]),
    /* matrixFloat32ArrayMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfFloat32Array(record[/* matrixFloat32ArrayMap */6]),
    /* isSendTransformMatrixDataMap */record[/* isSendTransformMatrixDataMap */7],
    /* disposedIndexArray */record[/* disposedIndexArray */8].slice(),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(record[/* gameObjectMap */9])
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
