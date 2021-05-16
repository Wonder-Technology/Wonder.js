


function removeNewLines(str) {
  return str.replace((/\n/img), "");
}

function removeSpaces(str) {
  return str.replace((/\s/img), "");
}

function removeNewLinesAndSpaces(str) {
  return removeSpaces(removeNewLines(str));
}

export {
  removeNewLines ,
  removeSpaces ,
  removeNewLinesAndSpaces ,
  
}
/* No side effect */
