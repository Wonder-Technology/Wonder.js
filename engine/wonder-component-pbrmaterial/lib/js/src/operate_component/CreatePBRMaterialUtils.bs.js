'use strict';

var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/BufferComponentUtils.bs.js");
var ConfigUtils$WonderComponentPbrmaterial = require("../config/ConfigUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  state.maxIndex = newIndex;
  return [
          state,
          BufferComponentUtils$WonderCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$WonderComponentPbrmaterial.getIsDebug(state), index, ConfigUtils$WonderComponentPbrmaterial.getPBRMaterialCount(state))
        ];
}

exports.create = create;
/* No side effect */
