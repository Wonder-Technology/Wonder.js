let _buildDefaultBasicMaterialName = materialIndex =>
  ConvertCommon.buildDefaultName("basicMaterial", materialIndex);

let convertToBasicMaterials =
    ({extras}: GLTFType.gltf)
    : array(WDType.basicMaterial) =>
  switch (extras) {
  | None => [||]
  | Some({basicMaterials}) =>
    switch (basicMaterials) {
    | Some(basicMaterials) =>
      basicMaterials
      |> WonderCommonlib.ArrayService.reduceOneParami(
           (. arr, {colorFactor, name}: GLTFType.basicMaterial, index) =>
             arr
             |> ArrayService.push(
                  {
                    name:
                      switch (name) {
                      | None => _buildDefaultBasicMaterialName(index)
                      | Some(name) => name
                      },
                    color:
                      switch (colorFactor) {
                      | None => [|1., 1., 1.|]
                      | Some(colorFactor) => [|
                          colorFactor[0],
                          colorFactor[1],
                          colorFactor[2],
                        |]
                      },
                  }: WDType.basicMaterial,
                ),
           [||],
         )
    | _ => [||]
    }
  };

let _buildDefaultLightMaterialName = materialIndex =>
  ConvertCommon.buildDefaultName("lightMaterial", materialIndex);

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
               /* metallicFactor,
                  roughnessFactor, */
               /* metallicRoughnessTexture: option(textureIndex) */
             }: GLTFType.pbrMetallicRoughness = pbrMetallicRoughness;
             arr
             |> ArrayService.push(
                  {
                    name:
                      switch (name) {
                      | None => _buildDefaultLightMaterialName(index)
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