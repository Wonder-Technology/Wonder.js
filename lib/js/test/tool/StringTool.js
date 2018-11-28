'use strict';


function removeNewLines(str) {
  return str.replace((/\n/img), "");
}

function removeSpaces(str) {
  return str.replace((/\s/img), "");
}

exports.removeNewLines = removeNewLines;
exports.removeSpaces = removeSpaces;
/* No side effect */
