open StateRenderType;

let getNormals =
  [@bs]
  (
    (index, {boxGeometryRecord}) => {
      let normals =
        OperateTypeArrayBoxGeometryService.getNormalsTypeArray(index, boxGeometryRecord.normals);
      /* WonderLog.Log.print(("normals: ", normals)) |> ignore; */
      normals
    }
  );