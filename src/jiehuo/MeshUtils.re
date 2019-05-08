let _forEachIndices =
    ((geometry, state), indices, indicesCount, checkIntersectFunc) => {
  let index = ref(0);
  let checkIntersectData = ref(None);

  while (checkIntersectData^ |> Js.Option.isNone && index^ < indicesCount) {
    checkIntersectData :=
      checkIntersectFunc(
        AbstractIndicesService.unsafeGetIndex(index^, indices),
        AbstractIndicesService.unsafeGetIndex(index^ + 1, indices),
        AbstractIndicesService.unsafeGetIndex(index^ + 2, indices),
      );

    index := index^ + 3;
  };

  checkIntersectData^;
};

let _checkIntersect =
    (
      cullType,
      (rayCasterNear, rayCasterFar),
      ({origin}: RayType.ray) as ray,
      (va, vb, vc),
    ) =>
  RayIntersectUtils.checkIntersectTriangle(cullType, (va, vb, vc), ray);

let _checkIntersectMesh =
    (
      (geometry, localToWorldMatrix, cullType, state),
      (vertices, indices16, indices32, indicesCount),
      ({origin, direction}: RayType.ray) as ray,
    ) => {
  let inverseMatrix =
    Matrix4Service.invert(
      localToWorldMatrix,
      Matrix4Service.createIdentityMatrix4(),
    );

  let ray = RayUtils.applyMatrix4(ray, inverseMatrix);

  _forEachIndices(
    (geometry, state),
    GeometryAPI.hasGeometryIndices16(geometry, state) ?
      indices16 |> AbstractIndicesType.indices16ToIndices :
      indices32 |> AbstractIndicesType.indices32ToIndices,
    indicesCount,
    (index1, index2, index3) =>
    _checkIntersect(
      cullType,
      (0., infinity),
      ray,
      (
        Vector3_JieHuo_Service.fromBufferAttribute(vertices, index1),
        Vector3_JieHuo_Service.fromBufferAttribute(vertices, index2),
        Vector3_JieHuo_Service.fromBufferAttribute(vertices, index3),
      ),
    )
  );
};

let checkIntersectMesh =
    (ray, (geometry, localToWorldMatrixTypeArray, cullType), state) =>
  _checkIntersectMesh(
    (geometry, localToWorldMatrixTypeArray, cullType, state),
    (
      GeometryAPI.getGeometryVertices(geometry, state),
      GeometryAPI.getGeometryIndices16(geometry, state),
      GeometryAPI.getGeometryIndices32(geometry, state),
      GeometryAPI.getGeometryIndicesCount(geometry, state),
    ),
    ray,
  );