open Js.Typed_array;

open TypeArrayUtils;

let setLocalPositionTypeArr
    (index: int)
    (positions: Js.Array.t float)
    (localPositions: Float32Array.t) =>
  setFloat3 index positions localPositions;

let setLocalToWorldMatricesTypeArr
    (index: int)
    (mat: Js.Array.t float)
    (localToWorldMatrices: Float32Array.t) =>
  setFloat16 index mat localToWorldMatrices;