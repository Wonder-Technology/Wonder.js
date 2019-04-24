open StateDataMainType;

let prepareForOptimize = state => {
  let state = SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
  let (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (
      (indices1, indices2, indices3),
      (indices32_1, indices32_2, indices32_3),
    ),
  ) =
    GeometryTool.createThreeGameObjectsAndSetFullPointData(state);
  let state =
    state
    |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
         gameObject1,
         geometry1,
       );
  let state =
    state
    |> GameObjectTool.disposeGameObjectGeometryComponentWithoutVboBuffer(
         gameObject2,
         geometry2,
       );
  (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (
      (indices1, indices2, indices3),
      (indices32_1, indices32_2, indices32_3),
    ),
  );
};

let judgeForOptimize =
    (
      state,
      (gameObject1, gameObject2, gameObject3),
      (geometry1, geometry2, geometry3),
      (vertices1, vertices2, vertices3),
      (texCoords1, texCoords2, texCoords3),
      (normals1, normals2, normals3),
      (
        (indices1, indices2, indices3),
        (indices32_1, indices32_2, indices32_3),
      ),
    ) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  GeometryAPI.(
    (
      getGeometryVertices(geometry3, state),
      getGeometryTexCoords(geometry3, state),
      getGeometryNormals(geometry3, state),
      getGeometryIndices16(geometry3, state),
      getGeometryIndices32(geometry3, state),
    )
    |> expect == (vertices3, texCoords3, normals3, indices3, indices32_3)
  );
};

let reAllocate = state => {
  ...state,
  geometryRecord:
    ReallocateGeometryCPUMemoryService.reAllocateToTheSameBuffer(
      GeometryTool.getRecord(state),
    )
    ->Some,
};

let reAllocateGeometryToNewBuffer = ({settingRecord} as state) => {
  let geometryPointCount =
    BufferSettingService.getGeometryPointCount(settingRecord);
  let geometryCount = BufferSettingService.getGeometryCount(settingRecord);
  let (
    buffer,
    vertices,
    texCoords,
    normals,
    indices,
    indices32,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    indicesInfos,
  ) =
    RecordGeometryMainService._initBufferData(
      geometryPointCount,
      geometryCount,
    );

  let geometryRecord = GeometryTool.getRecord(state);

  {
    ...state,
    geometryRecord:
      Some(
        ReallocateGeometryCPUMemoryService.reAllocateToBuffer(
          (
            buffer,
            vertices,
            texCoords,
            normals,
            indices,
            indices32,
            verticesInfos,
            texCoordsInfos,
            normalsInfos,
            indicesInfos,
          ),
          geometryRecord,
        ),
      ),
  };
};