'use strict';


function create(value) {
  return /* Wrap */{
          _0: value
        };
}

function value(wrap) {
  return wrap._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
