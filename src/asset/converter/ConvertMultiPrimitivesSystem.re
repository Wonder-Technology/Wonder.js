let _buildMultiPrimitivesMeshMap = meshes => {
  let (multiPrimitivesMeshMap, newMeshIndex) =
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (multiPrimitivesMeshMap, newMeshIndex),
           {primitives}: GLTFType.mesh,
           meshIndex,
         ) =>
           switch (primitives |> Js.Array.length) {
           | 0
           | 1 => (multiPrimitivesMeshMap, newMeshIndex)
           | primitivesLen =>
             let newMeshDataArr =
               primitives
               |> WonderCommonlib.ArrayService.reduceOneParami(
                    (. newMeshDataArr, primitive, primitiveIndex) =>
                      newMeshDataArr
                      |> ArrayService.push((
                           {primitives: [|primitive|]}: GLTFType.mesh,
                           newMeshIndex + primitiveIndex,
                         )),
                    [||],
                  );
             (
               multiPrimitivesMeshMap
               |> WonderCommonlib.SparseMapService.set(
                    meshIndex,
                    newMeshDataArr,
                  ),
               newMeshIndex + (newMeshDataArr |> Js.Array.length),
             );
           },
         (
           WonderCommonlib.SparseMapService.createEmpty(),
           meshes |> Js.Array.length,
         ),
       );
  multiPrimitivesMeshMap;
};

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
                        |> ArrayService.push(
                             {
                               camera: None,
                               matrix: None,
                               translation: None,
                               rotation: None,
                               scale: None,
                               children: None,
                               mesh: Some(meshIndex),
                             }: GLTFType.node,
                           ),
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

let convertMultiPrimitivesToNodes =
    ({nodes, meshes} as gltf: GLTFType.gltf)
    : GLTFType.gltf => {
  let multiPrimitivesMeshMap = _buildMultiPrimitivesMeshMap(meshes);
  {
    ...gltf,
    nodes: _buildNewNodes(nodes, multiPrimitivesMeshMap),
    meshes: _buildNewMeshes(meshes, multiPrimitivesMeshMap),
  };
};