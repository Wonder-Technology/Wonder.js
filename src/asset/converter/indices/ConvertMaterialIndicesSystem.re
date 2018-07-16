let _setMapMaterialIndices =
    (materialMap, materialIndex, (materialIndices, diffuseMapIndices)) =>
  switch (materialMap) {
  | None => (materialIndices, diffuseMapIndices)
  | Some(({index}: GLTFType.textureInfo)) => (
      materialIndices |> ArrayService.push(materialIndex),
      diffuseMapIndices |> ArrayService.push(index),
    )
  };

let convertToMaterialIndices =
    ({materials}: GLTFType.gltf)
    : WDType.materialIndices =>
  switch (materials) {
  | None => (
      {
        diffuseMapMaterialIndices: {
          materialIndices: [||],
          mapIndices: [||],
        },
      }: WDType.materialIndices
    )
  | Some(materials) =>
    let (materialIndices, diffuseMapIndices) =
      materials
      |> WonderCommonlib.ArrayService.reduceOneParami(
           (.
             (materialIndices, diffuseMapIndices),
             {pbrMetallicRoughness}: GLTFType.material,
             index,
           ) =>
             switch (pbrMetallicRoughness) {
             | None => (materialIndices, diffuseMapIndices)
             | Some(pbrMetallicRoughness) =>
               let {baseColorTexture}: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
               _setMapMaterialIndices(
                 baseColorTexture,
                 index,
                 (materialIndices, diffuseMapIndices),
               );
             },
           ([||], [||]),
         );
    (
      {
        diffuseMapMaterialIndices: {
          materialIndices,
          mapIndices: diffuseMapIndices,
        },
      }: WDType.materialIndices
    )
    |> WonderLog.Contract.ensureCheck(
         (
           {diffuseMapMaterialIndices: {materialIndices, mapIndices}}: WDType.materialIndices,
         ) =>
           WonderLog.(
             Contract.(
               Operators.(
                 test(
                   Log.buildAssertMessage(
                     ~expect=
                       {j|materialIndices' count === mapIndices' count|j},
                     ~actual={j|not|j},
                   ),
                   () =>
                   materialIndices
                   |> Js.Array.length == (mapIndices |> Js.Array.length)
                 )
               )
             )
           ),
         IsDebugMainService.getIsDebug(StateDataMain.stateData),
       );
  };