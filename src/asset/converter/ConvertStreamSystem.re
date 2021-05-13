open Js.Typed_array;

let getDefault11ImageUint8ArrayData = () => (
  Uint8Array.make([|
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10,
    0,
    0,
    0,
    13,
    73,
    72,
    68,
    82,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    8,
    6,
    0,
    0,
    0,
    31,
    21,
    196,
    137,
    0,
    0,
    0,
    13,
    73,
    68,
    65,
    84,
    24,
    87,
    99,
    248,
    255,
    255,
    255,
    25,
    0,
    9,
    200,
    3,
    202,
    69,
    126,
    87,
    75,
    0,
    0,
    0,
    0,
    73,
    69,
    78,
    68,
    174,
    66,
    96,
    130,
  |]),
  "image/png",
  {|load default11 image error|},
);

/* let _getDefault11ImageUint8ArrayAlignedByteLength = () =>
   70 |> BufferUtils.alignedLength; */

let _check = (currentByteOffset, endByteOffset) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|currentByteOffset === endByteOffset|j},
                ~actual={j|not|j},
              ),
              () =>
              currentByteOffset == endByteOffset
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
};

let getStreamChunkArr = ((jsonChunkLength, streamChunkLength), dataView) => {
  let currentByteOffset =
    BufferUtils.getWDBHeaderTotalByteLength()
    + (jsonChunkLength |> BufferUtils.alignedLength);

  let endByteOffset = currentByteOffset + streamChunkLength;

  let currentByteOffsetRef = ref(currentByteOffset);
  let streamChunkArr = [||];

  while (currentByteOffsetRef^ < endByteOffset) {
    let (byteLength, currentByteOffset) =
      DataViewCommon.getUint32_1(. currentByteOffsetRef^, dataView);

    let (componentType, currentByteOffset) =
      DataViewCommon.getUint16_1(. currentByteOffset, dataView);

    let (index, currentByteOffset) =
      DataViewCommon.getUint32_1(. currentByteOffset, dataView);

    let (type_, currentByteOffset) =
      DataViewCommon.getUint8_1(currentByteOffset, dataView);

    currentByteOffsetRef := currentByteOffset;

    streamChunkArr
    |> ArrayService.push(
         {
           byteLength,
           componentType,
           index,
           type_: type_ |> StreamType.uint8ToChunk,
         }: StreamType.streamUnitData,
       );
  };

  _check(currentByteOffsetRef^, endByteOffset);

  streamChunkArr;
};

let _writeStreamChunk = (streamChunkArr, byteOffset, dataView) => {
  /* WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               BufferUtils.checkByteLengthShouldBeAligned(
                 streamChunkArrAlignedByteLength,
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     ); */

  let byteOffset =
    streamChunkArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           byteOffset,
           {byteLength, componentType, index, type_}: StreamType.streamUnitData,
         ) => {
           let byteOffset =
             DataViewCommon.writeUint32_1(byteLength, byteOffset, dataView);

           let byteOffset =
             DataViewCommon.writeUint16_1(
               componentType,
               byteOffset,
               dataView,
             );

           let byteOffset =
             DataViewCommon.writeUint32_1(index, byteOffset, dataView);

           let byteOffset =
             DataViewCommon.writeUint8_1(.
               type_ |> StreamType.chunkToUint8,
               byteOffset,
               dataView,
             );

           byteOffset;
         },
         byteOffset,
       )
    |> BufferUtils.alignedLength;

  (byteOffset, dataView);
};

let _getStreamChunkArrByteLength = streamChunkArr =>
  (
    Uint32Array._BYTES_PER_ELEMENT
    * 2
    + Uint16Array._BYTES_PER_ELEMENT
    + Uint8Array._BYTES_PER_ELEMENT
  )
  * Js.Array.length(streamChunkArr);

let getStreamChunkTotalByteLength = streamChunkArr =>
  _getStreamChunkArrByteLength(streamChunkArr);

let buildStreamChunk = (byteOffset, streamChunkArr, dataView) =>
  _writeStreamChunk(streamChunkArr, byteOffset, dataView);

let _getBinBufferAlignedByteLength = bufferViewDataArr =>
  bufferViewDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. byteLength, (_, _, alignedByteLength)) =>
         byteLength + alignedByteLength,
       0,
     );

let _writeBinBufferByBufferViewData =
    (
      totalByteOffset,
      (
        oldBufferView: GLTFType.bufferView,
        newBufferView: GLTFType.bufferView,
        alignedByteLength,
      ),
      binBufferDataView,
      totalDataView,
    ) => {
  let bufferViewByteOffsetRef =
    ref(BufferUtils.unsafeGetBufferViewByteOffset(oldBufferView));
  let totalByteOffsetRef = ref(totalByteOffset);

  let binBuffer = binBufferDataView |> DataView.buffer;
  let totalBuffer = totalDataView |> DataView.buffer;

  BufferUtils.mergeUint8Array(
    Uint8Array.fromBuffer(totalBuffer),
    Uint8Array.fromBuffer(binBuffer)
    |> Uint8Array.subarray(
         ~start=bufferViewByteOffsetRef^,
         ~end_=bufferViewByteOffsetRef^ + oldBufferView.byteLength,
       ),
    totalByteOffsetRef^,
  );

  (totalByteOffset + alignedByteLength, binBufferDataView, totalDataView);
};

let getBinBufferChunkTotalAlignedByteLength = bufferViewDataArr =>
  _getBinBufferAlignedByteLength(bufferViewDataArr);

let buildBinBufferChunk = (byteOffset, bufferViewDataArr, binBuffer, dataView) => {
  let binBufferDataView = DataViewCommon.create(binBuffer);

  let (byteOffset, binBufferDataView, dataView) =
    bufferViewDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (totalByteOffset, binBufferDataView, dataView), bufferViewData) =>
           _writeBinBufferByBufferViewData(
             totalByteOffset,
             bufferViewData,
             binBufferDataView,
             dataView,
           ),
         (byteOffset, binBufferDataView, dataView),
       );

  (byteOffset, dataView);
};
