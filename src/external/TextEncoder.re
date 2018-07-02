open TextEncoderType;

open Js.Typed_array;

[@bs.new] external newTextEncoder : unit => textEncoder = "TextEncoder";

[@bs.send.pipe: textEncoder]
external encodeUint8Array : string => Uint8Array.t = "encode";