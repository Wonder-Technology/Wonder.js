open WonderBsMost;

open Js.Promise;

open Js.Typed_array;

open StreamType;

let _computeCompleteStreamChunkTotalLoadedAlignedByteLength =
    (
      headerJsonStreamChunkTotalByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    ) =>
  headerJsonStreamChunkTotalByteLength
  + (
    streamChunkArr
    |> Js.Array.slice(~start=0, ~end_=nextStreamChunkIndex)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. chunkByteLength, {byteLength}: streamUnitData) =>
           chunkByteLength + (byteLength |> BufferUtils.alignedLength),
         0,
       )
  );

let _isLoadCompleteNextStreamChunkData =
    (
      totalLoadedByteLength,
      completeStreamChunkTotalLoadedAlignedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|nextStreamChunkIndex not out of bounds|j},
                ~actual={j|out|j},
              ),
              () =>
              nextStreamChunkIndex <= Js.Array.length(streamChunkArr) - 1
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let {byteLength} = Array.unsafe_get(streamChunkArr, nextStreamChunkIndex);

  totalLoadedByteLength >= completeStreamChunkTotalLoadedAlignedByteLength
  + (byteLength |> BufferUtils.alignedLength);
};

let handleBinBufferData =
    (
      (
        headerJsonStreamChunkTotalByteLength,
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      ),
      (
        nextStreamChunkIndex,
        streamChunkArr,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ),
      (
        _,
        (geometryArr, geometryGameObjects, gameObjectGeometrys),
        (basicSourceTextureArr, imageTextureIndices, images),
      ) as assembleData,
      state,
    ) => {
  let completeStreamChunkTotalLoadedAlignedByteLength =
    _computeCompleteStreamChunkTotalLoadedAlignedByteLength(
      headerJsonStreamChunkTotalByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    );

  /* WonderLog.Log.print((
       "headerJsonStreamChunkTotalByteLength: ",
       headerJsonStreamChunkTotalByteLength,
     ))
     |> ignore; */

  !
    _isLoadCompleteNextStreamChunkData(
      totalLoadedByteLength,
      completeStreamChunkTotalLoadedAlignedByteLength,
      nextStreamChunkIndex,
      streamChunkArr,
    ) ?
    /* TODO optimize: not use promise here? */
    make((~resolve, ~reject) =>
      resolve(. (
        state,
        streamChunkArr,
        assembleData,
        nextStreamChunkIndex,
        loadedStreamChunkArrWhichNotHasAllData,
        loadBlobImageMap,
      ))
    ) :
    LoadStreamWDBBuildBinBufferChunkDataSystem.buildBinBufferChunkData(
      nextStreamChunkIndex,
      loadedStreamChunkArrWhichNotHasAllData,
      completeStreamChunkTotalLoadedAlignedByteLength,
      totalLoadedByteLength,
      LoadStreamWDBUtil.buildLoadedDataView(
        totalLoadedByteLength,
        loadedUint8ArrayArr,
      )
      |> DataView.buffer,
      streamChunkArr,
      loadBlobImageMap,
      images,
    )
    |> then_(
         (
           (
             loadedStreamChunkDataArrWhichHasAllData,
             nextStreamChunkIndex,
             loadedStreamChunkArrWhichNotHasAllData,
             loadBlobImageMap,
           ),
         ) => {
         let state =
           LoadStreamWDBSetBinBufferChunkDataSystem.setBinBufferChunkData(
             loadedStreamChunkDataArrWhichHasAllData,
             (geometryArr, geometryGameObjects, gameObjectGeometrys),
             (basicSourceTextureArr, imageTextureIndices),
             state,
           );

         (
           state,
           streamChunkArr,
           assembleData,
           nextStreamChunkIndex,
           loadedStreamChunkArrWhichNotHasAllData,
           loadBlobImageMap,
         )
         |> resolve;
       });
};