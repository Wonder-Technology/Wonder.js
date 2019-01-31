type indices;

external indices16ToIndices : Js.Typed_array.Uint16Array.t => indices =
  "%identity";

external indices32ToIndices : Js.Typed_array.Uint32Array.t => indices =
  "%identity";

external indicesToIndices16 : indices => Js.Typed_array.Uint16Array.t =
  "%identity";