/* TODO duplicate with basic material */
open StateDataRenderWorkerType;

open RenderWorkerLightMaterialType;

let _createTypeArrays = (buffer, count, state) => {
  let (shaderIndices, diffuseColors, specularColors, shininess) =
    CreateTypeArrayLightMaterialService.createTypeArrays(buffer, count);
  state.lightMaterialRecord = Some({shaderIndices, diffuseColors, specularColors, shininess});
  state
};

let _initMaterials = (lightMaterialData, data, state) => {
  let {shaderIndices} = RecordLightMaterialRenderWorkerService.getRecord(state);
  let isSourceInstanceMap = lightMaterialData##isSourceInstanceMap;
  InitInitLightMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (
      isSourceInstanceMap,
      /* TODO get isSupportInstance by JudgeInstanceAllService.isSupportInstance */
      false
    ),
    CreateInitLightMaterialStateRenderWorkerService.createInitMaterialState(
      (lightMaterialData##index, lightMaterialData##disposedIndexArray, shaderIndices),
      state
    )
  )
  |> ignore;
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let lightMaterialData = data##lightMaterialData;
      let buffer = lightMaterialData##buffer;
      let count = data##bufferData##lightMaterialDataBufferCount;
      state
      |> _createTypeArrays(buffer, count)
      |> _initMaterials(lightMaterialData, data)
      |> ignore;
      e
    }
  );