'use strict';


function create(value) {
  return /* Axis */{
          _0: value
        };
}

function value(axis) {
  return axis._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
