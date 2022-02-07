

import * as ImmutableHashMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _createStateContainer(param) {
  return {
          state: undefined
        };
}

var stateContainer = {
  state: undefined
};

function setState(state) {
  stateContainer.state = state;
  
}

function unsafeGetState(param) {
  return stateContainer.state;
}

function register(name, data) {
  return setState({
              dataMap: ImmutableHashMap$WonderCommonlib.set(stateContainer.state.dataMap, name, data)
            });
}

function unsafeGet(name) {
  return ImmutableHashMap$WonderCommonlib.unsafeGet(stateContainer.state.dataMap, name);
}

function init(param) {
  return setState({
              dataMap: ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined)
            });
}

export {
  _createStateContainer ,
  stateContainer ,
  setState ,
  unsafeGetState ,
  register ,
  unsafeGet ,
  init ,
  
}
/* No side effect */
