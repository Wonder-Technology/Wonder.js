let _convertByMesh = (meshes, geometryGameObjectIndices, geometryIndices) =>
  geometryGameObjectIndices
  |> Js.Array.mapi((_, index) => {
       let geometryIndex = Array.unsafe_get(geometryIndices, index);

       let {primitives}: GLTFType.mesh =
         Array.unsafe_get(meshes, geometryIndex);

       let ({mode, material}: GLTFType.primitive) as primitive =
         ConvertCommon.getPrimitiveData(primitives);

       ConvertMeshUtils.doesPrimitiveHasMaterial(primitive) ?
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
             isRender: true,
           }: WDType.meshRenderer,
         ) :
         None;
     });

let convertToMeshRenderers =
    (
      {
        gameObjectIndices: geometryGameObjectIndices,
        componentIndices: geometryIndices,
      }: WDType.componentGameObjectIndexData,
      {extras, meshes}: GLTFType.gltf,
    ) =>
  switch (extras) {
  | Some({meshRenderers})
      when
        meshRenderers
        |> Js.Option.isSome
        && meshRenderers
        |> OptionService.unsafeGet
        |> Js.Array.length > 0 =>
    meshRenderers
    |> OptionService.unsafeGet
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. arr, {drawMode, isRender}: GLTFType.meshRenderer, index) =>
           arr
           |> ArrayService.push(
                Some(
                  {
                    drawMode: drawMode |> DrawModeType.uint8ToDrawMode,
                    isRender,
                  }: WDType.meshRenderer,
                ),
              ),
         [||],
       )
  | _ => _convertByMesh(meshes, geometryGameObjectIndices, geometryIndices)
  };