'use strict';

var TreeNode$WonderCore = require("./TreeNode.bs.js");
var IterateTree$WonderCore = require("./IterateTree.bs.js");

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

exports.insertNode = insertNode;
/* No side effect */
