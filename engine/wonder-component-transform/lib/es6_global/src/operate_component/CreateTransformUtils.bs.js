

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as IndexComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/IndexComponentUtils.bs.js";
import * as BufferComponentUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/BufferComponentUtils.bs.js";
import * as ConfigUtils$WonderComponentTransform from "../config/ConfigUtils.bs.js";
import * as DirtyTransformUtils$WonderComponentTransform from "../operate_data/DirtyTransformUtils.bs.js";

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

export {
  _initDataWhenCreate ,
  create ,
  
}
/* No side effect */
