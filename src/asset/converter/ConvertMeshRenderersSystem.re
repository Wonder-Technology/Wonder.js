let _convertByMesh =
    (meshes, customGeometryGameObjectIndices, customGeometryIndices) =>
  customGeometryGameObjectIndices
  |> Js.Array.mapi((_, index) => {
       let customGeometryIndex =
         Array.unsafe_get(customGeometryIndices, index);

       let {primitives}: GLTFType.mesh =
         Array.unsafe_get(meshes, customGeometryIndex);

       let {mode}: GLTFType.primitive =
         ConvertCommon.getPrimitiveData(primitives);

       Some(
         {
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
         }: WDType.meshRenderer,
       );
     });

let convertToMeshRenderers =
    (
      {
        gameObjectIndices: customGeometryGameObjectIndices,
        componentIndices: customGeometryIndices,
      }: WDType.componentGameObjectIndexData,
      {extras, meshes}: GLTFType.gltf,
    ) =>
  switch (extras) {
  | None =>
    _convertByMesh(
      meshes,
      customGeometryGameObjectIndices,
      customGeometryIndices,
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
      _convertByMesh(
        meshes,
        customGeometryGameObjectIndices,
        customGeometryIndices,
      )
    }
  };