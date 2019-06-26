type textureUnit = int;

type textureType =
  | BasicSource
  | ArrayBufferViewSource
  | Cubemap;


type filter =
  | Nearest
  | Linear
  | Nearest_mipmap_nearest
  | Linear_mipmap_nearest
  | Nearest_mipmap_linear
  | Linear_mipmap_linear;

type wrap =
  | Clamp_to_edge
  | Mirrored_repeat
  | Repeat;

type isNeedUpdate =
  | Not_needUpdate
  | NeedUpdate;

type isFlipY =
  | Not_flipy
  | Flipy;

type format =
  | Rgb
  | Rgba
  | Alpha
  | Luminance
  | LuminanceAlpha
  | Rgbs3tcdxt1
  | Rgbas3tcdxt1
  | Rgbas3tcdxt3
  | Rgbas3tcdxt5;

external uint8ToWrap: Js.Typed_array.Uint8Array.elt => wrap = "%identity";

external wrapToUint8: wrap => Js.Typed_array.Uint8Array.elt = "%identity";

external uint8ToFilter: Js.Typed_array.Uint8Array.elt => filter = "%identity";

external filterToUint8: filter => Js.Typed_array.Uint8Array.elt = "%identity";

external uint8ToIsNeedUpdate: Js.Typed_array.Uint8Array.elt => isNeedUpdate =
  "%identity";

external formatToUint8: format => Js.Typed_array.Uint8Array.elt = "%identity";

external uint8ToFormat: Js.Typed_array.Uint8Array.elt => format = "%identity";

external isNeedUpdateToUint8: isNeedUpdate => Js.Typed_array.Uint8Array.elt =
  "%identity";

external uint8ToIsFlipY: Js.Typed_array.Uint8Array.elt => isFlipY =
  "%identity";

external isFlipYToUint8: isFlipY => Js.Typed_array.Uint8Array.elt =
  "%identity";