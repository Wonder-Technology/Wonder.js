open InitBoxGeometryBoxGeometryType;

let setIndices = (index, data: array(int), {indices} as record) => {
  OperateTypeArrayBoxGeometryService.setIndices(index, data, indices) |> ignore;
  record
};