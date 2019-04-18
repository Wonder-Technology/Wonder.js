open Js.Typed_array;

module All = {
  let readHeader = dataView => {
    let (manifestJsonByteLength, byteOffset) =
      DataViewCommon.getUint32_1(. 0, dataView);

    let (contentBufferByteLength, byteOffset) =
      DataViewCommon.getUint32_1(. byteOffset, dataView);

    (byteOffset, manifestJsonByteLength, contentBufferByteLength);
  };

  let getContentBuffer = (manifestJsonByteLength, ab) =>
    ab
    |> ArrayBuffer.sliceFrom(
         GenerateABUtils.getHeaderTotalByteLength()
         + manifestJsonByteLength
         |> BufferUtils.alignedLength,
       );
};

module RAB = {};

module SAB = {};