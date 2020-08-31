'use strict';


function isEmpty(value) {
  if (value === null) {
    return true;
  } else {
    return value === undefined;
  }
}

exports.isEmpty = isEmpty;
/* No side effect */
