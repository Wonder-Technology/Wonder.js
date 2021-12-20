let create = (data, (vertices, texCoords, normals, tangents, indices)): (
  WonderCore.RegisterComponentType.usedComponentData,
  WonderComponentTypeGeometry.Index.geometry,
) => {
  let (data, geometry) = WonderCore.Main.createComponent(data)

  let data =
    data
    ->WonderCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.vertices->Obj.magic,
      vertices->Obj.magic,
    )
    ->WonderCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.normals->Obj.magic,
      normals->Obj.magic,
    )
    ->WonderCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.tangents->Obj.magic,
      tangents->Obj.magic,
    )
    ->WonderCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.texCoords->Obj.magic,
      texCoords->Obj.magic,
    )
    ->WonderCore.Main.setComponentData(
      geometry,
      WonderComponentTypeGeometry.Index.dataName.indices->Obj.magic,
      indices->Obj.magic,
    )

  (data, geometry->VOTypeConvert.componentToGeometry)
}
