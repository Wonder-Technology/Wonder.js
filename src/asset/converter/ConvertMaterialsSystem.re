let _buildDefaultBasicMaterialName = materialIndex =>
  ConvertCommon.buildDefaultBasicMaterialName(materialIndex);

let _convertColor = colorFactor =>
  switch (colorFactor) {
  | None => [|1., 1., 1.|]
  | Some(colorFactor) => [|colorFactor[0], colorFactor[1], colorFactor[2]|]
  };

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
                    color: _convertColor(colorFactor),
                  }: WDType.basicMaterial,
                ),
           [||],
         )
    | _ => [||]
    }
  };

let _buildDefaultLightMaterialName = materialIndex =>
  ConvertCommon.buildDefaultLightMaterialName(materialIndex);

let _convertPBRData = (name, diffuseColorFactor, arr, index) =>
  arr
  |> ArrayService.push(
       {
         name:
           switch (name) {
           | None => _buildDefaultLightMaterialName(index)
           | Some(name) => name
           },
         diffuseColor: _convertColor(diffuseColorFactor),
       }: WDType.lightMaterial,
     );

let _convertMetallicRoughness = (name, pbrMetallicRoughness, arr, index) =>
  switch (pbrMetallicRoughness) {
  | None => arr
  | Some(({baseColorFactor}: GLTFType.pbrMetallicRoughness)) =>
    _convertPBRData(name, baseColorFactor, arr, index)
  };

let convertToLightMaterials =
    ({materials}: GLTFType.gltf)
    : array(WDType.lightMaterial) =>
  switch (materials) {
  | None => [||]
  | Some(materials) =>
    materials
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           arr,
           {extensions, pbrMetallicRoughness, name}: GLTFType.material,
           index,
         ) =>
           switch (extensions) {
           | None =>
             _convertMetallicRoughness(name, pbrMetallicRoughness, arr, index)

           | Some({khr_materials_pbrSpecularGlossiness}) =>
             switch (khr_materials_pbrSpecularGlossiness) {
             | None =>
               _convertMetallicRoughness(
                 name,
                 pbrMetallicRoughness,
                 arr,
                 index,
               )
             | Some(
                 (
                   {diffuseFactor}: GLTFType.khrMaterialsPBRSpecularGlossiness
                 ),
               ) =>
               _convertPBRData(name, diffuseFactor, arr, index)
             }
           },
         [||],
       )
  };

let _getLightMaterialOfMesh = (mesh, meshes) =>
  switch (mesh) {
  | None => None
  | Some(mesh) =>
    let ({primitives}: GLTFType.mesh) as meshData =
      Array.unsafe_get(meshes, mesh);

    ConvertCommon.getPrimitiveData(primitives).material;
  };

let getLightMaterialOfNode = ({mesh, extras}: GLTFType.node, meshes) =>
  switch (extras) {
  | Some({lightMaterial}) =>
    switch (lightMaterial) {
    | Some(lightMaterial) => Some(lightMaterial)
    | None => _getLightMaterialOfMesh(mesh, meshes)
    }
  | None => _getLightMaterialOfMesh(mesh, meshes)
  };