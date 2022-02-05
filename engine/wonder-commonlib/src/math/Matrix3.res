open Js.Typed_array

let createIdentityMatrix3 = () => Float32Array.make([1., 0., 0., 0., 1., 0., 0., 0., 1.])

let transposeSelf = (mat: Float32Array.t) => {
  let a01 = Float32Array.unsafe_get(mat, 1)
  let a02 = Float32Array.unsafe_get(mat, 2)
  let a12 = Float32Array.unsafe_get(mat, 5)
  Float32Array.unsafe_set(mat, 1, Float32Array.unsafe_get(mat, 3))
  Float32Array.unsafe_set(mat, 2, Float32Array.unsafe_get(mat, 6))
  Float32Array.unsafe_set(mat, 3, a01)
  Float32Array.unsafe_set(mat, 5, Float32Array.unsafe_get(mat, 7))
  Float32Array.unsafe_set(mat, 6, a02)
  Float32Array.unsafe_set(mat, 7, a12)
  mat
}
