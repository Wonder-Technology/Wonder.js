

import * as Matrix4Service$Wonderjs from "../../../atom/Matrix4Service.js";
import * as GlobalTempService$Wonderjs from "../../../record/all/globalTemp/GlobalTempService.js";
import * as QuaternionService$Wonderjs from "../../../atom/QuaternionService.js";
import * as DirtyTransformService$Wonderjs from "../../../record/main/transform/DirtyTransformService.js";
import * as MutableSparseMapService$Wonderjs from "../../../atom/MutableSparseMapService.js";
import * as HierachyTransformService$Wonderjs from "../../../record/main/transform/HierachyTransformService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../record/main/transform/ModelMatrixTransformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _clearCache(transform, globalTempRecord, record) {
  var normalMatrixCacheMap = record[/* normalMatrixCacheMap */20];
  var match = MutableSparseMapService$Wonderjs.fastGet(transform, normalMatrixCacheMap);
  var globalTempRecord$1 = match[0] ? GlobalTempService$Wonderjs.addUnUsedFloat9(match[1], globalTempRecord) : globalTempRecord;
  MutableSparseMapService$WonderCommonlib.deleteVal(transform, normalMatrixCacheMap);
  return /* tuple */[
          record,
          globalTempRecord$1
        ];
}

function update(transform, globalTempRecord, transformRecord) {
  var localPositions = transformRecord[/* localPositions */3];
  var localRotations = transformRecord[/* localRotations */4];
  var localScales = transformRecord[/* localScales */5];
  var match = DirtyTransformService$Wonderjs.isDirty(transform, transformRecord);
  if (match) {
    var match$1 = _clearCache(transform, globalTempRecord, DirtyTransformService$Wonderjs.mark(transform, false, transformRecord));
    var globalTempRecord$1 = match$1[1];
    var transformRecord$1 = match$1[0];
    var match$2 = HierachyTransformService$Wonderjs.getParent(transform, transformRecord$1);
    if (match$2 !== undefined) {
      var parent = match$2;
      var transformRecord$2 = update(parent, globalTempRecord$1, transformRecord$1);
      var parentLocalToWorldMatrix = ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(parent, transformRecord$2[/* localToWorldMatrices */2], transformRecord$2[/* localToWorldMatrixCacheMap */19]);
      var childLocalToWorldMatrix = ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, transformRecord$2[/* localToWorldMatrices */2], transformRecord$2[/* localToWorldMatrixCacheMap */19]);
      Matrix4Service$Wonderjs.multiply(parentLocalToWorldMatrix, Matrix4Service$Wonderjs.fromTranslationRotationScale(ModelMatrixTransformService$Wonderjs.getLocalPositionTuple(transform, localPositions), ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(transform, localRotations), ModelMatrixTransformService$Wonderjs.getLocalScaleTuple(transform, localScales), GlobalTempService$Wonderjs.getFloat32Array1(globalTempRecord$1)), childLocalToWorldMatrix);
      return transformRecord$2;
    } else {
      var localToWorldMatrix = ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, transformRecord$1[/* localToWorldMatrices */2], transformRecord$1[/* localToWorldMatrixCacheMap */19]);
      Matrix4Service$Wonderjs.fromTranslationRotationScale(ModelMatrixTransformService$Wonderjs.getLocalPositionTuple(transform, localPositions), ModelMatrixTransformService$Wonderjs.getLocalRotationTuple(transform, localRotations), ModelMatrixTransformService$Wonderjs.getLocalScaleTuple(transform, localScales), localToWorldMatrix);
      return transformRecord$1;
    }
  } else {
    return transformRecord;
  }
}

function updateAndGetLocalToWorldMatrixTypeArray(transform, globalTempRecord, record) {
  var record$1 = update(transform, globalTempRecord, record);
  return ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, record$1[/* localToWorldMatrices */2], record$1[/* localToWorldMatrixCacheMap */19]);
}

function updateAndGetNormalMatrixTypeArray(transform, globalTempRecord, record) {
  var match = update(transform, globalTempRecord, record);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  var normalMatrixCacheMap = match[/* normalMatrixCacheMap */20];
  return ModelMatrixTransformService$Wonderjs.getNormalMatrixTypeArray(transform, localToWorldMatrices, /* tuple */[
              localToWorldMatrixCacheMap,
              normalMatrixCacheMap
            ], globalTempRecord);
}

function updateAndGetPositionTuple(transform, globalTempRecord, record) {
  var match = update(transform, globalTempRecord, record);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return Matrix4Service$Wonderjs.getTranslationTuple(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap));
}

function updateAndSetPositionByTuple(transform, position, globalTempRecord, record) {
  var match = HierachyTransformService$Wonderjs.getParent(transform, record);
  if (match !== undefined) {
    var parent = match;
    var record$1 = update(parent, globalTempRecord, record);
    return ModelMatrixTransformService$Wonderjs.setPositionByTuple(transform, parent, position, /* tuple */[
                globalTempRecord,
                record$1
              ]);
  } else {
    return ModelMatrixTransformService$Wonderjs.setLocalPositionByTuple(transform, position, record);
  }
}

function updateAndGetRotationTuple(transform, globalTempRecord, record) {
  var match = update(transform, globalTempRecord, record);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return Matrix4Service$Wonderjs.getRotationTuple(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap));
}

function updateAndSetRotationByTuple(transform, rotation, globalTempRecord, record) {
  var match = HierachyTransformService$Wonderjs.getParent(transform, record);
  if (match !== undefined) {
    return ModelMatrixTransformService$Wonderjs.setLocalRotationByTuple(transform, QuaternionService$Wonderjs.multiply(QuaternionService$Wonderjs.invert(updateAndGetRotationTuple(match, globalTempRecord, record)), rotation), record);
  } else {
    return ModelMatrixTransformService$Wonderjs.setLocalRotationByTuple(transform, rotation, record);
  }
}

function updateAndGetScaleTuple(transform, globalTempRecord, record) {
  var match = update(transform, globalTempRecord, record);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return Matrix4Service$Wonderjs.getScaleTuple(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap));
}

function updateAndSetScaleByTuple(transform, position, globalTempRecord, record) {
  var match = HierachyTransformService$Wonderjs.getParent(transform, record);
  if (match !== undefined) {
    var parent = match;
    var record$1 = update(parent, globalTempRecord, record);
    return ModelMatrixTransformService$Wonderjs.setScaleByTuple(transform, parent, position, /* tuple */[
                globalTempRecord,
                record$1
              ]);
  } else {
    return ModelMatrixTransformService$Wonderjs.setLocalScaleByTuple(transform, position, record);
  }
}

function updateAndGetEulerAnglesTuple(transform, globalTempRecord, record) {
  var match = update(transform, globalTempRecord, record);
  var localToWorldMatrices = match[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = match[/* localToWorldMatrixCacheMap */19];
  return Matrix4Service$Wonderjs.getEulerAngles(ModelMatrixTransformService$Wonderjs.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap));
}

function updateAndSetEulerAnglesByTuple(transform, eulerAngles, globalTempRecord, record) {
  return updateAndSetRotationByTuple(transform, QuaternionService$Wonderjs.setFromEulerAngles(eulerAngles), globalTempRecord, record);
}

export {
  _clearCache ,
  update ,
  updateAndGetLocalToWorldMatrixTypeArray ,
  updateAndGetNormalMatrixTypeArray ,
  updateAndGetPositionTuple ,
  updateAndSetPositionByTuple ,
  updateAndGetRotationTuple ,
  updateAndSetRotationByTuple ,
  updateAndGetScaleTuple ,
  updateAndSetScaleByTuple ,
  updateAndGetEulerAnglesTuple ,
  updateAndSetEulerAnglesByTuple ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
