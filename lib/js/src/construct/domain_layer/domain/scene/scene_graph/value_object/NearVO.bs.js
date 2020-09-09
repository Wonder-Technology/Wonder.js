'use strict';


function create(value) {
  return /* Near */{
          _0: value
        };
}

function value(near) {
  return near._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
