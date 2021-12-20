'use strict';


function getDegToRad(param) {
  return Math.PI / 180;
}

function getRadToDeg(param) {
  return 180 / Math.PI;
}

exports.getDegToRad = getDegToRad;
exports.getRadToDeg = getRadToDeg;
/* No side effect */
