open StateType

let getData = (.
  {
    vertices,
    texCoords,
    normals,
    tangents,
    indices,
    verticesInfos,
    texCoordsInfos,
    normalsInfos,
    tangentsInfos,
    indicesInfos,
  } as state,
  geometry,
  dataName: DataType.dataName,
): Js.Nullable.t<'a> => {
  let isDebug = ConfigUtils.getIsDebug(state)

  switch dataName {
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.vertices =>
    WonderComponentWorkerUtils.VerticesUtils.getVertices(
      vertices,
      verticesInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.normals =>
    WonderComponentWorkerUtils.NormalsUtils.getNormals(normals, normalsInfos, isDebug, geometry)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.texCoords =>
    WonderComponentWorkerUtils.TexCoordsUtils.getTexCoords(
      texCoords,
      texCoordsInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.tangents =>
    WonderComponentWorkerUtils.TangentsUtils.getTangents(
      tangents,
      tangentsInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.indices =>
    WonderComponentWorkerUtils.IndicesUtils.getIndices(indices, indicesInfos, isDebug, geometry)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.vertices =>
    WonderComponentWorkerUtils.VerticesUtils.getVertices(
      vertices,
      verticesInfos,
      isDebug,
      geometry,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.indicesCount =>
    WonderComponentWorkerUtils.IndicesUtils.getIndicesCount(indicesInfos, isDebug, geometry)
    ->Obj.magic
    ->Js.Nullable.return
  | _ =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
