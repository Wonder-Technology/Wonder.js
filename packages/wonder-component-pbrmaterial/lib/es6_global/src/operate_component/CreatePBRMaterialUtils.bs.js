

import * as IndexComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/BufferComponentUtils.bs.js";
import * as ConfigUtils$WonderComponentPbrmaterial from "../config/ConfigUtils.bs.js";

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  state.maxIndex = newIndex;
  return [
          state,
          BufferComponentUtils$WonderCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$WonderComponentPbrmaterial.getIsDebug(state), index, ConfigUtils$WonderComponentPbrmaterial.getPBRMaterialCount(state))
        ];
}

export {
  create ,
  
}
/* No side effect */
