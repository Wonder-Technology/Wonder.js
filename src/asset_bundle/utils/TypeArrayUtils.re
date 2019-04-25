open Js.Typed_array;

let convertFloat32ToUint8 = float32Arr =>
  Uint8Array.fromBufferRange(
    float32Arr |> Float32Array.buffer,
    ~offset=float32Arr |> Float32Array.byteOffset,
    ~length=float32Arr |> Float32Array.byteLength,
  );

let convertUint16ToUint8 = uint16Arr =>
  Uint8Array.fromBufferRange(
    uint16Arr |> Uint16Array.buffer,
    ~offset=uint16Arr |> Uint16Array.byteOffset,
    ~length=uint16Arr |> Uint16Array.byteLength,
  );

let convertUint32ToUint8 = uint32Arr =>
  Uint8Array.fromBufferRange(
    uint32Arr |> Uint32Array.buffer,
    ~offset=uint32Arr |> Uint32Array.byteOffset,
    ~length=uint32Arr |> Uint32Array.byteLength,
  );