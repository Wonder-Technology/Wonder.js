// TODO is already post order???
// let rec firstOrderCata = (
let rec postOrderCata = (
  ~nodeFunc: (IWorkForJs.pluginName, TreeType.nodeData, list<TreeType.tree>) => TreeType.tree,
  ~tree: TreeType.tree,
  (),
): TreeType.tree => {
  let recurse = postOrderCata(~nodeFunc)

  switch tree {
  | Node(pluginName, nodeData, children) =>
    nodeFunc(pluginName, nodeData, children->WonderCommonlib.ListSt.map(recurse(~tree=_, ())))
  }
}

// let rec postOrderFoldWithParentNode = (
//   ~nodeFunc: (option<TreeType.tree>, 'acc, IWorkForJs.pluginName, TreeType.nodeData) => 'acc,
//   ~acc: 'acc,
//   ~tree: TreeType.tree,
//   ~parentNode: option<TreeType.tree>=None,
//   (),
// ): 'acc => {
// //   let recurse = firstOrderCata(~nodeFunc, ~acc, ~parentNode, ())

//   let recurse = (parentNode, acc, child) =>
//     postOrderFoldWithParentNode(
//       ~acc,
//       ~tree=child,
//       ~nodeFunc,
//       ~parentFolderNode,
//       (),
//     );

//   switch tree {
//   | Node(pluginName, nodeData, children) =>
//     let localAccum =
//       nodeFunc(parentNode, acc, pluginName, nodeData, children);

//     UIStateAssetService.fold(
//     //   seqFoldFunc,

//       recurse(
//         Some(
//           FolderNodeAssetService.buildNodeByNodeData(
//             ~nodeId,
//             ~nodeData=folderNodeData,
//             ~children,
//           ),
//         ),
//       ),
//       localAccum,
//       children,
//     );

//     // nodeFunc(pluginName, nodeData, children->WonderBsMost.ListSt.map(recurse(~tree=_, ())))
//   }

// }

let rec postOrderCataWithParentNode = (
  ~nodeFunc: (
    option<TreeType.tree>,
    IWorkForJs.pluginName,
    TreeType.nodeData,
    list<TreeType.tree>,
  ) => WonderCommonlib.Result.t2<TreeType.tree>,
  ~tree: TreeType.tree,
  ~parentNode: option<TreeType.tree>=None,
  (),
): WonderCommonlib.Result.t2<TreeType.tree> => {
  let recurse = postOrderCataWithParentNode(~nodeFunc)

  switch tree {
  | Node(pluginName, nodeData, children) =>
    children
    ->WonderCommonlib.ListSt.traverseResultM(recurse(~tree=_, ~parentNode=tree->Some, ()))
    ->WonderCommonlib.Result.bind(children => {
      nodeFunc(parentNode, pluginName, nodeData, children)
    })
  }
}
