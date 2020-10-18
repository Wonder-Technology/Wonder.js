'use strict';


function create(value) {
  return /* IOR */{
          _0: value
        };
}

function value(ior) {
  return ior._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
