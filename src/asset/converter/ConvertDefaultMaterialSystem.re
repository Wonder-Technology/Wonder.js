let _createDefaultMaterial = (): GLTFType.material => {
  name: Some("defaultLightMaterial"),
  pbrMetallicRoughness:
    Some({
      baseColorFactor: Some([|1., 1., 1.|]),
      baseColorTexture: None,
      metallicFactor: Some(1.),
      roughnessFactor: Some(1.),
      metallicRoughnessTexture: None,
    }),
  extensions: None,
};

let _addDefaultMaterial = ({materials} as gltf: GLTFType.gltf) => {
  let defaultMaterial = _createDefaultMaterial();

  let (defaultMaterialIndex, materials) =
    switch (materials) {
    | None => (0, Some([|defaultMaterial|]))
    | Some(materials) => (
        materials |> Js.Array.length,
        (materials |> ArrayService.push(defaultMaterial))->Some,
      )
    };

  (defaultMaterialIndex, {...gltf, materials});
};

let _isNeedAddDefaultMaterialByJudgeMesh = (mesh, meshes) => {
  let {primitives}: GLTFType.mesh = Array.unsafe_get(meshes, mesh);

  ConvertCommon.getPrimitiveData(primitives).material |> Js.Option.isNone;
};

let _isNeedAddDefaultMaterial = ({extras, mesh}: GLTFType.node, meshes) =>
  switch (mesh) {
  | Some(mesh) =>
    switch (extras) {
    | Some({basicMaterial, lightMaterial}) =>
      switch (basicMaterial, lightMaterial) {
      | (None, None) => _isNeedAddDefaultMaterialByJudgeMesh(mesh, meshes)
      | _ => false
      }
    | None => _isNeedAddDefaultMaterialByJudgeMesh(mesh, meshes)
    }
  | None => false
  };

let _setDefaultMaterial =
    ((defaultMaterialIndex, {nodes, meshes} as gltf: GLTFType.gltf)) => {
  ...gltf,
  nodes:
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. newNodes, ({extras}: GLTFType.node) as node) =>
           _isNeedAddDefaultMaterial(node, meshes) ?
             newNodes
             |> ArrayService.push(
                  {
                    ...node,
                    extras:
                      switch (extras) {
                      | None =>
                        Some({
                          basicCameraView: None,
                          meshRenderer: None,
                          basicMaterial: None,
                          lightMaterial: Some(defaultMaterialIndex),
                          flyCameraController: None,
                          arcballCameraController: None,
                          script: None,
                          isActive: None,
                          isRoot: None,
                        })
                      | Some(extras) =>
                        Some({
                          ...extras,
                          basicMaterial: None,
                          lightMaterial: Some(defaultMaterialIndex),
                        })
                      },
                  }: GLTFType.node,
                ) :
             newNodes |> ArrayService.push(node),
         [||],
       ),
};

let convert =
    ({materials, nodes, meshes} as gltf: GLTFType.gltf): GLTFType.gltf => {
  let isNeedAddDefaultMaterial =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. isNeedAddDefaultMaterial, node) =>
           isNeedAddDefaultMaterial ?
             isNeedAddDefaultMaterial :
             _isNeedAddDefaultMaterial(node, meshes),
         false,
       );

  isNeedAddDefaultMaterial ?
    _addDefaultMaterial(gltf) |> _setDefaultMaterial : gltf;
};