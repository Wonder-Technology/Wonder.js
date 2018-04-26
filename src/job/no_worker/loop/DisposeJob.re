open StateDataMainType;

open GameObjectType;

let execJob = (flags, state) => {
  let (
    state,
    boxGeometryNeedDisposeVboBufferArr,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr
  ) =
    DisposeJobUtils.execJob(
      DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
      state
    );
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeBoxGeometryVboBuffer(boxGeometryNeedDisposeVboBufferArr)
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr
         )
      |> DisposeVboBufferService.disposeSourceInstanceVboBuffer(
           sourceInstanceNeedDisposeVboBufferArr
         )
  }
};