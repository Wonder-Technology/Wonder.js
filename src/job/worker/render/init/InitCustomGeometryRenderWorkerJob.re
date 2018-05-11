open StateDataRenderWorkerType;

open RenderWorkerCustomGeometryType;

let _createTypeArrays = (buffer, geometryPointDataBufferCount, geometryDataBufferCount, state) => {
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
    CreateTypeArrayCustomGeometryService.createTypeArrays(
      buffer,
      geometryPointDataBufferCount,
      geometryDataBufferCount
    );
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
      let customGeometryPointDataBufferCount = data##bufferData##customGeometryPointDataBufferCount;
      let customGeometryDataBufferCount = data##bufferData##customGeometryDataBufferCount;
      state
      |> _createTypeArrays(
           buffer,
           customGeometryPointDataBufferCount,
           customGeometryDataBufferCount
         )
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );