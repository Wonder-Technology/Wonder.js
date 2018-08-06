open StateDataRenderWorkerType;

open RenderWorkerGeometryType;

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
    CreateTypeArrayGeometryService.createTypeArrays(
      buffer,
      geometryPointCount,
      geometryCount
    );
  state.geometryRecord =
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
      let geometryData = data##geometryData;
      let buffer = geometryData##buffer;
      let geometryPointCount = data##bufferData##geometryPointCount;
      let geometryCount = data##bufferData##geometryCount;
      state
      |> _createTypeArrays(
           buffer,
           geometryPointCount,
           geometryCount
         )
      |> StateRenderWorkerService.setState(stateData);
      e
    }
  );