open StateDataRenderWorkerType;

open RenderWorkerCustomGeometryType;

let _createTypeArrays = (buffer, count, state) => {
  let (vertices, normals, indices, verticesInfos, normalsInfos, indicesInfos) =
    CreateTypeArrayCustomGeometryService.createTypeArrays(buffer, count);
  state.customGeometryRecord =
    Some({vertices, normals, indices, verticesInfos, normalsInfos, indicesInfos});
  state
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let customGeometryData = data##customGeometryData;
      let buffer = customGeometryData##buffer;
      let count = data##bufferData##customGeometryPointDataBufferCount;
      state |> _createTypeArrays(buffer, count) |> ignore;
      e
    }
  );