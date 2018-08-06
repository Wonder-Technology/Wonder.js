open StateDataMainType;

open GameObjectType;

let execJob = (flags, state) => {
  let (
    state,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    DisposeJobUtils.execJob(
      DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
      DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponentForWorker,
      state,
    );
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr,
         )
      |> DisposeVboBufferService.disposeSourceInstanceVboBuffer(
           sourceInstanceNeedDisposeVboBufferArr,
         ),
  };
};