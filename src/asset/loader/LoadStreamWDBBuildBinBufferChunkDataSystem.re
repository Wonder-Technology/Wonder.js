open WonderBsMost;

open Js.Promise;

open Js.Typed_array;

open StreamType;

let rec _build =
        (
          completeStreamChunkTotalLoadedAlignedByteLength,
          totalLoadedByteLength,
          nextStreamChunkIndex,
          streamChunkArr,
          loadedArrayBuffer,
          images,
          loadedStreamChunkDataArr,
        ) =>
  nextStreamChunkIndex >= Js.Array.length(streamChunkArr) ?
    (nextStreamChunkIndex, loadedStreamChunkDataArr) :
    {
      let {byteLength, index, type_}: streamUnitData =
        Array.unsafe_get(streamChunkArr, nextStreamChunkIndex);

      /* WonderLog.Log.print(("nextStreamChunkIndex: ", nextStreamChunkIndex))
         |> ignore; */

      let nextCompleteStreamChunkTotalLoadedByteLength =
        completeStreamChunkTotalLoadedAlignedByteLength + byteLength;

      /* WonderLog.Log.print((
           nextCompleteStreamChunkTotalLoadedByteLength,
           totalLoadedByteLength,
         ))
         |> ignore; */

      nextCompleteStreamChunkTotalLoadedByteLength > totalLoadedByteLength ?
        (nextStreamChunkIndex, loadedStreamChunkDataArr) :
        {
          let loadedStreamChunkDataArr =
            switch (type_) {
            | Vertex
            | Normal
            | TexCoord
            | Index =>
              loadedStreamChunkDataArr
              |> ArrayService.push(
                   {
                     geometryData:
                       Some({
                         meshIndex: index,
                         arrayBuffer:
                           ArrayBuffer.slice(
                             ~start=completeStreamChunkTotalLoadedAlignedByteLength,
                             ~end_=nextCompleteStreamChunkTotalLoadedByteLength,
                             loadedArrayBuffer,
                           ),
                       }),
                     imageData: None,
                     type_,
                   }: loadedStreamData,
                 )
            | Image =>
              let imageIndex = index;

              let {name, mimeType}: WDType.image =
                Array.unsafe_get(
                  images |> OptionService.unsafeGetJsonSerializedValue,
                  imageIndex,
                );

              loadedStreamChunkDataArr
              |> ArrayService.push(
                   {
                     geometryData: None,
                     imageData:
                       Some({
                         name,
                         imageIndex,
                         mimeType,
                         arrayBuffer:
                           ArrayBuffer.slice(
                             ~start=completeStreamChunkTotalLoadedAlignedByteLength,
                             ~end_=nextCompleteStreamChunkTotalLoadedByteLength,
                             loadedArrayBuffer,
                           ),
                       }),
                     type_,
                   }: loadedStreamData,
                 );
            };

          _build(
            nextCompleteStreamChunkTotalLoadedByteLength
            |> BufferUtils.alignedLength,
            totalLoadedByteLength,
            nextStreamChunkIndex |> succ,
            streamChunkArr,
            loadedArrayBuffer,
            images,
            loadedStreamChunkDataArr,
          );
        };
    };

let _splitLoadedStreamChunkArrByJudgeHasAllGeometryPointDataOrHasImageData =
    (
      nextStreamChunkIndex,
      streamChunkArr: array(StreamType.streamUnitData),
      loadedStreamChunkDataArr: array(loadedStreamData),
    ) => {
  let (
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  ) =
    loadedStreamChunkDataArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (
             loadedStreamChunkArrWhichNotHasAllData,
             loadedStreamChunkDataArrWhichHasAllData,
           ),
           ({geometryData, imageData, type_}: loadedStreamData) as data,
         ) =>
           switch (type_) {
           | Index
           | Image => (
               [||],
               loadedStreamChunkDataArrWhichHasAllData
               |> Js.Array.concat(
                    loadedStreamChunkArrWhichNotHasAllData
                    |> ArrayService.push(data),
                  ),
             )
           | _ => (
               loadedStreamChunkArrWhichNotHasAllData
               |> ArrayService.push(data),
               loadedStreamChunkDataArrWhichHasAllData,
             )
           },
         ([||], [||]),
       );

  nextStreamChunkIndex === Js.Array.length(streamChunkArr)
  ||
  Array.unsafe_get(streamChunkArr, nextStreamChunkIndex).type_ === StreamType.Vertex ?
    (
      [||],
      loadedStreamChunkDataArrWhichHasAllData
      |> Js.Array.concat(loadedStreamChunkArrWhichNotHasAllData),
    ) :
    (
      loadedStreamChunkArrWhichNotHasAllData,
      loadedStreamChunkDataArrWhichHasAllData,
    );
};

let _loadBlobImageFromImageArrayBufferData =
    (loadedStreamChunkDataArr: array(loadedStreamData), loadBlobImageMap) => {
  let resultLoadedStreamChunkDataArr = [||];

  Most.from(loadedStreamChunkDataArr)
  |> Most.concatMap(({geometryData, imageData, type_}: loadedStreamData) =>
       switch (type_) {
       | Image =>
         let {name, imageIndex, mimeType, arrayBuffer} =
           imageData |> OptionService.unsafeGet;

         switch (
           loadBlobImageMap
           |> WonderCommonlib.SparseMapService.get(imageIndex)
         ) {
         | Some(image) =>
           resultLoadedStreamChunkDataArr
           |> ArrayService.push(
                {
                  geometryData: None,
                  imageData: Some({imageIndex, image}),
                  type_,
                }: loadedStreamBlobData,
              )
           |> ignore;

           Most.empty();
         | None =>
           AssembleUtils.buildLoadImageStream(
             arrayBuffer,
             mimeType,
             {j|load image error. imageIndex: $imageIndex|j},
           )
           |> Most.tap(image => {
                ImageUtils.setImageName(image, name);

                resultLoadedStreamChunkDataArr
                |> ArrayService.push(
                     {
                       geometryData: None,
                       imageData: Some({imageIndex, image}),
                       type_,
                     }: loadedStreamBlobData,
                   )
                |> ignore;

                loadBlobImageMap
                |> WonderCommonlib.SparseMapService.set(imageIndex, image)
                |> ignore;
              })
           |> Most.map(_ => ())
         };

       | _ =>
         resultLoadedStreamChunkDataArr
         |> ArrayService.push({geometryData, imageData: None, type_})
         |> ignore;

         Most.empty();
       }
     )
  |> Most.drain
  |> then_(() =>
       (resultLoadedStreamChunkDataArr, loadBlobImageMap) |> resolve
     );
};

let buildBinBufferChunkData =
    (
      nextStreamChunkIndex,
      loadedStreamChunkArrWhichNotHasAllData,
      completeStreamChunkTotalLoadedAlignedByteLength,
      totalLoadedByteLength,
      loadedArrayBuffer,
      streamChunkArr,
      loadBlobImageMap,
      images,
    ) => {
  /* WonderLog.Log.print((
       "completeStreamChunkTotalLoadedAlignedByteLength: ",
       completeStreamChunkTotalLoadedAlignedByteLength,
     ))
     |> ignore; */

  let (nextStreamChunkIndex, loadedStreamChunkDataArr) =
    _build(
      completeStreamChunkTotalLoadedAlignedByteLength,
      totalLoadedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
      loadedArrayBuffer,
      images,
      loadedStreamChunkArrWhichNotHasAllData,
    );

  /* WonderLog.Log.print(("loadedStreamChunkDataArr:", loadedStreamChunkDataArr))
     |> ignore; */

  let (
    loadedStreamChunkArrWhichNotHasAllData,
    loadedStreamChunkDataArrWhichHasAllData,
  ) =
    loadedStreamChunkDataArr
    |> _splitLoadedStreamChunkArrByJudgeHasAllGeometryPointDataOrHasImageData(
         nextStreamChunkIndex,
         streamChunkArr,
       );

  _loadBlobImageFromImageArrayBufferData(
    loadedStreamChunkDataArrWhichHasAllData,
    loadBlobImageMap,
  )
  |> then_(
       ((resultLoadedStreamChunkDataArrWhichHasAllData, loadBlobImageMap)) =>
       (
         resultLoadedStreamChunkDataArrWhichHasAllData,
         nextStreamChunkIndex,
         loadedStreamChunkArrWhichNotHasAllData,
         loadBlobImageMap,
       )
       |> resolve
     );
};