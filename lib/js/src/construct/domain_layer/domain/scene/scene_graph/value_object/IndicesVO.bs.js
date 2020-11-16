'use strict';


function create(value) {
  return /* Indices */{
          _0: value
        };
}

function value(indices) {
  return indices._0;
}

function getCount(indices) {
  return indices._0.length;
}

exports.create = create;
exports.value = value;
exports.getCount = getCount;
/* No side effect */
