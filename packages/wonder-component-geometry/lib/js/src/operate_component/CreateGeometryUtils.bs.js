'use strict';

var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/BufferComponentUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  state.maxIndex = newIndex;
  return [
          state,
          BufferComponentUtils$WonderCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$WonderComponentGeometry.getIsDebug(state), index, ConfigUtils$WonderComponentGeometry.getGeometryCount(state))
        ];
}

exports.create = create;
/* No side effect */
