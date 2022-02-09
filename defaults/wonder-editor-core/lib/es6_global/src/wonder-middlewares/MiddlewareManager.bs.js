

import * as ImmutableHashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function register(state, name, middlewareData) {
  return {
          middlewareDataMap: ImmutableHashMap$WonderCommonlib.set(state.middlewareDataMap, name, middlewareData),
          middlewareStateMap: state.middlewareStateMap
        };
}

function unsafeGetData(state, name) {
  return ImmutableHashMap$WonderCommonlib.unsafeGet(state.middlewareDataMap, name);
}

function setState(state, name, middlewareState) {
  return {
          middlewareDataMap: state.middlewareDataMap,
          middlewareStateMap: ImmutableHashMap$WonderCommonlib.set(state.middlewareStateMap, name, middlewareState)
        };
}

function unsafeGetState(state, name) {
  return ImmutableHashMap$WonderCommonlib.unsafeGet(state.middlewareStateMap, name);
}

function init(param) {
  return {
          middlewareDataMap: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
          middlewareStateMap: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
        };
}

function buildAPI(param) {
  return {
          unsafeGetData: unsafeGetData,
          unsafeGetState: unsafeGetState,
          setState: setState
        };
}

export {
  register ,
  unsafeGetData ,
  setState ,
  unsafeGetState ,
  init ,
  buildAPI ,
  
}
/* No side effect */
