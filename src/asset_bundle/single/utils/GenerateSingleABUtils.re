open GenerateABUtils;

open Js.Typed_array;

let _writeBuffer =
    (
      headerAndJsonAlignedByteOffset,
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageUint8ArrayArr,
        geometryUint8ArrayArr: array(Uint8Array.t),
      ),
      arrayBuffer,
    ) => {
  let uint8Array = Uint8Array.fromBuffer(arrayBuffer);
  let uint8Array =
    imageBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. uint8Array, (byteOffset, byteLength), index) => {
           let imageUint8Array = Array.unsafe_get(imageUint8ArrayArr, index);

           BufferUtils.mergeUint8Array(
             uint8Array,
             imageUint8Array,
             headerAndJsonAlignedByteOffset + byteOffset,
           );
         },
         uint8Array,
       );

  let uint8Array =
    geometryBufferViewArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. uint8Array, (byteOffset, byteLength), index) => {
           let geometryUint8Array =
             Array.unsafe_get(geometryUint8ArrayArr, index);

           BufferUtils.mergeUint8Array(
             uint8Array,
             geometryUint8Array,
             headerAndJsonAlignedByteOffset + byteOffset,
           );
         },
         uint8Array,
       );

  uint8Array |> Uint8Array.buffer;
};

let generateAB =
    (
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageUint8ArrayArr,
        geometryUint8ArrayArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    ) => {
  let (jsonByteLength, jsonAlignedByteLength, totalByteLength) =
    computeByteLength(bufferTotalAlignedByteLength, jsonUint8Array);

  let dataView = DataViewCommon.create(ArrayBuffer.make(totalByteLength));

  let byteOffset =
    writeHeader(jsonByteLength, bufferTotalAlignedByteLength, dataView);

  let emptyEncodedUint8Data = getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    );

  _writeBuffer(
    byteOffset,
    (
      (imageBufferViewArr, geometryBufferViewArr),
      imageUint8ArrayArr,
      geometryUint8ArrayArr,
    ),
    dataView |> DataView.buffer,
  );
};