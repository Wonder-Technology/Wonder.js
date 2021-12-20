

import * as IndexComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/IndexComponentUtils.bs.js";

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  return [
          {
            config: state.config,
            maxIndex: newIndex,
            isActiveMap: state.isActiveMap,
            gameObjectMap: state.gameObjectMap,
            gameObjectBasicCameraViewMap: state.gameObjectBasicCameraViewMap
          },
          index
        ];
}

export {
  create ,
  
}
/* No side effect */
