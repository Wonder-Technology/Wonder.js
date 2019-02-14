type worker;

type imageBitmap;

type offscreen;

type sharedArrayBuffer;

external sharedArrayBufferToArrayBuffer :
  sharedArrayBuffer => Js.Typed_array.ArrayBuffer.t =
  "%identity";

external arrayBufferToSharedArrayBuffer :
  Js.Typed_array.ArrayBuffer.t => sharedArrayBuffer =
  "%identity";

external sparseMapImageBitmapToSparseMapImageElement :
  WonderCommonlib.MutableSparseMapService.t(imageBitmap) =>
  WonderCommonlib.MutableSparseMapService.t(WonderWebgl.DomExtendType.imageElement) =
  "%identity";

external imageBitmapToImageElement :
  imageBitmap => WonderWebgl.DomExtendType.imageElement =
  "%identity";