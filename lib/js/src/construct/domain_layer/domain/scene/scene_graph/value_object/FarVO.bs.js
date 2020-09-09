'use strict';


function create(value) {
  return /* Far */{
          _0: value
        };
}

function value(far) {
  return far._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
