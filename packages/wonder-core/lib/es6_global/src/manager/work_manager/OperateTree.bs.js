

import * as TreeNode$WonderCore from "./TreeNode.bs.js";
import * as IterateTree$WonderCore from "./IterateTree.bs.js";

function insertNode(tree, targetPluginName, node) {
  var isInsert = {
    contents: false
  };
  return [
          IterateTree$WonderCore.postOrderCata((function (pluginName, nodeData, children) {
                  if (pluginName === targetPluginName) {
                    isInsert.contents = true;
                    return TreeNode$WonderCore.buildNodeByNodeData(pluginName, nodeData, {
                                hd: node,
                                tl: children
                              });
                  } else {
                    return TreeNode$WonderCore.buildNodeByNodeData(pluginName, nodeData, children);
                  }
                }), tree, undefined),
          isInsert.contents
        ];
}

export {
  insertNode ,
  
}
/* No side effect */
