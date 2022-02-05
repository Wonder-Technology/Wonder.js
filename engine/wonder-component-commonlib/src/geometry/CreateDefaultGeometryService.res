let create = (data, (vertices, texCoords, normals, tangents, indices)): (
  WonderEngineCore.RegisterComponentType.usedComponentData,
  WonderComponentTypeGeometry.Index.geometry,
) => {
  let (data, geometry) = WonderEngineCore.Main.createComponent(data)

  let data =
    data
    ->WonderEngineCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.vertices->Obj.magic,
      vertices->Obj.magic,
    )
    ->WonderEngineCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.normals->Obj.magic,
      normals->Obj.magic,
    )
    ->WonderEngineCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.tangents->Obj.magic,
      tangents->Obj.magic,
    )
    ->WonderEngineCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.texCoords->Obj.magic,
      texCoords->Obj.magic,
    )
    ->WonderEngineCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.indices->Obj.magic,
      indices->Obj.magic,
    )

  (data, geometry->VOTypeConvert.componentToGeometry)
}
