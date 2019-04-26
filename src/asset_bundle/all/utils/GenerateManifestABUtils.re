open Js.Typed_array;

module RABAndSAB = {
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

  let getManifest = (manifestJsonByteLength, ab) => {
    let decoder = TextDecoder.newTextDecoder("utf-8");

    decoder
    |> TextDecoder.decodeUint8Array(
         Uint8Array.fromBufferRange(
           ab,
           ~offset=GenerateABUtils.getHeaderTotalByteLength(),
           ~length=manifestJsonByteLength,
         ),
       );
  };
};