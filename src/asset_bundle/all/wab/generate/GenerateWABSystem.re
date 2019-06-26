open WABType;

open Js.Typed_array;

let _computeByteLength = jsonUint8Array => {
  let jsonByteLength = jsonUint8Array |> Uint8Array.byteLength;

  let jsonAlignedByteLength = jsonByteLength |> BufferUtils.alignedLength;

  let totalByteLength =
    GenerateWABUtils.getHeaderTotalByteLength() + jsonAlignedByteLength;

  (jsonByteLength, jsonAlignedByteLength, totalByteLength);
};

let _writeHeader = (jsonByteLength, dataView) =>
  dataView |> DataViewCommon.writeUint32_1(jsonByteLength, 0);

let generate = (version, wholeDependencyRelation, wholeHashIdMap) => {
  let jsonUint8Array =
    {
      version,
      wholeHashIdMap,
      wholeDependencyRelationMap: wholeDependencyRelation,
    }
    |> GenerateABUtils.buildJsonUint8Array;

  let (jsonByteLength, jsonAlignedByteLength, totalByteLength) =
    _computeByteLength(jsonUint8Array);

  let dataView = DataViewCommon.create(ArrayBuffer.make(totalByteLength));

  let byteOffset = _writeHeader(jsonByteLength, dataView);

  let emptyEncodedUint8Data = GenerateABUtils.getEmptyEncodedUint8Data();

  let (byteOffset, _, dataView) =
    GenerateABUtils.writeJson(
      byteOffset,
      (emptyEncodedUint8Data, jsonAlignedByteLength, jsonUint8Array),
      dataView,
    );

  dataView |> DataView.buffer;
};