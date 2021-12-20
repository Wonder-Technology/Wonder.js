

import * as Main$WonderCore from "../../../../../node_modules/wonder-core/lib/es6_global/src/Main.bs.js";
import * as Matrix4$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Matrix4.bs.js";
import * as Quaternion$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/math/Quaternion.bs.js";
import * as NullableTool$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/test/NullableTool.bs.js";
import * as Index$WonderComponentTypeTransform from "../../../../../node_modules/wonder-component-type-transform/lib/es6_global/index.bs.js";

function lookAt(data, transform, target, upOpt, param) {
  var up = upOpt !== undefined ? upOpt : [
      0,
      1,
      0
    ];
  return Main$WonderCore.setComponentData(data, transform, Index$WonderComponentTypeTransform.dataName.rotation, Quaternion$WonderCommonlib.setFromMatrix(Matrix4$WonderCommonlib.setLookAt(NullableTool$WonderCommonlib.getExn(Main$WonderCore.getComponentData(data, transform, Index$WonderComponentTypeTransform.dataName.position)), target, up)));
}

export {
  lookAt ,
  
}
/* Main-WonderCore Not a pure module */
