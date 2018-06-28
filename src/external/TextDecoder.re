open TextDecoderType;

open Js.Typed_array;

[@bs.new] external newTextDecoder : string => textDecoder = "TextDecoder";

[@bs.send.pipe: textDecoder]
external decodeUint8Array : Uint8Array.t => string = "decode";