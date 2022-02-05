

import * as Log$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Exception$OrillusionCommonlib from "../../../../../../node_modules/orillusion-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as Index$OrillusionComponentTypeTransformWorker from "../../../../../../node_modules/orillusion-component-type-transform-worker/lib/es6_global/index.bs.js";
import * as ModelMatrixTransformUtils$OrillusionComponentWorkerUtils from "../../../../../../node_modules/orillusion-component-worker-utils/lib/es6_global/src/transform/ModelMatrixTransformUtils.bs.js";

function getData(state, transform, dataName) {
  if (dataName === Index$OrillusionComponentTypeTransformWorker.dataName.localToWorldMatrix) {
    return ModelMatrixTransformUtils$OrillusionComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform);
  } else {
    return Exception$OrillusionCommonlib.throwErr(Log$OrillusionCommonlib.buildFatalMessage("getData", "unknown dataName:" + dataName, "", "", ""));
  }
}

export {
  getData ,
  
}
/* No side effect */
