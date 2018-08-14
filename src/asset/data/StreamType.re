type chunk =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Image;

type streamUnitData = {
  byteLength: int,
  type_: chunk,
};

external uint8ToChunk : Js.Typed_array.Uint8Array.elt => chunk = "%identity";

external chunkToUint8 : chunk => Js.Typed_array.Uint8Array.elt = "%identity";