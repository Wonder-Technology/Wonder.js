open StateRenderType;

let getVertices =
  [@bs]
  (
    (index, {boxGeometryRecord}) => {
      let vertices =
        OperateTypeArrayBoxGeometryService.getVerticesTypeArray(index, boxGeometryRecord.vertices);
      WonderLog.Log.print(("vertices: ", vertices)) |> ignore;
      vertices
    }
  );