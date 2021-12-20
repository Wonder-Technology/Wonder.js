open Js.Typed_array

type rec number<_> = Float: number<float>

type t = (float, float, float)

let _transformMat4ToTuple = ((x, y, z), mat4) => {
  let w = ref(
    Float32Array.unsafe_get(mat4, 3) *. x +.
    Float32Array.unsafe_get(mat4, 7) *. y +.
    Float32Array.unsafe_get(mat4, 11) *. z +.
    Float32Array.unsafe_get(mat4, 15),
  )
  w :=
    switch w.contents {
    | 0. => 1.0
    | d => d
    }
  (
    (Float32Array.unsafe_get(mat4, 0) *. x +.
    Float32Array.unsafe_get(mat4, 4) *. y +.
    Float32Array.unsafe_get(mat4, 8) *. z +.
    Float32Array.unsafe_get(mat4, 12)) /. w.contents,
    (Float32Array.unsafe_get(mat4, 1) *. x +.
    Float32Array.unsafe_get(mat4, 5) *. y +.
    Float32Array.unsafe_get(mat4, 9) *. z +.
    Float32Array.unsafe_get(mat4, 13)) /. w.contents,
    (Float32Array.unsafe_get(mat4, 2) *. x +.
    Float32Array.unsafe_get(mat4, 6) *. y +.
    Float32Array.unsafe_get(mat4, 10) *. z +.
    Float32Array.unsafe_get(mat4, 14)) /. w.contents,
  )
}

let transformMat4Tuple = (sourceVec3Tuple, mat4: Float32Array.t) =>
  _transformMat4ToTuple(sourceVec3Tuple, mat4)

let add = (type g, kind: number<g>, (x1, y1, z1), (x2, y2, z2)) =>
  switch kind {
  | Float => (x1 +. x2, y1 +. y2, z1 +. z2)
  }

let multiply = (type g, kind: number<g>, (x1, y1, z1), (x2, y2, z2)) =>
  switch kind {
  | Float => (x1 *. x2, y1 *. y2, z1 *. z2)
  }

let sub = (type g, kind: number<g>, (x1, y1, z1), (x2, y2, z2)) =>
  switch kind {
  | Float => (x1 -. x2, y1 -. y2, z1 -. z2)
  }

let scale = (type g, kind: number<g>, (x, y, z), scalar) =>
  switch kind {
  | Float => (x *. scalar, y *. scalar, z *. scalar)
  }

// let lerp = ((x1, y1, z1), (x2, y2, z2), t: float) => (
//   x1 +. t *. (x2 -. x1),
//   y1 +. t *. (y2 -. y1),
//   z1 +. t *. (z2 -. z1),
// )

let cross = ((x1, y1, z1), (x2, y2, z2)) => (
  y1 *. z2 -. y2 *. z1,
  z1 *. x2 -. z2 *. x1,
  x1 *. y2 -. x2 *. y1,
)

let dot = ((x1, y1, z1), (x2, y2, z2)) => x1 *. x2 +. y1 *. y2 +. z1 *. z2

let normalize = ((x, y, z)) => {
  let d = Js.Math.sqrt(x *. x +. y *. y +. z *. z)
  d === 0. ? (0., 0., 0.) : (x /. d, y /. d, z /. d)
}

let transformQuat = %bs.raw(`
  function(q, a){
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

  }
  `) // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed

// var qvec = [qx, qy, qz];
// var uv = vec3.cross([], qvec, a);

// var uuv = vec3.cross([], qvec, uv);

// vec3.scale(uv, uv, 2 * w);

// vec3.scale(uuv, uuv, 2);

// return vec3.add(out, a, vec3.add(out, uv, uuv));
