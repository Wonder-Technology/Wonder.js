let _buildDefaultMaterialName = materialIndex =>
  ConvertCommon.buildDefaultName("material", materialIndex);

let convertToLightMaterials =
    ({materials}: GLTFType.gltf)
    : array(WDType.lightMaterial) =>
  switch (materials) {
  | None => [||]
  | Some(materials) =>
    materials
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. arr, {pbrMetallicRoughness, name}: GLTFType.material, index) =>
           switch (pbrMetallicRoughness) {
           | None => arr
           | Some(pbrMetallicRoughness) =>
             let {
               baseColorFactor,
               /* baseColorTexture: option(textureIndex), */
               metallicFactor,
               roughnessFactor,
               /* metallicRoughnessTexture: option(textureIndex) */
             }: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
             arr
             |> ArrayService.push(
                  {
                    name:
                      switch (name) {
                      | None => _buildDefaultMaterialName(index)
                      | Some(name) => name
                      },
                    diffuseColor:
                      switch (baseColorFactor) {
                      | None => [|1., 1., 1.|]
                      | Some(baseColorFactor) => [|
                          baseColorFactor[0],
                          baseColorFactor[1],
                          baseColorFactor[2],
                        |]
                      },
                    /* specularColor: metallicFactor,
                       shininess: roughnessFactor */
                  }: WDType.lightMaterial,
                );
           },
         [||],
       )
  };