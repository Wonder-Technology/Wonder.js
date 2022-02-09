


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

export {
  isEmpty ,
  isNotInMap ,
  isInMap ,
  
}
/* No side effect */
