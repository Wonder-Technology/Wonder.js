open Js.Typed_array;

let buildLoadedDataView =
    (totalLoadedByteLength, (loadedUint8ArrayArr, totalUint8Array)) => {
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
         (0, totalUint8Array),
       );

  uint8Array |> Uint8Array.buffer |> DataViewCommon.create;
};