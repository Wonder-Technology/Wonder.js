open Js.Typed_array;

let copyArrayBufferData = (sourceBuffer, targetBuffer) => {
  let targetView = Uint8Array.fromBuffer(targetBuffer |> Worker.sharedArrayBufferToArrayBuffer);
  TypeArrayService.setUint8Array(
    Uint8Array.fromBuffer(sourceBuffer |> Worker.sharedArrayBufferToArrayBuffer),
    targetView
  )
  |> Uint8Array.buffer
  |> Worker.arrayBufferToSharedArrayBuffer
};

let copyArrayBufferSpecificData = (sourceBuffer, targetBuffer, totalByteLength) => {
  let offset = 0;
  let length = totalByteLength / 1;
  let targetView =
    Uint8Array.fromBufferRange(
      targetBuffer |> Worker.sharedArrayBufferToArrayBuffer,
      ~offset,
      ~length
    );
  TypeArrayService.setUint8Array(
    Uint8Array.fromBufferRange(
      sourceBuffer |> Worker.sharedArrayBufferToArrayBuffer,
      ~offset,
      ~length
    ),
    targetView
  )
  |> Uint8Array.buffer
  |> Worker.arrayBufferToSharedArrayBuffer
};

let copyArrayBuffer = (buffer, totalByteLength) =>
  switch totalByteLength {
  | 0 => buffer
  | _ =>
    buffer
    |> Worker.sharedArrayBufferToArrayBuffer
    |> ArrayBuffer.slice(~start=0, ~end_=totalByteLength)
    |> Worker.arrayBufferToSharedArrayBuffer
  };