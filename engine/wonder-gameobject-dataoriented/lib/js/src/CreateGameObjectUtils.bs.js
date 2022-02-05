'use strict';


function create(state) {
  var uid = state.maxUID;
  state.maxUID = uid + 1 | 0;
  return [
          state,
          uid
        ];
}

exports.create = create;
/* No side effect */
