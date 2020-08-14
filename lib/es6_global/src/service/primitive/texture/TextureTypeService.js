


function getUnsignedByte(param) {
  return 0;
}

function getUnsignedShort565(param) {
  return 1;
}

function getUnsignedShort4444(param) {
  return 2;
}

function getUnsignedShort5551(param) {
  return 3;
}

function getGlType(gl, type_) {
  if (type_ === 0) {
    return gl.UNSIGNED_BYTE;
  } else if (type_ === 1) {
    return gl.UNSIGNED_SHORT_5_6_5;
  } else if (type_ === 2) {
    return gl.UNSIGNED_SHORT_4_4_4_4;
  } else {
    return gl.UNSIGNED_SHORT_5_5_5_1;
  }
}

export {
  getUnsignedByte ,
  getUnsignedShort565 ,
  getUnsignedShort4444 ,
  getUnsignedShort5551 ,
  getGlType ,
  
}
/* No side effect */
