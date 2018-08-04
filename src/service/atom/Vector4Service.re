open Js.Typed_array;

let transformMat4Tuple = ((x, y, z, w), mat4: Float32Array.t) => (
  Float32Array.unsafe_get(mat4, 0)
  *. x
  +. Float32Array.unsafe_get(mat4, 4)
  *. y
  +. Float32Array.unsafe_get(mat4, 8)
  *. z
  +. Float32Array.unsafe_get(mat4, 12)
  *. w,
  Float32Array.unsafe_get(mat4, 1)
  *. x
  +. Float32Array.unsafe_get(mat4, 5)
  *. y
  +. Float32Array.unsafe_get(mat4, 9)
  *. z
  +. Float32Array.unsafe_get(mat4, 13)
  *. w,
  Float32Array.unsafe_get(mat4, 2)
  *. x
  +. Float32Array.unsafe_get(mat4, 6)
  *. y
  +. Float32Array.unsafe_get(mat4, 10)
  *. z
  +. Float32Array.unsafe_get(mat4, 14)
  *. w,
  Float32Array.unsafe_get(mat4, 3)
  *. x
  +. Float32Array.unsafe_get(mat4, 7)
  *. y
  +. Float32Array.unsafe_get(mat4, 11)
  *. z
  +. Float32Array.unsafe_get(mat4, 15)
  *. w,
);