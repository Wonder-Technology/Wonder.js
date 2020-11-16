'use strict';


function create(value) {
  return /* Transform */{
          _0: value
        };
}

function value(transform) {
  return transform._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
