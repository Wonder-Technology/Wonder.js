type filter =
  | NEAREST
  | LINEAR
  | NEAREST_MIPMAP_NEAREST
  | LINEAR_MIPMAP_NEAREST
  | NEAREST_MIPMAP_LINEAR
  | LINEAR_MIPMAP_LINEAR;

type wrap =
  | CLAMP_TO_EDGE
  | MIRRORED_REPEAT
  | REPEAT;

type isNeedUpdate =
  | NOT_NEEDUPDATE
  | NEEDUPDATE;

type isFlipY =
  | NOT_FLIPY
  | FLIPY;

type sourceTextureRecord = {buffer: WorkerType.sharedArrayBuffer};

external uint8ToWrap : Js.Typed_array.Uint8Array.elt => wrap = "%identity";

external wrapToUint8 : wrap => Js.Typed_array.Uint8Array.elt = "%identity";

external uint8ToFilter : Js.Typed_array.Uint8Array.elt => filter = "%identity";

external filterToUint8 : filter => Js.Typed_array.Uint8Array.elt = "%identity";

external uint8ToIsNeedUpdate : Js.Typed_array.Uint8Array.elt => isNeedUpdate =
  "%identity";

external isNeedUpdateToUint8 : isNeedUpdate => Js.Typed_array.Uint8Array.elt =
  "%identity";

external uint8ToIsFlipY : Js.Typed_array.Uint8Array.elt => isFlipY =
  "%identity";

external isFlipYToUint8 : isFlipY => Js.Typed_array.Uint8Array.elt =
  "%identity";