let _buildDefaultName = nodeIndex =>
  ConvertCommon.buildDefaultName("gameObject", nodeIndex);

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

let convert = (({nodes}: GLTFType.gltf) as gltf) : WDType.gameObjects => {
  count: ConvertCommon.getCount(nodes),
  names: _getNames(gltf),
};