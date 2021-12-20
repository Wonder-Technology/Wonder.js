open StateType

let setData = (.
  state,
  geometry,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.vertices =>
    VerticesUtils.setVertices(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.normals =>
    NormalsUtils.setNormals(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.texCoords =>
    TexCoordsUtils.setTexCoords(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.tangents =>
    TangentsUtils.setTangents(state, geometry, dataValue->Obj.magic)
  | dataName if dataName == WonderComponentTypeGeometry.Index.dataName.indices =>
    IndicesUtils.setIndices(state, geometry, dataValue->Obj.magic)
  | _ =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
