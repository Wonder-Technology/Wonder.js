

import * as Main$WonderCore from "../../../../../node_modules/wonder-core/lib/es6_global/src/Main.bs.js";
import * as Log$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Matrix4$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Contract$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as NullableTool$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/test/NullableTool.bs.js";
import * as Index$WonderComponentTypeTransform from "../../../../../node_modules/wonder-component-type-transform/lib/es6_global/index.bs.js";
import * as Index$WonderComponentTypeBasiccameraview from "../../../../../node_modules/wonder-component-type-basiccameraview/lib/es6_global/index.bs.js";

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

export {
  getViewWorldToCameraMatrix ,
  _isActive ,
  _checkAtMostTwo ,
  getActiveCameraView ,
  
}
/* Main-WonderCore Not a pure module */
