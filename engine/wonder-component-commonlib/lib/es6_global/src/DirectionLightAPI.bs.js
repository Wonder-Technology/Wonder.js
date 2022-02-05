

import * as Main$WonderEngineCore from "../../../../../node_modules/wonder-engine-core/lib/es6_global/src/Main.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as Vector3$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Vector3.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Quaternion$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as Index$WonderComponentTypeTransform from "../../../../../node_modules/wonder-component-type-transform/lib/es6_global/index.bs.js";

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

export {
  getDirection ,
  
}
/* Main-WonderEngineCore Not a pure module */
