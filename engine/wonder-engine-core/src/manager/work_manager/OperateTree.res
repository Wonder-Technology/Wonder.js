let insertNode = (tree, targetPluginName, node): (TreeType.tree, bool) => {
  // TODO check new tree node not exist in tree

  let isInsert = ref(false)

  (
    IterateTree.postOrderCata(
      ~tree,
      ~nodeFunc=(pluginName, nodeData, children) => {
        pluginName === targetPluginName
          ? {
              isInsert := true

              TreeNode.buildNodeByNodeData(pluginName, nodeData, list{node, ...children})
            }
          : TreeNode.buildNodeByNodeData(pluginName, nodeData, children)
      },
      (),
    ),
    isInsert.contents,
  )
}
