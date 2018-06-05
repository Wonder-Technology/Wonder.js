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
                  diffuseColor: baseColorFactor,
                  /* specularColor: metallicFactor,
                     shininess: roughnessFactor */
                }: WDType.lightMaterial,
              );
         },
       [||],
     );