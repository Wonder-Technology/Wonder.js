open Js.Typed_array;

/* let copyArrayBufferData = (sourceBuffer, targetBuffer) => {
  let targetView =
    Uint8Array.fromBuffer(targetBuffer |> WorkerType.sharedArrayBufferToArrayBuffer);
  TypeArrayService.setUint8Array(
    Uint8Array.fromBuffer(sourceBuffer |> WorkerType.sharedArrayBufferToArrayBuffer),
    targetView
  )
  |> Uint8Array.buffer
  |> WorkerType.arrayBufferToSharedArrayBuffer
}; */

let copyArrayBufferSpecificData = (sourceBuffer, targetBuffer, totalByteLength) => {
  let offset = 0;
  let length = totalByteLength / 1;
  let targetView =
    Uint8Array.fromBufferRange(
      targetBuffer |> WorkerType.sharedArrayBufferToArrayBuffer,
      ~offset,
      ~length
    );
  TypeArrayService.setUint8Array(
    Uint8Array.fromBufferRange(
      sourceBuffer |> WorkerType.sharedArrayBufferToArrayBuffer,
      ~offset,
      ~length
    ),
    targetView
  )
  |> Uint8Array.buffer
  |> WorkerType.arrayBufferToSharedArrayBuffer
};

let copyArrayBuffer = (buffer, totalByteLength) =>
  switch totalByteLength {
  | 0 => buffer
  | _ =>
    buffer
    |> WorkerType.sharedArrayBufferToArrayBuffer
    |> ArrayBuffer.slice(~start=0, ~end_=totalByteLength)
    |> WorkerType.arrayBufferToSharedArrayBuffer
  };