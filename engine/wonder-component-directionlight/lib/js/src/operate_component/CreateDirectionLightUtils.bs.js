'use strict';

var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/BufferComponentUtils.bs.js");
var ConfigUtils$WonderComponentDirectionlight = require("../config/ConfigUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  state.maxIndex = newIndex;
  return [
          state,
          BufferComponentUtils$WonderCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$WonderComponentDirectionlight.getIsDebug(state), index, ConfigUtils$WonderComponentDirectionlight.getDirectionLightCount(state))
        ];
}

exports.create = create;
/* No side effect */
