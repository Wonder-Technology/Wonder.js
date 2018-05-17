open WorkerType;

let _isSupportSharedArrayBuffer = [%bs.raw
  {|
    function(){
        return typeof SharedArrayBuffer !== "undefined"
    }
    |}
];

let isSupportSharedArrayBuffer = () => _isSupportSharedArrayBuffer() |> Js.to_bool;

[@bs.new] external newWorker : string => worker = "Worker";

/* [@bs.val] external sharedArrayBuffer : sharedArrayBuffer = "SharedArrayBuffer"; */
[@bs.new] external _newSharedArrayBuffer : int => sharedArrayBuffer = "SharedArrayBuffer";

[@bs.new] external _newArrayBufferToBeSharedArrayBuffer : int => sharedArrayBuffer = "ArrayBuffer";

external sharedArrayBufferToArrayBuffer : sharedArrayBuffer => Js.Typed_array.ArrayBuffer.t =
  "%identity";

external arrayBufferToSharedArrayBuffer : Js.Typed_array.ArrayBuffer.t => sharedArrayBuffer =
  "%identity";

[@bs.send.pipe : worker] external postMessage : Js.t({..}) => unit = "";

[@bs.send.pipe : worker]
external postMessageWithTransferData : (Js.t({..}), array('transferData)) => unit =
  "postMessage";

[@bs.send.pipe : DomType.htmlElement] external transferControlToOffscreen : offscreen = "";

let newSharedArrayBuffer = (totalByteLength) =>
  isSupportSharedArrayBuffer() ?
    _newSharedArrayBuffer(totalByteLength) : _newArrayBufferToBeSharedArrayBuffer(totalByteLength);