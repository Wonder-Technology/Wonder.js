open StateDataRenderWorkerType;

open RenderWorkerGeometryType;

let _createTypeArrays =
    (buffer, (geometryPointCount, geometryCount), indicesTypeMap, state) => {
  let (
    vertices,
    texCoords,
    normals,
    indices16,
    indices32,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  ) =
    CreateTypeArrayAllGeometryService.createTypeArrays(
      buffer,
      geometryPointCount,
      geometryCount,
    );
  state.geometryRecord =
    Some({
      vertices,
      texCoords,
      normals,
      indices16,
      indices32,
      verticesInfos,
      texCoordsInfos,
      normalsInfos,
      indicesInfos,
      indicesTypeMap,
    });
  state;
};

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let geometryData = data##geometryData;
    let buffer = geometryData##buffer;
    let indicesTypeMap = geometryData##indicesTypeMap;
    let geometryPointCount = data##bufferData##geometryPointCount;
    let geometryCount = data##bufferData##geometryCount;
    state
    |> _createTypeArrays(
         buffer,
         (geometryPointCount, geometryCount),
         indicesTypeMap,
       )
    |> StateRenderWorkerService.setState(stateData);
    e;
  });