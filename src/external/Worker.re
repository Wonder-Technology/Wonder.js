open WorkerType;

[@bs.new] external newWorker : string => worker = "Worker";

/* [@bs.val] external sharedArrayBuffer : sharedArrayBuffer = "SharedArrayBuffer"; */
[@bs.new] external newSharedArrayBuffer : int => sharedArrayBuffer = "SharedArrayBuffer";

external sharedArrayBufferToArrayBuffer : sharedArrayBuffer => Js.Typed_array.ArrayBuffer.t =
  "%identity";

external arrayBufferToSharedArrayBuffer : Js.Typed_array.ArrayBuffer.t => sharedArrayBuffer =
  "%identity";

[@bs.send.pipe : worker] external postMessage : Js.t({..}) => unit = "";

[@bs.send.pipe : worker]
external postMessageWithTransferData : (Js.t({..}), array('transferData)) => unit =
  "postMessage";

[@bs.send.pipe : DomType.htmlElement] external transferControlToOffscreen : offscreen = "";