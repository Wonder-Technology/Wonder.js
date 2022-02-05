'use strict';

var Main$WonderEngineCore = require("wonder-engine-core/lib/js/src/Main.bs.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var Vector3$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Vector3.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Quaternion$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Quaternion.bs.js");
var Index$WonderComponentTypeTransform = require("wonder-component-type-transform/lib/js/index.bs.js");

function getDirection(directionLightData, transformData, light) {
  return OptionSt$WonderCommonlib.toNullable(OptionSt$WonderCommonlib.bind(ArraySt$WonderCommonlib.getFirst(Main$WonderEngineCore.getComponentGameObjects(directionLightData, light)), (function (gameObject) {
                    return OptionSt$WonderCommonlib.map(OptionSt$WonderCommonlib.fromNullable(Main$WonderEngineCore.getComponent(transformData, gameObject)), (function (transform) {
                                  return Vector3$WonderCommonlib.transformQuat(Quaternion$WonderCommonlib.setFromEulerAngles(Main$WonderEngineCore.getComponentData(transformData, transform, Index$WonderComponentTypeTransform.dataName.eulerAngles)), [
                                              0,
                                              0,
                                              1
                                            ]);
                                }));
                  })));
}

exports.getDirection = getDirection;
/* Main-WonderEngineCore Not a pure module */
