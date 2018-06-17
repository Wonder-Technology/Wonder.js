let _createDefaultMaterial = () : GLTFType.material => {
  name: Some("defaultMaterial"),
  pbrMetallicRoughness:
    Some({
      baseColorFactor: Some([|1., 1., 1.|]),
      baseColorTexture: None,
      metallicFactor: Some(1.),
      roughnessFactor: Some(1.),
      metallicRoughnessTexture: None,
    }),
};

let _addDefaultMaterial = ({materials} as gltf: GLTFType.gltf) => {
  let defaultMaterial = _createDefaultMaterial();

  let (defaultMaterialIndex, materials) =
    switch (materials) {
    | None => (0, Some([|defaultMaterial|]))
    | Some(materials) => (
        materials |> Js.Array.length,
        materials |> ArrayService.push(defaultMaterial) |. Some,
      )
    };

  (defaultMaterialIndex, {...gltf, materials});
};

let _isNotHasMaterial = ({primitives}: GLTFType.mesh) =>
  ConvertCommon.getPrimitiveData(primitives).material |> Js.Option.isNone;

let _setDefaultMaterial =
    ((defaultMaterialIndex, {meshes} as gltf: GLTFType.gltf)) => {
  ...gltf,
  meshes:
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. newMeshes, mesh) =>
           _isNotHasMaterial(mesh) ?
             newMeshes
             |> ArrayService.push(
                  {
                    ...mesh,
                    primitives: [|
                      {
                        ...ConvertCommon.getPrimitiveData(mesh.primitives),
                        material: Some(defaultMaterialIndex),
                      },
                    |],
                  }: GLTFType.mesh,
                ) :
             newMeshes |> ArrayService.push(mesh),
         [||],
       ),
};

let convert = ({materials, meshes} as gltf: GLTFType.gltf) : GLTFType.gltf => {
  let notHasMaterial =
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. notHasMaterial, mesh) =>
           notHasMaterial ? notHasMaterial : _isNotHasMaterial(mesh),
         false,
       );

  notHasMaterial ? _addDefaultMaterial(gltf) |> _setDefaultMaterial : gltf;
};