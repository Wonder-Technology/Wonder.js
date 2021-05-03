'use strict';


function removeNewLines(str) {
  return str.replace((/\n/img), "");
}

function removeSpaces(str) {
  return str.replace((/\s/img), "");
}

function removeNewLinesAndSpaces(str) {
  return removeSpaces(removeNewLines(str));
}

exports.removeNewLines = removeNewLines;
exports.removeSpaces = removeSpaces;
exports.removeNewLinesAndSpaces = removeNewLinesAndSpaces;
/* No side effect */
