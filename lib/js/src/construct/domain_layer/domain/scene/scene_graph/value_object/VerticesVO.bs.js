'use strict';


function create(value) {
  return /* Vertices */{
          _0: value
        };
}

function value(vertices) {
  return vertices._0;
}

function getCount(vertices) {
  return vertices._0.length / 3 | 0;
}

exports.create = create;
exports.value = value;
exports.getCount = getCount;
/* No side effect */
