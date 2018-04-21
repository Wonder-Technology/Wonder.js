open StateDataMainType;

open GameObjectType;

let execJob = (flags, state) => {
  let (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr) =
    DisposeJobUtils.execJob(state);
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeBoxGeometryVboBuffer(boxGeometryNeedDisposeVboBufferArr)
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr
         )
  }
};