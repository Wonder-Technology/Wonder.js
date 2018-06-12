let _buildNewMeshes = (meshes, multiPrimitivesMeshMap) =>
  multiPrimitivesMeshMap
  |> SparseMapService.reduceiValid(
       (. newMeshes, newMeshDataArr, _) =>
         newMeshes
         |> Js.Array.concat(
              newMeshDataArr |> Js.Array.map(((newMesh, _)) => newMesh),
            ),
       meshes |> Js.Array.copy,
     );

let _buildNewNodes = (nodes, multiPrimitivesMeshMap) => {
  let (newNodes, newNodesOfMultiPrimitives, newNodeIndex) =
    nodes
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (newNodes, newNodesOfMultiPrimitives, newNodeIndex),
           {mesh} as node: GLTFType.node,
         ) =>
           switch (mesh) {
           | None => (
               newNodes |> ArrayService.push(node),
               newNodesOfMultiPrimitives,
               newNodeIndex,
             )
           | Some(mesh) =>
             switch (
               multiPrimitivesMeshMap
               |> WonderCommonlib.SparseMapService.get(mesh)
             ) {
             | None => (
                 newNodes |> ArrayService.push(node),
                 newNodesOfMultiPrimitives,
                 newNodeIndex,
               )
             | Some(newMeshDataArr) =>
               let newNodesOfMultiPrimitives =
                 newMeshDataArr
                 |> WonderCommonlib.ArrayService.reduceOneParam(
                      (. newNodesOfMultiPrimitives, (_, meshIndex)) =>
                        newNodesOfMultiPrimitives
                        |> ArrayService.push({
                             ...node,
                             children: None,
                             mesh: Some(meshIndex),
                           }),
                      newNodesOfMultiPrimitives,
                    );
               let newChildren =
                 ArrayService.range(
                   newNodeIndex,
                   newNodeIndex + (newMeshDataArr |> Js.Array.length) - 1,
                 );
               (
                 newNodes
                 |> ArrayService.push({
                      ...node,
                      mesh: None,
                      children:
                        switch (node.children) {
                        | None => Some(newChildren)
                        | Some(children) =>
                          Some(children |> Js.Array.concat(newChildren))
                        },
                    }),
                 newNodesOfMultiPrimitives,
                 newNodeIndex + (newMeshDataArr |> Js.Array.length),
               );
             }
           },
         ([||], [||], nodes |> Js.Array.length),
       );
  newNodes |> Js.Array.concat(newNodesOfMultiPrimitives);
};

let _createDefaultMaterial = () : GLTFType.material => {
  pbrMetallicRoughness:
    Some({
      baseColorFactor: Some([|1., 1., 1.|]),
      baseColorTexture: None,
      metallicFactor: Some(1.),
      roughnessFactor: Some(1.),
      metallicRoughnessTexture: None,
    }),
  /* "name": "Texture" */
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