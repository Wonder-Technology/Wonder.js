'use strict';


function create(value) {
  return /* Metalness */{
          _0: value
        };
}

function value(metalness) {
  return metalness._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
