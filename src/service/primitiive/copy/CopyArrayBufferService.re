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

let copyArrayBuffer = (buffer, totalByteLength) =>
  buffer
  |> Worker.sharedArrayBufferToArrayBuffer
  |> ArrayBuffer.slice(~start=0, ~end_=totalByteLength)
  |> Worker.arrayBufferToSharedArrayBuffer;