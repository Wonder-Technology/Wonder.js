let convertToLightMaterials =
    ({materials}: GLTFType.gltf)
    : array(WDType.lightMaterial) =>
  materials
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, {pbrMetallicRoughness}: GLTFType.material) =>
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
                  diffuseColor:
                    switch (baseColorFactor) {
                    | None => None
                    | Some(baseColorFactor) => [|
                        baseColorFactor[0],
                        baseColorFactor[1],
                        baseColorFactor[2],
                      |] |. Some
                    },
                  /* specularColor: metallicFactor,
                     shininess: roughnessFactor */
                }: WDType.lightMaterial,
              );
         },
       [||],
     );