'use strict';


function create(param) {
  return /* Color3 */{
          _0: param[0],
          _1: param[1],
          _2: param[2]
        };
}

function value(color) {
  return [
          color._0,
          color._1,
          color._2
        ];
}

exports.create = create;
exports.value = value;
/* No side effect */
