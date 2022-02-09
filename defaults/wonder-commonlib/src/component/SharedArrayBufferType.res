type sharedArrayBuffer

external sharedArrayBufferToArrayBuffer: sharedArrayBuffer => Js.Typed_array.ArrayBuffer.t =
  "%identity"
