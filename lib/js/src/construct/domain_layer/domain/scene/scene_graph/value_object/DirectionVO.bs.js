'use strict';


function create(value) {
  return /* Direction */{
          _0: value
        };
}

function value(direction) {
  return direction._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
