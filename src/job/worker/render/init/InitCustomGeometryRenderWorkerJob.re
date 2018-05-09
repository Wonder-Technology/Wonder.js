open StateDataRenderWorkerType;

open RenderWorkerCustomGeometryType;

let _createTypeArrays = (buffer, count, state) => {
  let (
    vertices,
    texCoords,
    normals,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos
  ) =
    CreateTypeArrayCustomGeometryService.createTypeArrays(buffer, count);
  state.customGeometryRecord =
    Some({
      vertices,
      texCoords,
      normals,
      indices,
      verticesInfos,
      texCoordsInfos,
      normalsInfos,
      indicesInfos
    });
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
      state |> _createTypeArrays(buffer, count) |> StateRenderWorkerService.setState(stateData);
      e
    }
  );