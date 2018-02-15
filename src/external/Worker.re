open WorkerType;

[@bs.new] external newWorker : string => worker = "Worker";

[@bs.val] external sharedArrayBuffer : Js.t({..}) = "SharedArrayBuffer";

[@bs.send.pipe : worker] external postMessage : Js.t({..}) => unit = "";

[@bs.send.pipe : worker]
external postMessageWithTransferData : (Js.t({..}), array('transferData)) => unit =
  "postMessage";