open InitBoxGeometryBoxGeometryType;

let setNormals = (index, data: array(float), {normals} as record) => {
  OperateTypeArrayBoxGeometryService.setNormals(index, data, normals) |> ignore;
  record
};