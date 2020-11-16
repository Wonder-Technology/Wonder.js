'use strict';


function create(value) {
  return /* GameObject */{
          _0: value
        };
}

function value(gameObject) {
  return gameObject._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
