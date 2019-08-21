type mimeType = string;

type basicSourceTextureImageUint8ArrayData = (
  mimeType,
  Js.Typed_array.Uint8Array.t,
);

type cubemapTextureImageUint8ArrayData = {
  pxImageUint8ArrayData: (mimeType, Js.Typed_array.Uint8Array.t),
  nxImageUint8ArrayData: (mimeType, Js.Typed_array.Uint8Array.t),
  pyImageUint8ArrayData: (mimeType, Js.Typed_array.Uint8Array.t),
  nyImageUint8ArrayData: (mimeType, Js.Typed_array.Uint8Array.t),
  pzImageUint8ArrayData: (mimeType, Js.Typed_array.Uint8Array.t),
  nzImageUint8ArrayData: (mimeType, Js.Typed_array.Uint8Array.t),
};

type basicSourceTextureImageUint8ArrayDataMap =
  WonderCommonlib.MutableSparseMapService.t(
    basicSourceTextureImageUint8ArrayData,
  );

type cubemapTextureImageUint8ArrayDataMap =
  WonderCommonlib.MutableSparseMapService.t(
    cubemapTextureImageUint8ArrayData,
  );