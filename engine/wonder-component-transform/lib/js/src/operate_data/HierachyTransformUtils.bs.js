'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$WonderComponentTransform = require("../config/ConfigUtils.bs.js");
var DirtyTransformUtils$WonderComponentTransform = require("./DirtyTransformUtils.bs.js");

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

exports.getParent = getParent;
exports.getNullableParent = getNullableParent;
exports.getNullableChildren = getNullableChildren;
exports._unsafeGetChildren = _unsafeGetChildren;
exports._addChild = _addChild;
exports._addToParent = _addToParent;
exports._removeParent = _removeParent;
exports._removeChild = _removeChild;
exports._removeFromChildMap = _removeFromChildMap;
exports._removeFromParent = _removeFromParent;
exports.removeParent = removeParent;
exports._setNewParent = _setNewParent;
exports.markHierachyDirty = markHierachyDirty;
exports.setParent = setParent;
/* No side effect */
