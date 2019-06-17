open StateDataMainType;

let execJob = (_, state) => {
  /* let {index, disposedIndexArray} =
     RecordLightMaterialMainService.getRecord(state); */

  InitNoMaterialShaderService.init(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    /* (
         JudgeInstanceMainService.buildMap(
           index,
           RecordLightMaterialMainService.getRecord(state).gameObjectsMap,
           gameObjectRecord,
         ),
         JudgeInstanceMainService.isSupportInstance(state),
       ), */
    CreateInitNoMaterialShaderStateMainService.createInitNoMaterialShaderState(
      /* (index, disposedIndexArray), */
      state,
    ),
  )
  |> ignore;

  state;
};