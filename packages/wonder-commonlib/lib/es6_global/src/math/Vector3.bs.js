


function _transformMat4ToTuple(param, mat4) {
  var z = param[2];
  var y = param[1];
  var x = param[0];
  var w = mat4[3] * x + mat4[7] * y + mat4[11] * z + mat4[15];
  var d = w;
  w = d !== 0 ? d : 1.0;
  return [
          (mat4[0] * x + mat4[4] * y + mat4[8] * z + mat4[12]) / w,
          (mat4[1] * x + mat4[5] * y + mat4[9] * z + mat4[13]) / w,
          (mat4[2] * x + mat4[6] * y + mat4[10] * z + mat4[14]) / w
        ];
}

var transformMat4Tuple = _transformMat4ToTuple;

function add(kind, param, param$1) {
  return [
          param[0] + param$1[0],
          param[1] + param$1[1],
          param[2] + param$1[2]
        ];
}

function multiply(kind, param, param$1) {
  return [
          param[0] * param$1[0],
          param[1] * param$1[1],
          param[2] * param$1[2]
        ];
}

function sub(kind, param, param$1) {
  return [
          param[0] - param$1[0],
          param[1] - param$1[1],
          param[2] - param$1[2]
        ];
}

function scale(kind, param, scalar) {
  return [
          param[0] * scalar,
          param[1] * scalar,
          param[2] * scalar
        ];
}

function cross(param, param$1) {
  var z2 = param$1[2];
  var y2 = param$1[1];
  var x2 = param$1[0];
  var z1 = param[2];
  var y1 = param[1];
  var x1 = param[0];
  return [
          y1 * z2 - y2 * z1,
          z1 * x2 - z2 * x1,
          x1 * y2 - x2 * y1
        ];
}

function dot(param, param$1) {
  return param[0] * param$1[0] + param[1] * param$1[1] + param[2] * param$1[2];
}

function normalize(param) {
  var z = param[2];
  var y = param[1];
  var x = param[0];
  var d = Math.sqrt(x * x + y * y + z * z);
  if (d === 0) {
    return [
            0,
            0,
            0
          ];
  } else {
    return [
            x / d,
            y / d,
            z / d
          ];
  }
}

var transformQuat = (function(q, a){
     // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    let x = a[0], y = a[1], z = a[2];
    // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);
    let uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x;
    // var uuv = vec3.cross([], qvec, uv);
    let uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx;
    // vec3.scale(uv, uv, 2 * w);
    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    // vec3.scale(uuv, uuv, 2);
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    // return vec3.add(out, a, vec3.add(out, uv, uuv));

    return [

x + uvx + uuvx,
y + uvy + uuvy,
z + uvz + uuvz

    ]

  });

export {
  _transformMat4ToTuple ,
  transformMat4Tuple ,
  add ,
  multiply ,
  sub ,
  scale ,
  cross ,
  dot ,
  normalize ,
  transformQuat ,
  
}
/* No side effect */
