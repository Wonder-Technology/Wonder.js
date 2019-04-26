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

let computeByteLength = (bufferTotalAlignedByteLength, jsonUint8Array) => {
  let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    getHeaderTotalByteLength()
    + jsonAlignedByteLength
    + bufferTotalAlignedByteLength;

  (jsonByteLength, jsonAlignedByteLength, totalByteLength);
};

let buildJsonUint8Array = jsonRecord => {
  let encoder = TextEncoder.newTextEncoder();

  encoder
  |> TextEncoder.encodeUint8Array(
       jsonRecord |> Obj.magic |> Js.Json.stringify,
     );
};

let readHeader = dataView => {
  let (jsonByteLength, byteOffset) =
    DataViewCommon.getUint32_1(. 0, dataView);

  let (bufferByteLength, byteOffset) =
    DataViewCommon.getUint32_1(. byteOffset, dataView);

  (byteOffset, jsonByteLength, bufferByteLength);
};

let getJsonStr = (jsonByteLength, rab) => {
  let decoder = TextDecoder.newTextDecoder("utf-8");

  decoder
  |> TextDecoder.decodeUint8Array(
       Uint8Array.fromBufferRange(
         rab,
         ~offset=getHeaderTotalByteLength(),
         ~length=jsonByteLength,
       ),
     );
};

let getBuffer = (jsonByteLength, rab) =>
  rab
  |> ArrayBuffer.sliceFrom(
       getHeaderTotalByteLength() + jsonByteLength |> BufferUtils.alignedLength,
     );