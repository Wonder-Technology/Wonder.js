let _convertToMeshRendererByMesh =
    ({primitives}: GLTFType.mesh)
    : option(WDType.meshRenderer) =>
  primitives |> Js.Array.length > 1 ?
    None :
    {
      let {mode}: GLTFType.primitive =
        ConvertCommon.getPrimitiveData(primitives);

      Some({
        drawMode:
          switch (mode) {
          | Some(0) => DrawModeType.Points
          | Some(1) => DrawModeType.Lines
          | Some(2) => DrawModeType.Line_loop
          | Some(3) => DrawModeType.Line_strip
          | Some(4) => DrawModeType.Triangles
          | Some(5) => DrawModeType.Triangle_strip
          | Some(6) => DrawModeType.Triangle_fan
          | None => DrawModeType.Triangles
          },
      });
    };

let convertToMeshRenderers = ({extras, meshes}: GLTFType.gltf) =>
  switch (extras) {
  | None =>
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, mesh) =>
           arr |> ArrayService.push(_convertToMeshRendererByMesh(mesh)),
         [||],
       )
  | Some({meshRenderers}) =>
    switch (meshRenderers) {
    | Some(meshRenderers) when Js.Array.length(meshRenderers) > 0 =>
      meshRenderers
      |> WonderCommonlib.ArrayService.reduceOneParami(
           (. arr, {drawMode}: GLTFType.meshRenderer, index) =>
             arr
             |> ArrayService.push(
                  Some(
                    {drawMode: drawMode |> DrawModeType.uint8ToDrawMode}: WDType.meshRenderer,
                  ),
                ),
           [||],
         )

    | _ =>
      meshes
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. arr, mesh) =>
             arr |> ArrayService.push(_convertToMeshRendererByMesh(mesh)),
           [||],
         )
    }
  };