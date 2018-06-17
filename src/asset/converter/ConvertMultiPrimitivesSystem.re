let _buildMultiPrimitivesMeshName = (meshName, primitiveIndex) =>
  switch (meshName) {
  | None => None
  | Some(meshName) => Some({j|$(meshName)_$primitiveIndex|j})
  };

let _buildMultiPrimitivesNodeName = (nodeName, primitiveIndex) =>
  switch (nodeName) {
  | None => None
  | Some(nodeName) => Some({j|$(nodeName)_$primitiveIndex|j})
  };

let _buildMultiPrimitivesMeshMap = meshes => {
  let (multiPrimitivesMeshMap, newMeshIndex) =
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (multiPrimitivesMeshMap, newMeshIndex),
           {primitives, name}: GLTFType.mesh,
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
                           {
                             primitives: [|primitive|],
                             name:
                               _buildMultiPrimitivesMeshName(
                                 name,
                                 primitiveIndex,
                               ),
                           }: GLTFType.mesh,
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
           {mesh, name} as node: GLTFType.node,
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
                 |> WonderCommonlib.ArrayService.reduceOneParami(
                      (.
                        newNodesOfMultiPrimitives,
                        (_, meshIndex),
                        primitiveIndex,
                      ) =>
                        newNodesOfMultiPrimitives
                        |> ArrayService.push(
                             {
                               name:
                                 _buildMultiPrimitivesNodeName(
                                   name,
                                   primitiveIndex,
                                 ),
                               camera: None,
                               matrix: None,
                               translation: None,
                               rotation: None,
                               scale: None,
                               children: None,
                               mesh: Some(meshIndex),
                               extension: None
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