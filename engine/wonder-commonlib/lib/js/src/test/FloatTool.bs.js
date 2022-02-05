'use strict';


function truncateFloatValue(value, digit) {
  return Number(value.toFixed(digit));
}

exports.truncateFloatValue = truncateFloatValue;
/* No side effect */
