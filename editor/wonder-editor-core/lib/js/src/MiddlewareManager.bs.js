'use strict';

var ImmutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

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

exports._createStateContainer = _createStateContainer;
exports.stateContainer = stateContainer;
exports.setState = setState;
exports.unsafeGetState = unsafeGetState;
exports.register = register;
exports.unsafeGet = unsafeGet;
exports.init = init;
/* No side effect */
