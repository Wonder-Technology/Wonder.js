'use strict';


function create(index) {
  return /* BSDFMaterial */{
          _0: index
        };
}

function value(bsdfMaterial) {
  return bsdfMaterial._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
