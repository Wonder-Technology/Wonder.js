'use strict';


function create(name) {
  return /* Job */{
          _0: name
        };
}

function value(job) {
  return job._0;
}

exports.create = create;
exports.value = value;
/* No side effect */
