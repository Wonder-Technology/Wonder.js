'use strict';

var Main$WonderCore = require("wonder-core/lib/js/src/Main.bs.js");
var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Matrix4$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix4.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var NullableTool$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/test/NullableTool.bs.js");
var Index$WonderComponentTypeTransform = require("wonder-component-type-transform/lib/js/index.bs.js");
var Index$WonderComponentTypeBasiccameraview = require("wonder-component-type-basiccameraview/lib/js/index.bs.js");

function getViewWorldToCameraMatrix(basicCameraViewData, transformData, cameraView) {
  return OptionSt$WonderCommonlib.toNullable(OptionSt$WonderCommonlib.bind(OptionSt$WonderCommonlib.bind(ArraySt$WonderCommonlib.getFirst(Main$WonderCore.getComponentGameObjects(basicCameraViewData, cameraView)), (function (gameObject) {
                        return OptionSt$WonderCommonlib.fromNullable(Main$WonderCore.getComponent(transformData, gameObject));
                      })), (function (transform) {
                    return OptionSt$WonderCommonlib.map(OptionSt$WonderCommonlib.fromNullable(Main$WonderCore.getComponentData(transformData, transform, Index$WonderComponentTypeTransform.dataName.localToWorldMatrix)), (function (localToWorldMatrix) {
                                  return Matrix4$WonderCommonlib.invert(Matrix4$WonderCommonlib.createIdentityMatrix4(undefined), localToWorldMatrix);
                                }));
                  })));
}

function _isActive(data, cameraView) {
  return NullableTool$WonderCommonlib.getExn(Main$WonderCore.getComponentData(data, cameraView, Index$WonderComponentTypeBasiccameraview.dataName.active));
}

function _checkAtMostTwo(activeCameraViews, isDebug) {
  return Contract$WonderCommonlib.ensureCheck(activeCameraViews, (function (r) {
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("only has one active cameraView at most", "not"), (function (param) {
                              return Contract$WonderCommonlib.Operators.$less$eq(ArraySt$WonderCommonlib.length(Log$WonderCommonlib.printForDebug(r)), 1);
                            }));
              }), isDebug);
}

function getActiveCameraView(data, isDebug) {
  return OptionSt$WonderCommonlib.toNullable(OptionSt$WonderCommonlib.map(ArraySt$WonderCommonlib.getFirst(_checkAtMostTwo(ArraySt$WonderCommonlib.filter(Main$WonderCore.getAllComponents(data), (function (param) {
                                return _isActive(data, param);
                              })), isDebug)), (function (prim) {
                    return prim;
                  })));
}

exports.getViewWorldToCameraMatrix = getViewWorldToCameraMatrix;
exports._isActive = _isActive;
exports._checkAtMostTwo = _checkAtMostTwo;
exports.getActiveCameraView = getActiveCameraView;
/* Main-WonderCore Not a pure module */
