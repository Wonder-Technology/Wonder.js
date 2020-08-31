'use strict';


function create(index) {
  return /* Transform */{
          _0: index
        };
}

function value(transform) {
  return transform._0;
}

function isSame(tran1, tran2) {
  return tran1._0 === tran2._0;
}

exports.create = create;
exports.value = value;
exports.isSame = isSame;
/* No side effect */
