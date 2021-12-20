'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var BufferComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/BufferComponentUtils.bs.js");
var ConfigUtils$WonderComponentTransform = require("../config/ConfigUtils.bs.js");
var DirtyTransformUtils$WonderComponentTransform = require("../operate_data/DirtyTransformUtils.bs.js");

function _initDataWhenCreate(childrenMap, index) {
  MutableSparseMap$WonderCommonlib.set(childrenMap, index, []);
  
}

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  state.maxIndex = newIndex;
  _initDataWhenCreate(state.childrenMap, index);
  var state$1 = DirtyTransformUtils$WonderComponentTransform.mark(state, index, true);
  return [
          state$1,
          BufferComponentUtils$WonderCommonlib.checkNotExceedMaxCountByIndex(ConfigUtils$WonderComponentTransform.getIsDebug(state$1), index, ConfigUtils$WonderComponentTransform.getTransformCount(state$1))
        ];
}

exports._initDataWhenCreate = _initDataWhenCreate;
exports.create = create;
/* No side effect */
