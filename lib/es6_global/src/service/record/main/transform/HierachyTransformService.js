

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DirtyTransformService$Wonderjs from "./DirtyTransformService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _unsafeGetParent(transform, record) {
  return MutableSparseMapService$WonderCommonlib.unsafeGet(transform, record[/* parentMap */15]);
}

function hasParent(transform, record) {
  return MutableSparseMapService$WonderCommonlib.has(transform, record[/* parentMap */15]);
}

function unsafeGetParent(transform, record) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("parent exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(transform, record[/* parentMap */15]));
}

function getParent(transform, record) {
  return MutableSparseMapService$WonderCommonlib.get(transform, record[/* parentMap */15]);
}

function removeFromParentMap(child, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* parentMap */15] = MutableSparseMapService$WonderCommonlib.deleteVal(child, record[/* parentMap */15]);
  return newrecord;
}

function unsafeGetChildren(transform, record) {
  return Contract$WonderLog.ensureCheck((function (children) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("children exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(children);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(transform, record[/* childMap */16]));
}

function setChildren(record, parent, children) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* childMap */16] = MutableSparseMapService$WonderCommonlib.set(parent, children, record[/* childMap */16]);
  return newrecord;
}

function _removeChild(child, isKeepOrder, children) {
  return ArrayService$Wonderjs.deleteBySwap(children.indexOf(child), children.length - 1 | 0, children);
}

function removeFromChildMap(parent, child, isKeepOrder, record) {
  if (isKeepOrder) {
    return setChildren(record, parent, unsafeGetChildren(parent, record).filter((function (transform) {
                      return transform !== child;
                    })));
  } else {
    _removeChild(child, isKeepOrder, unsafeGetChildren(parent, record));
    return record;
  }
}

function _removeFromParent(currentParent, child, isKeepOrder, record) {
  return removeFromChildMap(currentParent, child, isKeepOrder, removeFromParentMap(child, record));
}

function _setParentToParentMap(parent, child, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* parentMap */15] = MutableSparseMapService$WonderCommonlib.set(child, parent, record[/* parentMap */15]);
  return newrecord;
}

function _addChild(parent, child, record) {
  unsafeGetChildren(parent, record).push(child);
  return record;
}

function addToParent(parent, child, record) {
  Contract$WonderLog.requireCheck((function (param) {
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("child not has parent", "has"), (function (param) {
                  return Contract$WonderLog.assertNotExist(MutableSparseMapService$WonderCommonlib.get(child, record[/* parentMap */15]));
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("parent not already has the child", "has"), (function (param) {
                        return Contract$WonderLog.assertFalse(unsafeGetChildren(parent, record).includes(child));
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return _addChild(parent, child, _setParentToParentMap(parent, child, record));
}

function markHierachyDirty(transform, record) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (record, child) {
                return markHierachyDirty(child, record);
              }), record, unsafeGetChildren(transform, DirtyTransformService$Wonderjs.mark(transform, true, record)));
}

function _isSame(a, b) {
  return a === b;
}

function _setNewParent(parent, child, isKeepOrder, record) {
  var match = MutableSparseMapService$WonderCommonlib.get(child, record[/* parentMap */15]);
  if (match !== undefined) {
    var currentParent = match;
    var match$1 = currentParent !== parent;
    if (match$1) {
      return addToParent(parent, child, _removeFromParent(currentParent, child, isKeepOrder, record));
    } else {
      return record;
    }
  } else {
    return addToParent(parent, child, record);
  }
}

function _setParent(parent, child, isKeepOrder, record) {
  if (parent !== undefined) {
    return _setNewParent(parent, child, isKeepOrder, record);
  } else {
    var match = MutableSparseMapService$WonderCommonlib.get(child, record[/* parentMap */15]);
    if (match !== undefined) {
      return _removeFromParent(match, child, isKeepOrder, record);
    } else {
      return record;
    }
  }
}

function setParent(parent, child, record) {
  return markHierachyDirty(child, _setParent(parent, child, false, record));
}

function setParentNotMarkDirty(parent, child, record) {
  return _setParent(parent, child, false, record);
}

function setParentKeepOrder(parent, child, record) {
  return markHierachyDirty(child, _setParent(parent, child, true, record));
}

function setParentKeepOrderNotMarkDirty(parent, child, record) {
  return _setParent(parent, child, true, record);
}

export {
  _unsafeGetParent ,
  hasParent ,
  unsafeGetParent ,
  getParent ,
  removeFromParentMap ,
  unsafeGetChildren ,
  setChildren ,
  _removeChild ,
  removeFromChildMap ,
  _removeFromParent ,
  _setParentToParentMap ,
  _addChild ,
  addToParent ,
  markHierachyDirty ,
  _isSame ,
  _setNewParent ,
  _setParent ,
  setParent ,
  setParentNotMarkDirty ,
  setParentKeepOrder ,
  setParentKeepOrderNotMarkDirty ,
  
}
/* Log-WonderLog Not a pure module */
