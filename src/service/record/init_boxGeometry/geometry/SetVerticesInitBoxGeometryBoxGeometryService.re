open InitBoxGeometryBoxGeometryType;

let setVertices = (index, data: array(float), {vertices} as record) => {
  OperateTypeArrayBoxGeometryService.setVertices(index, data, vertices) |> ignore;
  record
};