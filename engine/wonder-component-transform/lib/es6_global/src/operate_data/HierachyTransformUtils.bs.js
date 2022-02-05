

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$WonderComponentTransform from "../config/ConfigUtils.bs.js";
import * as DirtyTransformUtils$WonderComponentTransform from "./DirtyTransformUtils.bs.js";

var getParent = MutableSparseMap$WonderCommonlib.get;

var getNullableParent = MutableSparseMap$WonderCommonlib.getNullable;

var getNullableChildren = MutableSparseMap$WonderCommonlib.getNullable;

var _unsafeGetChildren = MutableSparseMap$WonderCommonlib.unsafeGet;

function _addChild(childrenMap, parent, child) {
  return ArraySt$WonderCommonlib.push(MutableSparseMap$WonderCommonlib.unsafeGet(childrenMap, parent), child);
}

function _addToParent(state, parent, child) {
  Contract$WonderCommonlib.requireCheck((function (param) {
          var childrenMap = state.childrenMap;
          var parentMap = state.parentMap;
          Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("child not has parent", "has"), (function (param) {
                  return Contract$WonderCommonlib.assertNotExist(MutableSparseMap$WonderCommonlib.get(parentMap, child));
                }));
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("parent not already has the child", "has"), (function (param) {
                        var children = OptionSt$WonderCommonlib.fromNullable(MutableSparseMap$WonderCommonlib.getNullable(childrenMap, parent));
                        if (children !== undefined) {
                          return Contract$WonderCommonlib.assertFalse(ArraySt$WonderCommonlib.includes(children, child));
                        } else {
                          return Contract$WonderCommonlib.assertPass(undefined);
                        }
                      }));
        }), ConfigUtils$WonderComponentTransform.getIsDebug(state));
  MutableSparseMap$WonderCommonlib.set(state.parentMap, child, parent);
  _addChild(state.childrenMap, parent, child);
  return state;
}

var _removeParent = MutableSparseMap$WonderCommonlib.remove;

function _removeChild(children, isDebug, child) {
  return ArraySt$WonderCommonlib.deleteBySwap(children, isDebug, children.indexOf(child), children.length - 1 | 0);
}

function _removeFromChildMap(childrenMap, isDebug, parent, child) {
  return _removeChild(MutableSparseMap$WonderCommonlib.unsafeGet(childrenMap, parent), isDebug, child);
}

function _removeFromParent(state, currentParent, child) {
  MutableSparseMap$WonderCommonlib.remove(state.parentMap, child);
  _removeFromChildMap(state.childrenMap, ConfigUtils$WonderComponentTransform.getIsDebug(state), currentParent, child);
  return state;
}

function removeParent(state, transform) {
  var currentParent = MutableSparseMap$WonderCommonlib.get(state.parentMap, transform);
  if (currentParent !== undefined) {
    return _removeFromParent(state, currentParent, transform);
  } else {
    return state;
  }
}

function _setNewParent(state, parent, child) {
  var currentParent = MutableSparseMap$WonderCommonlib.get(state.parentMap, child);
  if (currentParent !== undefined) {
    if (currentParent !== parent) {
      return _addToParent(_removeFromParent(state, currentParent, child), parent, child);
    } else {
      return state;
    }
  } else {
    return _addToParent(state, parent, child);
  }
}

function markHierachyDirty(state, transform) {
  DirtyTransformUtils$WonderComponentTransform.mark(state, transform, true);
  return ArraySt$WonderCommonlib.reduceOneParam(MutableSparseMap$WonderCommonlib.unsafeGet(state.childrenMap, transform), markHierachyDirty, state);
}

function setParent(state, parent, child) {
  return markHierachyDirty(_setNewParent(state, parent, child), child);
}

export {
  getParent ,
  getNullableParent ,
  getNullableChildren ,
  _unsafeGetChildren ,
  _addChild ,
  _addToParent ,
  _removeParent ,
  _removeChild ,
  _removeFromChildMap ,
  _removeFromParent ,
  removeParent ,
  _setNewParent ,
  markHierachyDirty ,
  setParent ,
  
}
/* No side effect */
