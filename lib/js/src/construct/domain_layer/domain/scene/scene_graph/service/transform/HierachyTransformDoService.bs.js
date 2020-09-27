'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../library/log/Log.bs.js");
var ListSt$Wonderjs = require("../../../../../library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../library/contract/Contract.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var DirtyTransformDoService$Wonderjs = require("./DirtyTransformDoService.bs.js");

function hasParent(transform) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).hasParent, TransformEntity$Wonderjs.value(transform));
}

function getParent(transform) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getParent, TransformEntity$Wonderjs.value(transform)), TransformEntity$Wonderjs.create);
}

function getChildren(transform) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getChildren, TransformEntity$Wonderjs.value(transform)), (function (children) {
                return ListSt$Wonderjs.map(children, TransformEntity$Wonderjs.create);
              }));
}

function _addToParent(parent, child) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("child not has parent", "has"), (function (param) {
                            return Contract$Wonderjs.assertNotExist(getParent(child));
                          }));
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("parent not already has the child", "has"), (function (param) {
                                  var children = getChildren(parent);
                                  if (children !== undefined) {
                                    return Contract$Wonderjs.assertFalse(ListSt$Wonderjs.includes(children, child));
                                  } else {
                                    return Contract$Wonderjs.assertPass(undefined);
                                  }
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setParent, TransformEntity$Wonderjs.value(parent), TransformEntity$Wonderjs.value(child));
                return Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).addChild, TransformEntity$Wonderjs.value(parent), TransformEntity$Wonderjs.value(child));
              }));
}

function _removeParent(transform) {
  return Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).removeParent, TransformEntity$Wonderjs.value(transform));
}

function _removeChild(parent, child) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).removeChild, TransformEntity$Wonderjs.value(parent), TransformEntity$Wonderjs.value(child));
}

function _removeFromParent(currentParent, child) {
  _removeParent(child);
  return _removeChild(currentParent, child);
}

function removeParent(transform) {
  var currentParent = getParent(transform);
  if (currentParent !== undefined) {
    return _removeFromParent(currentParent, transform);
  }
  
}

function _setNewParent(parent, child) {
  var currentParent = getParent(child);
  if (currentParent !== undefined) {
    if (TransformEntity$Wonderjs.isSame(currentParent, parent)) {
      return Result$Wonderjs.succeed(undefined);
    } else {
      _removeFromParent(currentParent, child);
      return _addToParent(parent, child);
    }
  } else {
    return _addToParent(parent, child);
  }
}

function markHierachyDirty(transform) {
  DirtyTransformDoService$Wonderjs.mark(transform, true);
  var children = getChildren(transform);
  if (children !== undefined) {
    return ListSt$Wonderjs.forEach(children, markHierachyDirty);
  }
  
}

function setParent(parent, child) {
  return Result$Wonderjs.mapSuccess(_setNewParent(parent, child), (function (param) {
                return markHierachyDirty(child);
              }));
}

exports.hasParent = hasParent;
exports.getParent = getParent;
exports.getChildren = getChildren;
exports._addToParent = _addToParent;
exports._removeParent = _removeParent;
exports._removeChild = _removeChild;
exports._removeFromParent = _removeFromParent;
exports.removeParent = removeParent;
exports._setNewParent = _setNewParent;
exports.markHierachyDirty = markHierachyDirty;
exports.setParent = setParent;
/* No side effect */
