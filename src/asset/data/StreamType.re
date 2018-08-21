type chunk =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Image;

type streamUnitData = {
  byteLength: int,
  index: int,
  type_: chunk,
};

type loadedStreamGeometryData = {
  meshIndex: int,
  arrayBuffer: Js.Typed_array.ArrayBuffer.t,
};

type loadedStreamImageData = {
  imageIndex: int,
  mimeType: string,
  arrayBuffer: Js.Typed_array.ArrayBuffer.t,
};

type loadedStreamData = {
  geometryData: option(loadedStreamGeometryData),
  imageData: option(loadedStreamImageData),
  type_: chunk,
};

type loadedStreamImageBlobData = {
  imageIndex: int,
  image: ImageType.image,
};

type loadedStreamBlobData = {
  geometryData: option(loadedStreamGeometryData),
  imageData: option(loadedStreamImageBlobData),
  type_: chunk,
};

exception ReadError;

external uint8ToChunk : Js.Typed_array.Uint8Array.elt => chunk = "%identity";

external chunkToUint8 : chunk => Js.Typed_array.Uint8Array.elt = "%identity";