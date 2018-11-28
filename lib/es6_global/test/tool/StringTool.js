


function removeNewLines(str) {
  return str.replace((/\n/img), "");
}

function removeSpaces(str) {
  return str.replace((/\s/img), "");
}

export {
  removeNewLines ,
  removeSpaces ,
  
}
/* No side effect */
