open Js.Typed_array;

let getHeaderTotalByteLength = () => 8;

let writeHeader = (jsonByteLength, bufferAlignedByteLength, dataView) =>
  dataView
  |> DataViewCommon.writeUint32_1(jsonByteLength, 0)
  |> DataViewCommon.writeUint32_1(bufferAlignedByteLength, _, dataView);

let getEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder();
  let emptyUint8DataArr = encoder |> TextEncoder.encodeUint8Array(" ");

  Uint8Array.unsafe_get(emptyUint8DataArr, 0);
};

let _writeUint8ArrayToArrayBufferWithEmptyData =
    (
      byteOffset,
      (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
      dataView,
    ) => {
  let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength;
  let byteOffset = ref(byteOffset);
  let uint8ArrayByteLength = uint8Array |> Uint8Array.length;

  for (i in 0 to uint8ArrayAlignedByteLength - 1) {
    let value =
      if (i >= uint8ArrayByteLength) {
        emptyUint8Data;
      } else {
        Uint8Array.unsafe_get(uint8Array, i);
      };

    byteOffset := DataViewCommon.writeUint8_1(. value, byteOffset^, dataView);
  };

  (resultByteOffset, uint8Array, dataView);
};

let writeJson =
    (
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    ) =>
  _writeUint8ArrayToArrayBufferWithEmptyData(
    byteOffset,
    (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
    dataView,
  );

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

let computeByteLength = (bufferTotalAlignedByteLength, jsonUint8Array) => {
  let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    getHeaderTotalByteLength()
    + jsonAlignedByteLength
    + bufferTotalAlignedByteLength;

  (jsonByteLength, jsonAlignedByteLength, totalByteLength);
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

let buildJsonUint8Array = jsonRecord => {
  let encoder = TextEncoder.newTextEncoder();

  encoder
  |> TextEncoder.encodeUint8Array(
       jsonRecord |> Obj.magic |> Js.Json.stringify,
     );
};