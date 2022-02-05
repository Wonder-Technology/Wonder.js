'use strict';

var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");

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

exports.create = create;
/* No side effect */
