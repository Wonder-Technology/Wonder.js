type worker;

type offscreen;

type sharedArrayBuffer;

external sharedArrayBufferToArrayBuffer : sharedArrayBuffer => Js.Typed_array.ArrayBuffer.t =
  "%identity";

external arrayBufferToSharedArrayBuffer : Js.Typed_array.ArrayBuffer.t => sharedArrayBuffer =
  "%identity";