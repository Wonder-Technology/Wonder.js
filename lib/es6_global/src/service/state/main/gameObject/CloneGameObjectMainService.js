

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ReduceStateMainService$Wonderjs from "../array/ReduceStateMainService.js";
import * as HierachyTransformService$Wonderjs from "../../../record/main/transform/HierachyTransformService.js";
import * as NameGameObjectMainService$Wonderjs from "./NameGameObjectMainService.js";
import * as GameObjectTransformService$Wonderjs from "../../../record/main/transform/GameObjectTransformService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as IsRootGameObjectMainService$Wonderjs from "./IsRootGameObjectMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";
import * as GetIsActiveGameObjectMainService$Wonderjs from "./GetIsActiveGameObjectMainService.js";
import * as SetIsActiveGameObjectMainService$Wonderjs from "./SetIsActiveGameObjectMainService.js";
import * as CreateGameObjectGameObjectService$Wonderjs from "../../../record/main/gameObject/CreateGameObjectGameObjectService.js";
import * as CloneGameObjectComponentMainService$Wonderjs from "./CloneGameObjectComponentMainService.js";

function _createGameObjectArr(countRangeArr, gameObjectRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                var match = CreateGameObjectGameObjectService$Wonderjs.create(param[0]);
                return /* tuple */[
                        match[0],
                        ArrayService$Wonderjs.push(match[1], param[1])
                      ];
              }), /* tuple */[
              gameObjectRecord,
              /* array */[]
            ], countRangeArr);
}

function _setParent(clonedParentTransformArr, clonedTransformArr, transformRecord) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (transformRecord, clonedParentTransform, i) {
                return HierachyTransformService$Wonderjs.setParentNotMarkDirty(clonedParentTransform, Caml_array.caml_array_get(clonedTransformArr, i), transformRecord);
              }), transformRecord, clonedParentTransformArr);
}

function _setGameObjectName(sourceGameObject, clonedGameObjectArr, state) {
  var match = NameGameObjectMainService$Wonderjs.getName(sourceGameObject, state);
  if (match !== undefined) {
    var name = match;
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, clonedGameObject) {
                  return NameGameObjectMainService$Wonderjs.setName(clonedGameObject, name, state);
                }), state, clonedGameObjectArr);
  } else {
    return state;
  }
}

function _setGameObjectIsRoot(sourceGameObject, clonedGameObjectArr, state) {
  var isRoot = IsRootGameObjectMainService$Wonderjs.unsafeGetIsRoot(sourceGameObject, state);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, clonedGameObject) {
                return IsRootGameObjectMainService$Wonderjs.setIsRoot(clonedGameObject, isRoot, state);
              }), state, clonedGameObjectArr);
}

function _setGameObjectIsActive(sourceGameObject, clonedGameObjectArr, state) {
  var isActive = GetIsActiveGameObjectMainService$Wonderjs.unsafeGetIsActive(sourceGameObject, state);
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, clonedGameObject) {
                return SetIsActiveGameObjectMainService$Wonderjs.setIsActive(clonedGameObject, isActive, state);
              }), state, clonedGameObjectArr);
}

function _clone(param, isShareMaterial, state) {
  var countRangeArr = param[2];
  var transform = param[1];
  var uid = param[0];
  var match = _createGameObjectArr(countRangeArr, state[/* gameObjectRecord */10]);
  var clonedGameObjectArr = match[1];
  var state$1 = _setGameObjectIsRoot(uid, clonedGameObjectArr, _setGameObjectIsActive(uid, clonedGameObjectArr, _setGameObjectName(uid, clonedGameObjectArr, state)));
  var totalClonedGameObjectArr = ArrayService$Wonderjs.push(clonedGameObjectArr, param[4]);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* gameObjectRecord */10] = match[0];
  var match$1 = CloneGameObjectComponentMainService$Wonderjs.clone(/* tuple */[
        uid,
        transform,
        countRangeArr,
        clonedGameObjectArr
      ], isShareMaterial, newrecord);
  var clonedTransformArr = match$1[1];
  var state$2 = match$1[0];
  var transformRecord = _setParent(param[3], clonedTransformArr, RecordTransformMainService$Wonderjs.getRecord(state$2));
  state$2[/* transformRecord */11] = transformRecord;
  return ReduceStateMainService$Wonderjs.reduceState((function (state, childTransform) {
                return _clone(/* tuple */[
                            GameObjectTransformService$Wonderjs.unsafeGetGameObject(childTransform, RecordTransformMainService$Wonderjs.getRecord(state)),
                            childTransform,
                            countRangeArr,
                            clonedTransformArr,
                            totalClonedGameObjectArr
                          ], isShareMaterial, state);
              }), state$2, HierachyTransformService$Wonderjs.unsafeGetChildren(transform, RecordTransformMainService$Wonderjs.getRecord(state$2)));
}

function clone(uid, count, isShareMaterial, state) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not clone sourceInstance gameObject", "do"), (function (param) {
                  return Contract$WonderLog.assertFalse(HasComponentGameObjectService$Wonderjs.hasSourceInstanceComponent(uid, state[/* gameObjectRecord */10]));
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not clone objectInstance gameObject", "do"), (function (param) {
                        return Contract$WonderLog.assertFalse(HasComponentGameObjectService$Wonderjs.hasObjectInstanceComponent(uid, state[/* gameObjectRecord */10]));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var totalClonedGameObjectArr = /* array */[];
  return /* tuple */[
          _clone(/* tuple */[
                uid,
                OptionService$Wonderjs.unsafeGet(GetComponentGameObjectService$Wonderjs.getTransformComponent(uid, state[/* gameObjectRecord */10])),
                ArrayService$Wonderjs.range(0, count - 1 | 0),
                /* array */[],
                totalClonedGameObjectArr
              ], isShareMaterial, state),
          totalClonedGameObjectArr
        ];
}

export {
  _createGameObjectArr ,
  _setParent ,
  _setGameObjectName ,
  _setGameObjectIsRoot ,
  _setGameObjectIsActive ,
  _clone ,
  clone ,
  
}
/* Log-WonderLog Not a pure module */
