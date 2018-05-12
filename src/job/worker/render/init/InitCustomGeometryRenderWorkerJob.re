open StateDataRenderWorkerType;

open RenderWorkerCustomGeometryType;

let _createTypeArrays = (buffer, geometryPointCount, geometryCount, state) => {
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
      geometryPointCount,
      geometryCount
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
      let customGeometryPointCount = data##bufferData##customGeometryPointCount;
      let customGeometryCount = data##bufferData##customGeometryCount;
      state
      |> _createTypeArrays(
           buffer,
           customGeometryPointCount,
           customGeometryCount
         )
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );