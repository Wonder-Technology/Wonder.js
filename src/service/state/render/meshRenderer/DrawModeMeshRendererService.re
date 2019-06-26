open StateRenderType;

open DrawModeType;

let getGlDrawMode = (gl, meshRenderer, state) =>
  switch (
    OperateTypeArrayAllMeshRendererService.getDrawMode(
      meshRenderer,
      state.meshRendererRecord.drawModes,
    )
    |> uint8ToDrawMode
  ) {
  | Points => gl |> WonderWebgl.Gl.getPoints
  | Lines => gl |> WonderWebgl.Gl.getLines
  | Line_loop => gl |> WonderWebgl.Gl.getLineLoop
  | Line_strip => gl |> WonderWebgl.Gl.getLineStrip
  | Triangles => gl |> WonderWebgl.Gl.getTriangles
  | Triangle_strip => gl |> WonderWebgl.Gl.getTriangleStrip
  | Triangle_fan => gl |> WonderWebgl.Gl.getTriangleFan
  };