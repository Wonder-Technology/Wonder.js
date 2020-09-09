'use strict';


function create(value) {
  return /* NormalMatrix */{
          _0: value
        };
}

function value(mat) {
  return mat._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
