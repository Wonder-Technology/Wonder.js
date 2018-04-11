external arrayUint8EltToUint8 : array(Js.Typed_array.Uint8Array.elt) => Js.Typed_array.Uint8Array.t =
  "%identity";

external uint8ToArrayUint8Elt : Js.Typed_array.Uint8Array.t => array(Js.Typed_array.Uint8Array.elt) =
  "%identity";