

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as MemorySettingService$Wonderjs from "../../../record/main/setting/MemorySettingService.js";
import * as TypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/TypeArrayPoolService.js";
import * as StaticTransformService$Wonderjs from "../../../primitive/instance/StaticTransformService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../instance/RecordSourceInstanceMainService.js";

function _buildIsNotSendTransformMatrixDataMap(isSendTransformMatrixDataMap) {
  return MutableSparseMapService$WonderCommonlib.reduceiValid((function (newMap, param, index) {
                return MutableSparseMapService$WonderCommonlib.set(index, false, newMap);
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), isSendTransformMatrixDataMap);
}

function _restoreTypeArrays(currentSourceInstanceRecord, targetSourceInstanceRecord) {
  var match = currentSourceInstanceRecord[/* objectInstanceTransformCollections */4] === targetSourceInstanceRecord[/* objectInstanceTransformCollections */4] && currentSourceInstanceRecord[/* isTransformStatics */3] === targetSourceInstanceRecord[/* isTransformStatics */3];
  if (match) {
    return /* tuple */[
            currentSourceInstanceRecord,
            targetSourceInstanceRecord
          ];
  } else {
    RecordSourceInstanceMainService$Wonderjs.setAllTypeArrDataToDefault(currentSourceInstanceRecord[/* index */0], StaticTransformService$Wonderjs.getDefault(/* () */0), /* tuple */[
          currentSourceInstanceRecord[/* objectInstanceTransformCollections */4],
          currentSourceInstanceRecord[/* isTransformStatics */3]
        ]);
    TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
          currentSourceInstanceRecord[/* objectInstanceTransformCollections */4],
          0
        ], /* tuple */[
          targetSourceInstanceRecord[/* objectInstanceTransformCollections */4],
          0
        ], targetSourceInstanceRecord[/* objectInstanceTransformCollections */4].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentSourceInstanceRecord[/* isTransformStatics */3],
          0
        ], /* tuple */[
          targetSourceInstanceRecord[/* isTransformStatics */3],
          0
        ], targetSourceInstanceRecord[/* isTransformStatics */3].length);
    return /* tuple */[
            currentSourceInstanceRecord,
            targetSourceInstanceRecord
          ];
  }
}

function restore(currentState, sharedData, targetState) {
  var currentSourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(currentState);
  var targetSourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(targetState);
  var float32ArrayPoolMap = TypeArrayPoolService$Wonderjs.addAllFloat32TypeArrayToPool(currentSourceInstanceRecord[/* matrixFloat32ArrayMap */6], MemorySettingService$Wonderjs.getMaxBigTypeArrayPoolSize(targetState[/* settingRecord */0]), sharedData[/* float32ArrayPoolMap */1]);
  var match = _restoreTypeArrays(currentSourceInstanceRecord, targetSourceInstanceRecord);
  var targetSourceInstanceRecord$1 = match[1];
  var currentSourceInstanceRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  return /* tuple */[
          (newrecord[/* sourceInstanceRecord */6] = /* record */[
              /* index */targetSourceInstanceRecord$1[/* index */0],
              /* objectInstanceTransformIndexMap */targetSourceInstanceRecord$1[/* objectInstanceTransformIndexMap */1],
              /* buffer */currentSourceInstanceRecord$1[/* buffer */2],
              /* isTransformStatics */currentSourceInstanceRecord$1[/* isTransformStatics */3],
              /* objectInstanceTransformCollections */currentSourceInstanceRecord$1[/* objectInstanceTransformCollections */4],
              /* matrixInstanceBufferCapacityMap */targetSourceInstanceRecord$1[/* matrixInstanceBufferCapacityMap */5],
              /* matrixFloat32ArrayMap */targetSourceInstanceRecord$1[/* matrixFloat32ArrayMap */6],
              /* isSendTransformMatrixDataMap */_buildIsNotSendTransformMatrixDataMap(targetSourceInstanceRecord$1[/* isSendTransformMatrixDataMap */7]),
              /* disposedIndexArray */targetSourceInstanceRecord$1[/* disposedIndexArray */8],
              /* gameObjectMap */targetSourceInstanceRecord$1[/* gameObjectMap */9]
            ], newrecord),
          /* record */[
            /* gl */sharedData[/* gl */0],
            /* float32ArrayPoolMap */float32ArrayPoolMap,
            /* uint16ArrayPoolMap */sharedData[/* uint16ArrayPoolMap */2]
          ]
        ];
}

export {
  _buildIsNotSendTransformMatrixDataMap ,
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
