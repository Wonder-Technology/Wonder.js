'use strict';


function create(uid) {
  return /* GameObject */{
          _0: uid
        };
}

function value(gameObject) {
  return gameObject._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
