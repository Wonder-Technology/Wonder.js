'use strict';


function isEmpty(value) {
  if (value === null) {
    return true;
  } else {
    return value === undefined;
  }
}

function isNotInMap(value) {
  return value === undefined;
}

function isInMap(value) {
  return value !== undefined;
}

exports.isEmpty = isEmpty;
exports.isNotInMap = isNotInMap;
exports.isInMap = isInMap;
/* No side effect */
