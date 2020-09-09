'use strict';


function transposeSelf(mat) {
  var a01 = mat[1];
  var a02 = mat[2];
  var a12 = mat[5];
  mat[1] = mat[3];
  mat[2] = mat[6];
  mat[3] = a01;
  mat[5] = mat[7];
  mat[6] = a02;
  mat[7] = a12;
  return mat;
}

exports.transposeSelf = transposeSelf;
/* No side effect */
