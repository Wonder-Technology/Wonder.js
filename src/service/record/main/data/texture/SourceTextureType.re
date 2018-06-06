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

type sourceTextureRecord = {buffer: WorkerType.sharedArrayBuffer};

external uint8ToWrap : Js.Typed_array.Uint8Array.elt => wrap = "%identity";

external wrapToUint8 : wrap => Js.Typed_array.Uint8Array.elt = "%identity";

external uint8ToFilter : Js.Typed_array.Uint8Array.elt => filter = "%identity";

external filterToUint8 : filter => Js.Typed_array.Uint8Array.elt = "%identity";
/*
 external uint8ToMinFilter : Js.Typed_array.Uint8Array.elt => minFilter =
   "%identity";

 external minFilterToUint8 : minFilter => Js.Typed_array.Uint8Array.elt =
   "%identity"; */