let _buildMultiPrimitivesName = (name, primitiveIndex) =>
  switch (name) {
  | None => None
  | Some(name) => Some({j|$(name)_$primitiveIndex|j})
  };

let _buildMultiPrimitivesMeshName = (meshName, primitiveIndex) =>
  _buildMultiPrimitivesName(meshName, primitiveIndex);

let _buildMultiPrimitivesNodeName = (nodeName, primitiveIndex) =>
  _buildMultiPrimitivesName(nodeName, primitiveIndex);

let isMultiPrimitives = primitives => primitives |> Js.Array.length > 1;

let _buildMultiPrimitivesMeshMap = meshes => {
  let (multiPrimitivesMeshMap, newMeshIndex) =
    meshes
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (multiPrimitivesMeshMap, newMeshIndex),
           {primitives, name}: GLTFType.mesh,
           meshIndex,
         ) =>
           isMultiPrimitives(primitives) ?
             {
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
                 |> WonderCommonlib.MutableSparseMapService.set(
                      meshIndex,
                      newMeshDataArr,
                    ),
                 newMeshIndex + (newMeshDataArr |> Js.Array.length),
               );
             } :
             (multiPrimitivesMeshMap, newMeshIndex),
         (
           WonderCommonlib.MutableSparseMapService.createEmpty(),
           meshes |> Js.Array.length,
         ),
       );
  multiPrimitivesMeshMap;
};

let _buildNewMeshes = (meshes, multiPrimitivesMeshMap) =>
  multiPrimitivesMeshMap
  |> WonderCommonlib.MutableSparseMapService.reduceiValid(
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
               |> WonderCommonlib.MutableSparseMapService.get(mesh)
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
                               extras: None,
                               extensions: None,
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