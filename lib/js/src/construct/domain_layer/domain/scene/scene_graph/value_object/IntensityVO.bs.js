'use strict';


function create(value) {
  return /* Intensity */{
          _0: value
        };
}

function value(intensity) {
  return intensity._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
