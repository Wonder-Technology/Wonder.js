


function transformMat4Tuple(param, mat4) {
  var w = param[3];
  var z = param[2];
  var y = param[1];
  var x = param[0];
  return /* tuple */[
          mat4[0] * x + mat4[4] * y + mat4[8] * z + mat4[12] * w,
          mat4[1] * x + mat4[5] * y + mat4[9] * z + mat4[13] * w,
          mat4[2] * x + mat4[6] * y + mat4[10] * z + mat4[14] * w,
          mat4[3] * x + mat4[7] * y + mat4[11] * z + mat4[15] * w
        ];
}

export {
  transformMat4Tuple ,
  
}
/* No side effect */
