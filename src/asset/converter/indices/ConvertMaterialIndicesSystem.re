let _setMapMaterialIndices =
    (materialMap, materialIndex, (materialIndices, diffuseMapIndices)) =>
  switch (materialMap) {
  | None => (materialIndices, diffuseMapIndices)
  | Some(({index}: GLTFType.textureInfo)) => (
      materialIndices |> ArrayService.push(materialIndex),
      diffuseMapIndices |> ArrayService.push(index),
    )
  };

let _convertMetallicRoughness =
    (pbrMetallicRoughness, (materialIndices, diffuseMapIndices), index) =>
  switch (pbrMetallicRoughness) {
  | None => (materialIndices, diffuseMapIndices)
  | Some(pbrMetallicRoughness) =>
    let {baseColorTexture}: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
    _setMapMaterialIndices(
      baseColorTexture,
      index,
      (materialIndices, diffuseMapIndices),
    );
  };

let _convertSpecularGlossiness =
    (pbrSpecularGlossiness, (materialIndices, diffuseMapIndices), index) => {
  let {diffuseTexture}: GLTFType.khrMaterialsPBRSpecularGlossiness = pbrSpecularGlossiness;

  _setMapMaterialIndices(
    diffuseTexture,
    index,
    (materialIndices, diffuseMapIndices),
  );
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
             {extensions, pbrMetallicRoughness}: GLTFType.material,
             index,
           ) =>
             switch (extensions) {
             | None =>
               _convertMetallicRoughness(
                 pbrMetallicRoughness,
                 (materialIndices, diffuseMapIndices),
                 index,
               )
             | Some({khr_materials_pbrSpecularGlossiness}) =>
               switch (khr_materials_pbrSpecularGlossiness) {
               | None =>
                 _convertMetallicRoughness(
                   pbrMetallicRoughness,
                   (materialIndices, diffuseMapIndices),
                   index,
                 )
               | Some(pbrSpecularGlossiness) =>
                 _convertSpecularGlossiness(
                   pbrSpecularGlossiness,
                   (materialIndices, diffuseMapIndices),
                   index,
                 )
               }
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