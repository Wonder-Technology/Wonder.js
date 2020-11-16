'use strict';


function create(index) {
  return /* Geometry */{
          _0: index
        };
}

function value(geometry) {
  return geometry._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
