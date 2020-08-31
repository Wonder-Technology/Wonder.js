'use strict';


function create(name) {
  return /* Pipeline */{
          _0: name
        };
}

function value(pipeline) {
  return pipeline._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
