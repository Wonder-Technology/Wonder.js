let _buildDefaultName = nodeIndex =>
  ConvertCommon.buildDefaultGameObjectName(nodeIndex);

let _getNames = ({nodes, meshes}: GLTFType.gltf) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. nameArr, ({name}: GLTFType.node) as node, index) =>
         switch (name) {
         | Some(name) => nameArr |> ArrayService.push(name)
         | None =>
           switch (node.mesh) {
           | None => nameArr |> ArrayService.push(_buildDefaultName(index))
           | Some(mesh) =>
             let {name}: GLTFType.mesh = Array.unsafe_get(meshes, mesh);

             switch (name) {
             | Some(name) => nameArr |> ArrayService.push(name)
             | None => nameArr |> ArrayService.push(_buildDefaultName(index))
             };
           }
         },
       [||],
     );

let _getIsRoots = ({nodes, meshes}: GLTFType.gltf) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. isRootMap, {extras}: GLTFType.node, index) =>
         switch (extras) {
         | None => isRootMap
         | Some(({isRoot}: GLTFType.nodeExtras)) =>
           switch (isRoot) {
           | None => isRootMap
           | Some(isRoot) =>
             isRootMap
             |> WonderCommonlib.MutableSparseMapService.set(index, isRoot)
           }
         },
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );

let convert = (({nodes}: GLTFType.gltf) as gltf) : WDType.gameObjects => {
  count: ConvertCommon.getCount(nodes),
  names: _getNames(gltf),
  isRoots: _getIsRoots(gltf),
};