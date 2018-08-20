open Js.Typed_array;

let buildLoadedDataView = (totalLoadedByteLength, loadedUint8ArrayArr) => {
  let (_, uint8Array) =
    loadedUint8ArrayArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (byteOffset, uint8Array), loadedUint8Array) => {
           uint8Array
           |> Uint8Array.setArrayOffset(
                loadedUint8Array |> Obj.magic,
                byteOffset,
              );

           (
             byteOffset + (loadedUint8Array |> Uint8Array.byteLength),
             uint8Array,
           );
         },
         (0, Uint8Array.fromLength(totalLoadedByteLength)),
       );

  uint8Array |> Obj.magic |> DataViewCommon.create;
};