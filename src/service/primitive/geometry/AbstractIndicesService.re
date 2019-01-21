open AbstractIndicesType;

open Js.Typed_array;

let getIndicesLength = (indices: indices) =>
  Uint16Array.length(indices |> indicesToIndices16);

let unsafeGetIndex = (index, indices: indices) =>
  Uint16Array.unsafe_get(indices |> indicesToIndices16, index);