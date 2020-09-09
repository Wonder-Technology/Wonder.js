'use strict';


function create(index) {
  return /* DirectionLight */{
          _0: index
        };
}

function value(directionLight) {
  return directionLight._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
