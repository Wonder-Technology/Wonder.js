open Js.Typed_array;

let _fillVertexBuffer = (buffer, points, offset) => {
  TypeArrayService.setFloat32Array(
    points,
    Float32Array.fromBufferRange(
      buffer,
      ~offset,
      ~length=points |> Float32Array.length,
    ),
  )
  |> ignore;

  buffer;
};

let _fillIndex16Buffer = (buffer, indices16, offset) => {
  TypeArrayService.setUint16Array(
    indices16,
    Uint16Array.fromBufferRange(
      buffer,
      ~offset,
      ~length=indices16 |> Uint16Array.length,
    ),
  )
  |> ignore;

  buffer;
};

let _fillIndex32Buffer = (buffer, indices32, offset) => {
  TypeArrayService.setUint32Array(
    indices32,
    Uint32Array.fromBufferRange(
      buffer,
      ~offset,
      ~length=indices32 |> Uint32Array.length,
    ),
  )
  |> ignore;

  buffer;
};

let _fillImageUint8ArrayBuffer = (buffer, uint8Array, offset) => {
  TypeArrayService.setUint8Array(
    uint8Array,
    Uint8Array.fromBufferRange(
      buffer,
      ~offset,
      ~length=uint8Array |> Uint8Array.length,
    ),
  )
  |> ignore;

  buffer;
};

let build =
    (
      totalByteLength,
      (vertexDataArr, indexDataArr, index32DataArr),
      imageUint8DataArr,
    ) => {
  let buffer = ArrayBuffer.make(totalByteLength);

  let buffer =
    vertexDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. buffer, (bufferViewOffset, points)) =>
           _fillVertexBuffer(buffer, points, bufferViewOffset),
         buffer,
       );

  let buffer =
    indexDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. buffer, (bufferViewOffset, indices)) =>
           _fillIndex16Buffer(buffer, indices, bufferViewOffset),
         buffer,
       );

  let buffer =
    index32DataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. buffer, (bufferViewOffset, indices32)) =>
           _fillIndex32Buffer(buffer, indices32, bufferViewOffset),
         buffer,
       );

  imageUint8DataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. buffer, {uint8Array, byteOffset}: GenerateSceneGraphType.imageData) =>
         _fillImageUint8ArrayBuffer(buffer, uint8Array, byteOffset),
       buffer,
     );
};