'use strict';


function create(value) {
  return /* Aspect */{
          _0: value
        };
}

function value(aspect) {
  return aspect._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
